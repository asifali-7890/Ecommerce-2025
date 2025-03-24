// Import dependencies (ES6)
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoute.js";
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();



// Create an Express app
const app = express();
app.use(express.json());
// Middleware to handle form data and file uploads

// Middleware
app.use(cors());           // Enable Cross-Origin Resource Sharing
app.use(express.json());    // Parse incoming JSON requests
app.use(morgan('dev'));     // Log HTTP requests

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Define a basic route
app.get('/', (req, res) => {
    res.send('Server is running on port 5000!');
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
