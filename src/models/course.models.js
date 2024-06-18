import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a course title"],
    },
    instructor: {
        type: String,
        required: [true, "Please provide an instructor name"],
    },
    description: {
        type: String,
        required: [true, "Please provide a course description"],
    },
    hours: {
        type: Number,
        required: [true, "Please provide the number of hours"],
    },
    reviews: {
        type: Number,
        default: 0,
    },
    enrollment: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: [true, "Please provide an image URL"],
    },
    uniqueID: {
        type: String,
        unique: true,
        required: true,
    },
    lessons: [
        {
            title: {
                type: String,
                required: [true, "Please provide a lesson title"],
            },
            duration: {
                type: String,
                required: [true, "Please provide a lesson duration"],
            }
        }
    ]
}, { timestamps: true });

const Course = mongoose.models.course || mongoose.model("course", courseSchema);

export default Course;
