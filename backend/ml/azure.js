const db = require("../db/index");
const axios = require('axios');
const math = require('mathjs');

async function getRecommendedGroup(user_id, course_id, include_background=1) {
  // TODO: Return recommended group for user with id = user_id in course with id = course_id

  const info = await db.getRows("SELECT user_id, assignment_id, SUM(num_hours) AS time, MAX(completed) AS complete, SUM(num_entries) AS days FROM (SELECT user_id, assignment_id, SUM(hours) AS num_hours, completed, COUNT(*) as num_entries FROM classcaster_schema.times GROUP BY (user_id, assignment_id, completed)) GROUP BY (user_id, assignment_id)", []);
  const background_info = await db.getRows("SELECT id AS user_id, race, gender, age, num_upper_taken, num_lower_taken FROM classcaster_schema.users", []);

  var race_map = {
    "white": 0,
    "black": 1,
    "asian": 2,
    "hawaiian": 3,
    "other": 4,
    "not_provided": 5
  }
  var gender_map = {
    "male": 0,
    "female": 1,
    "other": 2,
    "not_provided": 3
  }

  var class_feat = {};
  // Lists of ages...etc for each user_id
  var ages = [];
  var uppers = [];
  var lowers = [];
  // Dictionaries with assignments as keys, and lists of times..etc for each user_id as values
  // Complete is a dict with uid as keys and # of completed assignments as values
  var times = {};
  var days = {};
  var completes = {};

   // Collect values for mean and std
  for (const row of background_info) {
    class_feat[row.user_id] = {
      "race": race_map[row.race],
      "gender": gender_map[row.gender]
    }
    ages.push(parseInt(row.age));
    uppers.push(parseInt(row.num_upper_taken));
    lowers.push(parseInt(row.num_lower_taken));
  }

  for (const row of info) {
    if (!(row.assignment_id in times)){
      times[row.assignment_id] = [parseFloat(row.time)];
    } else {
      times[row.assignment_id].push(parseFloat(row.time))
    }
    if (!(row.assignment_id in days)){
      days[row.assignment_id] = [parseInt(row.days)];
    } else {
      days[row.assignment_id].push(parseInt(row.days));
    }
    var complete_amt = 1 ? row.complete : 0;
    if (!row.user_id in completes) {
      completes[row.user_id] = complete_amt;
    } else {
      completes[row.user_id] += complete_amt;
    }
  }

  // Calculate mean and std
  var age_metrics = [math.mean(ages), math.std(ages)];
  var upper_metrics = [math.mean(uppers), math.std(uppers)];
  var lower_metrics = [math.mean(lowers), math.std(lowers)];
  var completes_vals = [];
  for (var key in completes) {
    completes_vals.push(completes[key]);
  }
  var complete_metrics = [math.mean(completes_vals), math.std(completes_vals)];

  var time_metrics = {};
  var days_metrics = {};
  for (const [assignm_id, values] of Object.entries(times)) {
    time_metrics[assignm_id] = [math.mean(values), math.std(values)];
  }
  for (const [assignm_id, values] of Object.entries(days)) {
    days_metrics[assignm_id] = [math.mean(values), math.std(values)];
  }

  // Add into class_feat
  for (const [uid, value] of Object.entries(completes)) {
    class_feat[uid]["complete"] = (value - complete_metrics[0]) / complete_metrics[1];
  }

  for (const row of background_info) {
    class_feat[row.user_id]["age"] = (row.age - age_metrics[0]) / age_metrics[1];
    class_feat[row.user_id]["upper"] =(row.num_upper_taken - upper_metrics[0]) / upper_metrics[1];
    class_feat[row.user_id]["lower"] = (row.num_lower_taken - lower_metrics[0]) / lower_metrics[1];
  }

  for (const row of info) {
    // Have class_feat.time be a list of all the times this user spent on each assignment
    if (!("time" in class_feat[row.user_id])){
      class_feat[row.user_id]["time"] = [(row.time - time_metrics[row.assignment_id][0]) / time_metrics[row.assignment_id][1]];
    } else {
      class_feat[row.user_id]["time"].push((row.time - time_metrics[row.assignment_id][0]) / time_metrics[row.assignment_id][1]);
    }
    if (!("days" in class_feat[row.user_id])){
      class_feat[row.user_id]["days"] = [(row.days - days_metrics[row.assignment_id][0]) / days_metrics[row.assignment_id][1]];
    } else {
      class_feat[row.user_id]["days"].push((row.days - days_metrics[row.assignment_id][0]) / days_metrics[row.assignment_id][1]);
    }
  }

  // Take average of all the times each user spends on each assignment
  for (const [uid, values] of Object.entries(class_feat)) {
    values["time"] = math.mean(values["time"]);
    values["days"] = math.mean(values["days"]);
  }

  // Setting study groups of 3 for now; can change later.
  const res = await axios.post("https://hackmit-1.azurewebsites.net", {
    "uid": user_id,
    "k": 3,
    "include_background": include_background,
    "class_feat": class_feat
  });

  return res;

}

module.exports.getRecommendedGroup = getRecommendedGroup;