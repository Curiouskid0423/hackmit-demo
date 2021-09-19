var express = require("express");
var azure = require("../ml/azure");
var tangram = require("../ml/tangram");
var router = express.Router();

router.post("/api", async (req, res, next) => {
    const {type} = req.body;
    if (type === "getCourseAssignments") {
        return res.json([]);
    } else if (type === "runAzurePredictions") {
        const {user, course} = req.body;
        const output = await azure.getRecommendedGroup(user, course);
        return res.json(output);
    }
});

module.exports = router;