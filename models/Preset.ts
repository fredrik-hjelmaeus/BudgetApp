import mongoose from 'mongoose';

interface IPiggybank {
  piggyId: mongoose.Schema.Types.ObjectId | undefined;
  month: string | undefined;
  year: string | undefined;
  savedAmount: number | undefined;
}

export interface IUpdatablePresetFields {
  name?: string;
  number?: number;
  category?: string;
  type?: string;
  piggybank?: IPiggybank[];
}

export interface IPreset extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  number: number;
  month: string;
  year: number;
  category: string;
  type: string;
  piggybank: IPiggybank[] | undefined;
}

const PresetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  piggybank: {
    type: [
      {
        month: {
          type: String,
          required: false,
        },
        year: {
          type: Number,
          required: false,
        },
        savedAmount: {
          type: Number,
          required: false,
        },
      },
    ],
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPreset>('preset', PresetSchema);
