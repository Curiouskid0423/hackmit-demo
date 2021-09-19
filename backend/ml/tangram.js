const db = require("../db/index");

async function updatePredictedScores(assignment_id) {
  // TODO: Retrain model
  // To run a query, do:
  // const output = db.getRows(YOUR_SQL_QUERY, []);
  // e.g. db.getRows("SELECT * FROM classcaster_schema.users WHERE id = $1", [user_id])

  // TODO: Get data into CSV form
  // Save CSV file
  // Call from tangram train --file heart_disease.csv --target diagnosis

  const info = await db.getRows("SELECT user_id, assignment_id, SUM(num_hours) AS time, MAX(completed) AS complete, SUM(num_entries) AS days FROM (SELECT user_id, assignment_id, SUM(hours) AS num_hours, completed, COUNT(*) as num_entries FROM classcaster_schema.times GROUP BY (user_id, assignment_id, completed)) GROUP BY (user_id, assignment_id)", []);
  const background_info = await db.getRows("SELECT id AS user_id, race, gender, age, num_upper_taken, num_lower_taken FROM classcaster_schema.users", []);


  
  var race_map = {
    "white": 0,
    "black": 1,
    "asian": 2,
    "hawaiian": 3,
    "american_indian": 4,
    "other": 5,
    "not_provided": 6
  }
  var gender_map = {
    "male": 0,
    "female": 1,
    "other": 2,
    "not_provided": 3
  }

  var class_feat = {};

   // Collect values for mean and std
  for (const row of background_info) {
    let intage = parseInt(row.age);
    if (intage == null || isNaN(intage)){
      intage = 20;
    }

    class_feat[row.user_id] = {
      "race": race_map[row.race],
      "gender": gender_map[row.gender],
      "age": intage,
      "upper": parseInt(row.num_upper_taken),
      "lower": parseInt(row.num_lower_taken)
    }
  }

  for (const row of info) {
    class_feat[row.user_id][(row.assignment_id)+"_time"] = parseFloat(row.time);
    class_feat[row.user_id][(row.assignment_id)+"_days"] = parseInt(row.days);
    let complete = 1 ? row.complete : 0;
    class_feat[row.user_id][(row.assignment_id)+"_complete"] = complete;
  }

  console.log(class_feat);


}

async function getPredictedScore(user_id, assignment_id) {
  // TODO: Return predicted score for user with id = user_id and assignment with id = assigment_id
}

module.exports.updatePredictedScores = updatePredictedScores;
module.exports.getPredictedScore = getPredictedScore;