const db = require("../db/index");

export async function updatePredictedScores() {
  // TODO: Retrain model
  // To run a query, do:
  // const output = db.getRows(YOUR_SQL_QUERY, []);
  // e.g. db.getRows("SELECT * FROM classcaster_schema.users WHERE id = $1", [user_id])
}

export async function getPredictedScore(user_id, assignment_id) {
  // TODO: Return predicted score for user with id = user_id and assignment with id = assigment_id
}
