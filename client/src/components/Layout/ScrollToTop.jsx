import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa"; // You can use any icon

const ScrollToTopButton = () => {
    return (
        <ScrollToTop
            smooth
            style={{
                backgroundColor: "orange", // Change the color code to a valid one (e.g., Tailwind's blue-500 equivalent)
                color: "#fff",
                borderRadius: "50%",
                padding: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for better look
            }}
        />

    );
};

export default ScrollToTopButton;
