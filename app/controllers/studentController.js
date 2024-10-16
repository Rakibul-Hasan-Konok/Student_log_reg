import Student from "../models/StudentModel.js";
import bcrypt from "bcrypt";
import { TokenEncode } from "../utility/tokenUtility.js";
import multer from "multer";

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Registration
export const Registration = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = await Student.create({ email, firstName, lastName, password: hashedPassword });
        return res.json({ status: "success", message: "Student registered successfully" });
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};

// Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.json({ status: "fail", message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.json({ status: "fail", message: "Invalid password" });
        }
        const token = TokenEncode(student.email, student._id);
        res.cookie("token", token, { httpOnly: true });
        return res.json({ status: "success", message: "User logged in successfully" });
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};

// Profile read
export const ProfileDetails = async (req, res) => {
    try {
        const student = await Student.findById(req.user.user_id);
        return res.json({ status: "success", message: "User profile retrieved", data: student });
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};

// Profile update
export const ProfileUpdate = async (req, res) => {
    try {
        const studentId = req.user.user_id;
        const updateData = req.body;
        await Student.updateOne({ _id: studentId }, updateData);
        return res.json({ status: "success", message: "User profile updated successfully" });
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};

// File upload
export const UploadProfilePic = (req, res) => {
    try {
        const filePath = req.file.path;
        const studentId = req.user.user_id;
        Student.updateOne({ _id: studentId }, { profilePic: filePath })
            .then(() => res.json({ status: "success", message: "File uploaded successfully", filePath }))
            .catch(e => res.json({ status: "fail", message: e.toString() }));
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};

// Read file
export const ReadProfilePic = async (req, res) => {
    try {
        const studentId = req.user.user_id;
        const student = await Student.findById(studentId);
        return res.json({ status: "success", message: "Profile picture retrieved", data: student.profilePic });
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};

// Delete file
export const DeleteProfilePic = async (req, res) => {
    try {
        const studentId = req.user.user_id;
        await Student.updateOne({ _id: studentId }, { profilePic: "" });
        return res.json({ status: "success", message: "Profile picture deleted successfully" });
    } catch (e) {
        return res.json({ status: "fail", message: e.toString() });
    }
};
