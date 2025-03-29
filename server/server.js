// Import dependencies (ES6)
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoute.js";
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();



// Create an Express app
const app = express();

// Get the directory name for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));
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
app.use("/api/v1/contact", contactRoutes);

// Define a basic route
app.get('/', (req, res) => {
    res.send('Server is running on port 5000!');
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
