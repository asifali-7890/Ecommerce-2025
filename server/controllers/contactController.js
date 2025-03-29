import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message, address, number } = req.body;
        // Basic validation for required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required.",
            });
        }
        const contact = new Contact({ name, email, message, address, number });
        await contact.save();
        res.status(201).json({
            success: true,
            message: "Contact message submitted successfully.",
            contact,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error submitting contact message.",
            error,
        });
    }
};
