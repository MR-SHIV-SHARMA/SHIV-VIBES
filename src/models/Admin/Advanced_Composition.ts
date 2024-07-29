import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the AdvancedComposition document
export interface IAdvancedComposition extends Document {
  Defining_Composition_Structure: string;
  Starting_Points: string;
  Planning_and_Parameters: string;
  Techniques_and_Resources: string;
  Collaboration_and_Chance: string;
  Workshops_and_Education: string;
  Advanced_Music_Theory: string;
  Experimental_Approaches: string;
  Cultural_Context: string;
  Portfolio_Development: string;
  Performance_and_Interpretation: string;
  Technology_in_Composition: string;
  Ethical_Considerations: string;
}

// Create the schema for the AdvancedComposition
const advancedCompositionSchema: Schema = new Schema({
  Defining_Composition_Structure: { type: String, required: true },
  Starting_Points: { type: String, required: true },
  Planning_and_Parameters: { type: String, required: true },
  Techniques_and_Resources: { type: String, required: true },
  Collaboration_and_Chance: { type: String, required: true },
  Workshops_and_Education: { type: String, required: true },
  Advanced_Music_Theory: { type: String, required: true },
  Experimental_Approaches: { type: String, required: true },
  Cultural_Context: { type: String, required: true },
  Portfolio_Development: { type: String, required: true },
  Performance_and_Interpretation: { type: String, required: true },
  Technology_in_Composition: { type: String, required: true },
  Ethical_Considerations: { type: String, required: true },
});

// Create and export the model
const AdvancedComposition =
  mongoose.models.Advanced_Composition ||
  mongoose.model<IAdvancedComposition>(
    "Advanced_Composition",
    advancedCompositionSchema
  );

export default AdvancedComposition;
