import mongoose, { Document, Schema } from "mongoose";

export interface IMusicProduction extends Document {
  title: string;
  status: string;
  content: string;
  image: string;
}

const musicProductionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const MusicProduction =
  mongoose.models.MusicProduction ||
  mongoose.model<IMusicProduction>("MusicProduction", musicProductionSchema);

export default MusicProduction;
