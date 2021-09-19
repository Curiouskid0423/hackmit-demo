var express = require("express");
const db = require("../db");
var azure = require("../ml/azure");
var tangram = require("../ml/tangram");
var router = express.Router();

router.post("/api", async (req, res, next) => {
  const { type } = req.body;
  if (type === "getCourseAssignments") {
    // name, numCompleted, numStudents, forecastTime
    const { course } = req.body;
    console.log(req.user);
    const { id } = req.user;
    const rows = db.getRows(
      `SELECT assignment_id, count(*) AS numStudents, count(*) filter (where completed) AS numCompleted FROM
       (
           SELECT assignment_id, user_id, MAX(completed) AS completed FROM classcaster_schema.times
           GROUP BY (assignment_id, user_id)
       )
       GROUP BY (assignment_id)`,
      []
    );
    return res.json(rows);
  } else if (type === "runAzurePredictions") {
    const { user, course } = req.body;
    const output = await azure.getRecommendedGroup(user, course);
    return res.json(output);
  } else if (type == "trainTangram") {
    const { assignment } = req.body;
    const output = await tangram.updatePredictedScores(assignment);
    return res.json(output);
  }
});

module.exports = router;
