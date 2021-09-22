import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  contact: Number,
});
export interface User extends mongoose.Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: number;
}
