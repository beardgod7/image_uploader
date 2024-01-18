import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  Image: {
    data: Buffer;
    contentType: string;
  };
}

const userSchema = new Schema({
  name: String,
  Image: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;



