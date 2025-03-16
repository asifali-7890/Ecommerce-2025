import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected Routes (Token Based)
export const requireSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req.user = JWT.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json({ success: false, message: 'Unauthorized Access' });
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error in admin middleware', error });
    }
};
