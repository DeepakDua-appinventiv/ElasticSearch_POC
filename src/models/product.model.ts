import mongoose, {Document, Schema} from 'mongoose'

interface IProduct extends Document {
    name: string;
    categories: string[];
    description: string;
}


const productSchema = new Schema<IProduct>({
//   sku: { type: String, required: true },
  name: { type: String, required: true },
  categories: { type: [String], required: true },
  description: { type: String, required: true },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);

