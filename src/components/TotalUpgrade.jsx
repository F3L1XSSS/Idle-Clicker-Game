import { useState } from 'react';

const TotalUpgrade = ({ id, totname, totcost, totOnPurshcase, totPurchcased }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePurchase = () => {
    // Если покупка успешна, деактивируем кнопку
    if (totOnPurshcase(id, totcost)) {
      setIsButtonDisabled(true);
    }
  };

  return (
    <>
      <div key={id} className="bg-gray-600 p-4 rounded-lg shadow-inner mt-2">
        <h3 className="text-lg">{totname}</h3>
        <p>Стоимость: {totcost} $</p>
        <p>Effect: income x2</p>
        {!totPurchcased && (
          <button
            onClick={handlePurchase}
            disabled={isButtonDisabled}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mt-3 ${
              isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            Купить
          </button>
        )}
        {totPurchcased && (
          <button
            disabled={true}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-3 opacity-50 cursor-not-allowed"
          >
            Куплено
          </button>
        )}
      </div>
    </>
  );
};

export default TotalUpgrade;
