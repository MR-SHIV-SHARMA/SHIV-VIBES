import mongoose, { Document, Schema } from "mongoose";

// Define the interface to match the schema structure
export interface ICourse extends Document {
  title: string;
  status: string;
  description: string;
  key_elements: {
    Notes: {
      description: string;
      quote: string;
    };
    Scales: {
      description: string;
      quote: string;
    };
    Chords: {
      description: string;
      quote: string;
    };
    Rhythm: {
      description: string;
      quote: string;
    };
    Melody: {
      description: string;
      quote: string;
    };
    Harmony: {
      description: string;
      quote: string;
    };
    Form: {
      description: string;
      quote: string;
    };
  };
  additional_topics: {
    Intervals: {
      description: string;
      quote: string;
    };
    Dynamics: {
      description: string;
      quote: string;
    };
    Articulation: {
      description: string;
      quote: string;
    };
    Timbre: {
      description: string;
      quote: string;
    };
    SightReading: {
      description: string;
      quote: string;
    };
    EarTraining: {
      description: string;
      quote: string;
    };
  };
  tips_for_beginners: string[];
  resources: string[];
  conclusion: string;
}

// Define the schema to match the updated interface
const basicMusicSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    key_elements: {
      Notes: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Scales: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Chords: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Rhythm: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Melody: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Harmony: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Form: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
    },
    additional_topics: {
      Intervals: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Dynamics: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Articulation: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      Timbre: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      SightReading: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
      EarTraining: {
        description: { type: String, required: true },
        quote: { type: String, required: true },
      },
    },
    tips_for_beginners: { type: [String], required: true },
    resources: { type: [String], required: true },
    conclusion: { type: String, required: true },
  },
  { timestamps: true }
);

const Basic_Music =
  mongoose.models.Basic_Music ||
  mongoose.model<ICourse>("Basic_Music", basicMusicSchema);

export default Basic_Music;
