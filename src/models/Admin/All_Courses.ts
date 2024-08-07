import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  title: string;
  duration: string;
  intro: string;
  description: string;
  videoUrl: string;
}

export interface ICourse extends Document {
  title: string;
  status: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
  isFree: boolean;
  thumbnail: string;
  videoUrl: string;
  totalDuration: string;
  accessPeriod: string;
  totalSales: number;
  createdAt: Date;
  videos: IVideo[];
}

const videoSchema: Schema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  intro: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const courseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    isFree: { type: Boolean, required: true },
    thumbnail: { type: String, required: true },
    videoUrl: { type: String, required: true },
    totalDuration: { type: String, required: true },
    accessPeriod: { type: String, required: true },
    totalSales: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    videos: { type: [videoSchema], required: true },
  },
  { timestamps: true }
);

const Course =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
