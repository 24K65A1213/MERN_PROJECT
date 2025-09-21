//src/routes/adminRoutes.js
const express= require("express");
const router= express.Router();
const adminControllers = require('../controllers/adminControllers');

router.post("/", adminControllers.adminLogin);


// @route   POST /register
router.post("/create", adminControllers.createstudent);

// @route   GET /allstudents
router.get("/aread", adminControllers.adminread);

// @route   GET /student/:id
router.get("/sread", adminControllers.studentread);

// @route   PUT /student/:id
router.put("/update", adminControllers.updatestudent);

// @route   DELETE /student/:id
router.delete("/delete", adminControllers.deletestudent);



module.exports = router