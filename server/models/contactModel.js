import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        address: { type: String }, // Optional field
        number: { type: String }   // Optional field (as a string to include formatting)
    },
    { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
