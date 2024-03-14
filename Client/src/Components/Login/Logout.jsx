import React from "react";
import axios from "axios";

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", null, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
