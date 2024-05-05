import backgroundImage from '../images/fone.webp';

import '../styles/BusinessWindow.scss';

const BusinessWindow = ({
  name,
  income,
  onUpgrade,
  upgradeCost,
  level,
  unlocked,
  onUnlock,
  unlockCost,
  multiplier,
  convertNumberToShortForm,
  sciencePoints, // Предполагаем, что sciencePoints передаются как prop
}) => {
  const isFifthUpgrade = (level + 1) % 5 === 0; // Проверяем, является ли следующий уровень пятым

  if (!unlocked) {
    return (
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={onUnlock}
      >
        Unlock for ${unlockCost}
      </button>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-gray-700 p-5 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <p className="text-xl mb-4">
        Income:{' '}
        <span className="font-bold">
          ${convertNumberToShortForm(income.toFixed(2) * multiplier.toFixed(2))}
        </span>{' '}
        per second
      </p>
      <p className="text-xl mb-4">
        Your Level: <span className="font-bold">{level}</span>
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={onUpgrade}
        disabled={isFifthUpgrade && sciencePoints < 1} // Отключить кнопку, если это пятое улучшение и не хватает очков науки
      >
        {isFifthUpgrade
          ? `Upgrade for ${convertNumberToShortForm(upgradeCost.toFixed(2))} and 1 🧪 `
          : `Upgrade for ${convertNumberToShortForm(upgradeCost.toFixed(2))}`}
      </button>
    </div>
  );
};

export default BusinessWindow;
