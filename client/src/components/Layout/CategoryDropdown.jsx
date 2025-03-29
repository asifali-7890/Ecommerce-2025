import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <li className="relative nav-item list-none" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="nav-link flex items-center gap-2 text-gray-300 hover:text-blue-400 transition duration-200"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Categories
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200">
                    <li>
                        <Link
                            to="/categories"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            All Categories
                        </Link>
                    </li>
                    {categories?.map((c) => (
                        <li key={c._id}>
                            <Link
                                to={`/category/${c.slug}`}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {c.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default CategoryDropdown;