import mongoose, { Document, Schema } from 'mongoose';

// Define interface for AnalyticsData document
interface AnalyticsDataDocument extends Document {
  userId: string;
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  // Add other properties as needed
}

// Define schema for AnalyticsData model
const analyticsDataSchema = new Schema<AnalyticsDataDocument>({
  userId: {
    type: String,
    required: true,
  },
  totalUsers: {
    type: Number,
    required: true,
  },
  activeUsers: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  // Add other properties and their types as needed
});

// Define and export AnalyticsData model
const AnalyticsData = mongoose.model<AnalyticsDataDocument>('AnalyticsData', analyticsDataSchema);

export default AnalyticsData;