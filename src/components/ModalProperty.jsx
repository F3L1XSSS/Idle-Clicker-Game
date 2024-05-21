import React, { useState, useEffect } from "react";

const PropertyModal = ({ isShowing, property, toggleModal }) => {
  if (!isShowing) return null;

  const properties = [
    { name: 'Big Mac', price: 2 },
    { name: 'Flip Flops', price: 3 },
    { name: 'Coca-Cola Pack', price: 5 },
    { name: 'Movie Ticket', price: 12 },
    { name: 'Book', price: 15 },
    { name: 'Lobster Dinner', price: 45 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-4 rounded shadow-lg w-3/4 relative">
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 transition-all ease-in-out hover:scale-110 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="25px"
            height="25px"
            fill="white"
            stroke="white"
          >
            <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Property Details</h2>
        <div className="grid grid-cols-3 gap-4">
          {properties.map((item, index) => (
            <div key={index} className="bg-black p-4 rounded shadow-lg text-center">
              <img src={`path_to_images/${item.name.replace(/\s+/g, '_').toLowerCase()}.png`} alt={item.name} className="mb-2 mx-auto" />
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="mb-2">${item.price}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Buy</button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;