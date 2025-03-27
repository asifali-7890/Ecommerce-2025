import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
        ],
        payment: {
            amount: { type: Number, required: true }, // Store the total amount of the order
            method: { type: String, enum: ["Credit Card", "PayPal", "Cash"], default: "Cash" }, // Optional: Specify payment method
            status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" }, // Track payment status
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            default: "Not Processed", // Correct spelling
            enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"], // Updated options for clarity and correctness
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
