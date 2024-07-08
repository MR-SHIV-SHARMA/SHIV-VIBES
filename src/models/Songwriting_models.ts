// src/models/songWriting_models.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interfaces for TypeScript type checking
interface ExampleSong {
  song: string;
  artist: string;
  url: string;
}

interface Section {
  title: string;
  content: string[];
  image: {
    url: string;
    alt: string;
  };
  examples: ExampleSong[];
}

interface CraftingMelodiesAndLyricsSection {
  title: string;
  content: string[];
  image: {
    url: string;
    alt: string;
  };
  tips?: { author: string; tip: string }[];
  infographic?: {
    url: string;
    alt: string;
  };
}

// Define interface for SongWritingData
export interface SongWritingData extends Document {
  title: string;
  sections: Section[];
  craftingMelodiesAndLyrics: CraftingMelodiesAndLyricsSection;
}

// Define mongoose schema for ExampleSong
const ExampleSongSchema = new Schema<ExampleSong>({
  song: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true }
});

// Define mongoose schema for Section
const SectionSchema = new Schema<Section>({
  title: { type: String, required: true },
  content: [{ type: String, required: true }],
  image: {
    url: { type: String, required: true },
    alt: { type: String, required: true }
  },
  examples: { type: [ExampleSongSchema], required: true }
});

// Define mongoose schema for CraftingMelodiesAndLyricsSection
const CraftingMelodiesAndLyricsSectionSchema = new Schema<CraftingMelodiesAndLyricsSection>({
  title: { type: String, required: true },
  content: [{ type: String, required: true }],
  image: {
    url: { type: String, required: true },
    alt: { type: String, required: true }
  },
  tips: [{ 
    author: { type: String, required: true },
    tip: { type: String, required: true }
  }],
  infographic: {
    url: { type: String, required: false },
    alt: { type: String, required: false }
  }
});

// Define mongoose schema for SongWritingData
let SongWritingModel: Model<SongWritingData> | null = null;

if (!mongoose.models.SongWriting) {
  const SongWritingSchema = new Schema({
    title: { type: String, required: true },
    sections: { type: [SectionSchema], required: true },
    craftingMelodiesAndLyrics: { type: CraftingMelodiesAndLyricsSectionSchema, required: true }
  });

  SongWritingModel = mongoose.model<SongWritingData>('SongWriting', SongWritingSchema);
} else {
  SongWritingModel = mongoose.models.SongWriting as Model<SongWritingData>;
}

export default SongWritingModel;
