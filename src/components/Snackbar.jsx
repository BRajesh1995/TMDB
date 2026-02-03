import React from "react";

const Snackbar = ({ message = "This is a snackbar message!", show = true, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded shadow-lg flex items-center space-x-4 z-50" data-testid="snackbar">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-gray-300 hover:text-white focus:outline-none" aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
};

export default Snackbar;
