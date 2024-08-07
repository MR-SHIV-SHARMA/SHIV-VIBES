import mongoose, { Document, Schema } from "mongoose";

// Define the interfaces
interface IContent {
  point1: string;
  point2: string;
  point3: string;
  point4?: string; // Optional field
}

interface IImage {
  url: string;
  alt?: string; // Optional field
}

interface Itips {
  author: string;
  tip?: string; // Optional field
}

interface IExamples {
  song: string;
  artist: string;
  url: string;
}

// Extend Document to include Mongoose document methods
interface ISection extends Document {
  title: string;
  status: string;
  content?: IContent; // Optional field
  image?: IImage; // Optional field
  examples?: IExamples; // Optional field
  tips?: Itips; // Optional field
}

// Define the schemas
const ContentSchema = new Schema<IContent>({
  point1: { type: String, required: true },
  point2: { type: String, required: true },
  point3: { type: String, required: true },
  point4: { type: String }, // Optional field
});

const ImageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  alt: { type: String }, // Optional field
});

const TipsSchema = new Schema<Itips>({
  author: { type: String, required: true },
  tip: { type: String }, // Optional field
});

const ExamplesSchema = new Schema<IExamples>({
  song: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
});

// Define the main schema
const SectionSchema = new Schema<ISection>(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    content: { type: ContentSchema },
    image: { type: ImageSchema },
    examples: { type: ExamplesSchema },
    tips: { type: TipsSchema },
  },
  { timestamps: true }
);

// Create and export the model
const Section =
  mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);

export default Section;
