import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces for schema fields
export interface KeyElement {
    description: string;
    quote?: string;
}

export interface AdditionalTopic {
    description: string;
    quote?: string;
}

// Define document interface for TypeScript
export interface BasicMusicTheoryDocument extends Document {
    title: string;
    description: string;
    key_elements: {
        Notes: KeyElement;
        Scales: KeyElement;
        Chords: KeyElement;
        Rhythm: KeyElement;
        Melody: KeyElement;
        Harmony: KeyElement;
        Form: KeyElement;
    };
    additional_topics: {
        Intervals: AdditionalTopic;
        Dynamics: AdditionalTopic;
        Articulation: AdditionalTopic;
        Timbre: AdditionalTopic;
        SightReading: AdditionalTopic;
        EarTraining: AdditionalTopic;
    };
    tips_for_beginners: string[];
    resources: string[];
    conclusion: string;
}

// Define Mongoose schemas
const KeyElementSchema = new Schema<KeyElement>({
    description: { type: String, required: true },
    quote: { type: String }
});

const AdditionalTopicSchema = new Schema<AdditionalTopic>({
    description: { type: String, required: true },
    quote: { type: String }
});

// Define main schema for BasicMusicTheory
const BasicMusicTheorySchema = new Schema<BasicMusicTheoryDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    key_elements: {
        Notes: { type: KeyElementSchema, required: true },
        Scales: { type: KeyElementSchema, required: true },
        Chords: { type: KeyElementSchema, required: true },
        Rhythm: { type: KeyElementSchema, required: true },
        Melody: { type: KeyElementSchema, required: true },
        Harmony: { type: KeyElementSchema, required: true },
        Form: { type: KeyElementSchema, required: true }
    },
    additional_topics: {
        Intervals: { type: AdditionalTopicSchema, required: true },
        Dynamics: { type: AdditionalTopicSchema, required: true },
        Articulation: { type: AdditionalTopicSchema, required: true },
        Timbre: { type: AdditionalTopicSchema, required: true },
        SightReading: { type: AdditionalTopicSchema, required: true },
        EarTraining: { type: AdditionalTopicSchema, required: true }
    },
    tips_for_beginners: { type: [String], required: true },
    resources: { type: [String], required: true },
    conclusion: { type: String, required: true }
});

// Check if model already exists before compiling it
const BasicMusicTheory =
    mongoose.models.BasicMusicTheory ||
    mongoose.model<BasicMusicTheoryDocument>('BasicMusicTheory', BasicMusicTheorySchema);

export default BasicMusicTheory;
