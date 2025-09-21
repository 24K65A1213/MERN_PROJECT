// src/controllers/studentController.js

const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
async function adminLogin(req, res ) {
    const { username, password } = req.body;
    // Hardcoded credentials
    const hardcodedUsername = "admin";
    const hardcodedPassword = "admin123";

    if (username === hardcodedUsername && password === hardcodedPassword) {
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
}

async function createstudent(req, res) {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ message: "Missing or invalid request body. Please send JSON with name, rollnumber, subjects, and marks." });
    }
    const { name, rollnumber, subjects, marks } = req.body;
    if (!name || !rollnumber || !subjects || !marks) {
        return res.status(400).json({ message: "Missing required fields: name, rollnumber, subjects, marks." });
    }
    try {
        const db = await connectDB();
        const result = await db.collection("students").insertOne({ name, rollnumber, subjects, marks });
        res.status(201).json({ message: "Student created", studentId: result.insertedId });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function adminread(req, res) {
    try {
        const db = await connectDB();
        const students = await db.collection("students").find().toArray();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function studentread(req, res) {
    const { id } = req.params;

    try {
        const db = await connectDB();
        const student = await db.collection("students").findOne({ _id: ObjectId(id) });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updatestudent(req, res) {
    const { rollnumber, name, subjects, marks } = req.body;
    if (!rollnumber) {
        return res.status(400).json({ message: "Missing rollnumber in request body." });
    }
    try {
        const db = await connectDB();
        const result = await db.collection("students").updateOne(
            { rollnumber },
            { $set: { name, subjects, marks } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student updated" });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function deletestudent(req, res) {
    const { rollnumber } = req.body;
    if (!rollnumber) {
        return res.status(400).json({ message: "Missing rollnumber in request body." });
    }
    try {
        const db = await connectDB();
        const result = await db.collection("students").deleteOne({ rollnumber });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    adminLogin,
    createstudent,
    adminread,
    studentread,
    updatestudent,
    deletestudent
};
