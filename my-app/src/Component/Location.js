import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenCrystal from '../Photo/greenCrystal.png'

const Location = ({ id, name, cost, onPurchase, purchased }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/location');
  };

  return (
    <>
    <div key={id} className="bg-gray-600 p-4 rounded-lg shadow-inner">
      <h3 className="text-lg">{name}</h3>
      <p>Стоимость: {cost}  <img src={greenCrystal} alt="Green Crystal" className="inline-block h-6 w-6" /></p>
      {!purchased ? (
        <button
          onClick={() => onPurchase(id, cost)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Купить
        </button>
      ) : (
        <button
          onClick={handleNavigate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Перейти
        </button>
      )}
    </div>   
    </>
  );
};

export default Location;
