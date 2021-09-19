const db = require("../db/index");
const axios = require('axios');

async function getRecommendedGroup(user_id, course_id, include_background=1) {
  // TODO: Return recommended group for user with id = user_id in course with id = course_id

  const info = db.getRows("SELECT user_id, assignment_id, SUM(num_hours) AS time, MAX(completed) AS complete, SUM(num_entries) AS days FROM (SELECT user_id, assignment_id, SUM(hours) AS num_hours, completed, COUNT(*) as num_entries FROM classcaster_schema.times GROUP BY (user_id, assignment_id, completed)) GROUP BY (user_id, assignment_id)", []);
  const background_info = db.getRows("SELECT id AS user_id, race, gender, age, num_upper_taken, num_lower_taken FROM classcaster_schema.users", []);

  var class_feat = {};
  // Lists of ages...etc for each user_id
  var ages = [];
  var uppers = [];
  var lower = [];
  // Dictionaries with assignments as keys, and lists of times..etc for each user_id as values
  // Complete is a dict with uid as keys and # of completed assignments as values
  var times = {};
  var days = {};
  var completes = {};

  // TODO: deal with completes

  // Collect values for mean and std
  for (const row in background_info.rows) {
    class_feat[row[0]] = {
      "race": row[1],
      "gender": row[2]
    }
    ages.push(row[3]);
    uppers.push(row[4]);
    lowers.push(row[5]);
  }

  for (const row in info.rows) {
    if (!(row[1] in times)){
      times[row[1]] = [row[2]];
    } else {
      times[row[1]].push(row[2])
    }
    if (!(row[1] in days)){
      days[row[1]] = [row[4]];
    } else {
      days[row[1]].push(row[4]);
    }
    if (!row[0] in completes) {
      completes[row[0]] = 1;
    } else {
      completes[row[0]] += 1;
    }
  }

  // Calculate mean and std
  var age_metrics = [math.mean(ages), math.std(ages)];
  var upper_metrics = [math.mean(uppers), math.std(uppers)];
  var lower_metrics = [math.mean(lowers), math.std(lowers)];
  var complete_metrics = [math.mean(completes.values()), math.std(completes.values())];

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

  for (const row in background_info.rows) {
    class_feat[row[0]]["age"] = (row[3] - age_metrics[0]) / age_metrics[1];
    class_feat[row[0]]["upper"] =(row[4] - upper_metrics[0]) / upper_metrics[1];
    class_feat[row[0]]["lower"] = (row[5] - lower_metrics[0]) / lower_metrics[1];
  }

  for (const row in info.rows) {
    // Have class_feat.time be a list of all the times this user spent on each assignment
    if (!("time" in class_feat[row[0]])){
      class_feat[row[0]]["time"] = [(row[2] - time_metrics[row[1]][0]) / time_metrics[row[1]][1]];
    } else {
      class_feat[row[0]]["time"].push((row[2] - time_metrics[row[1]][0]) / time_metrics[row[1]][1]);
    }
    if (!("days" in class_feat[row[0]])){
      class_feat[row[0]]["days"] = [(row[4] - days_metrics[row[1]][0]) / days_metrics[row[1]][1]];
    } else {
      class_feat[row[0]]["days"].push((row[4] - days_metrics[row[1]][0]) / days_metrics[row[1]][1]);
    }
  }

  // Take average of all the times each user spends on each assignment
  for (const [uid, values] of Object.entries(class_feat)) {
    values["time"] = math.mean(values["time"]);
    values["days"] = math.mean(values["days"]);
  }

  console.log(info[0], background_info[0]);

  // Setting study groups of 3 for now; can change later.
  const res = await axios.post("https://hackmit-1.azurewebsites.net", {
    "uid": user_id,
    "k": 3,
    "include_background": include_background,
    "class_feat": class_feat
  });

  console.log(res);

  return res;

}

module.exports.getRecommendedGroup = getRecommendedGroup;