import mongoose, { Schema, Document } from 'mongoose';

interface PictureDocument extends Document {
  name: string;
  Image: {
    data: Buffer;
    contentType: string;
  };
}

const pictureSchema = new Schema({
  name: String,
  Image: {
    data: Buffer,
    contentType: String,
  },
});

const Picture = mongoose.model<PictureDocument>('Picture', pictureSchema);

export default Picture;



