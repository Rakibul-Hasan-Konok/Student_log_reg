import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        profilePic: { type: String, default: "" } // for file uploads
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;
