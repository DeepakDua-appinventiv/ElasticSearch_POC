import mongoose, {Schema} from 'mongoose'

interface IProduct{
    name: string;
    category: string;
    description: string;
}


const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);

