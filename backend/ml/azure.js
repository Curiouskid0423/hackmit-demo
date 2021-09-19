const db = require("../db/index");
const axios = require('axios');

async function getRecommendedGroup(user_id, course_id) {
  // TODO: Return recommended group for user with id = user_id in course with id = course_id

  const info = db.getRows("SELECT user_id, assignment_id, SUM(num_hours) AS time, MAX(complete) AS complete, SUM(num_entries) AS days FROM (SELECT user_id, assignment_id, SUM(hours) AS num_hours, complete, COUNT(*) as num_entries FROM classcluster_schema.times GROUP BY (user_id, assignment_id, complete)) GROUP BY (user_id, assignment_id)", []);

  const background_info = db.getRows("SELECT id AS user_id, race, gender, age, num_upper_taken, num_lower_taken FROM classcluster_schema.user", []);

  console.log(info, background_info);

  const res = await axios.post("https://hackmit-1.azurewebsites.net", {

  });

  console.log(res);

  return res;

}

module.exports.getRecommendedGroup = getRecommendedGroup;