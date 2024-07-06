// course.model.js

import mongoose from "mongoose";

/**
 * @typedef {Object} Lesson
 * @property {string} title - The title of the lesson.
 * @property {string} duration - The duration of the lesson.
 */

/**
 * @typedef {Object} CourseDocument
 * @property {string} title - The title of the course.
 * @property {string} instructor - The instructor of the course.
 * @property {string} description - The description of the course.
 * @property {number} hours - The number of hours the course takes.
 * @property {number} reviews - The number of reviews for the course.
 * @property {number} enrollment - The number of students enrolled in the course.
 * @property {string} imageUrl - The URL of the course image.
 * @property {string} uniqueID - The unique ID of the course.
 * @property {Lesson[]} lessons - The array of lessons in the course.
 */

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
