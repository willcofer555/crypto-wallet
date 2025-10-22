import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

// Define schema for User model
const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define and export User model
const User = mongoose.model<UserDocument>('User', userSchema);

export default User;