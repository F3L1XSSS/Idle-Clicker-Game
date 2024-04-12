import React, { useEffect, useState } from 'react';

const SecBuisnessWindow = ({fIncome, fOnUpgrade, fUpgradeCost, fLevel, fUnlocked, fOnUnlock, fUnlockCost}) => {
  if (!fUnlocked) {
    return (
      <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={fOnUnlock}
      >
        Unlock for ${fUnlockCost}
      </button>
    );
  }

  return (
    <div className="bg-gray-700 p-5 rounded-lg shadow-lg">
      
      <p className="text-xl mb-4">Income: <span className="font-bold">${fIncome.toFixed(2)}</span> per second</p>
      <p className="text-xl mb-4">Your Level: <span className="font-bold">{fLevel}</span></p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={fOnUpgrade}
      >
        Upgrade for ${fUpgradeCost.toFixed(2)}
      </button>
    </div>
  );
};

const LocationPage = () => {
  const SecResetGame = () => {
    // Сброс состояний до начальных значений
    setFBalance(0);
    setFIncome(100);
    setFUpgradeCost(1000);
    setFUpgradeCount(0);

    // Очистка localStorage
    localStorage.clear();
  };

  const [fBalance, setFBalance] = useState(() => Number(localStorage.getItem('fBalance')) || 0);
  const [fIncome, setFIncome] = useState(() => Number(localStorage.getItem('fIncome')) || 100);
  const [fUpgradeCost, setFUpgradeCost] = useState (() => Number(localStorage.getItem('fUpgradeCost')) || 1000);
  const [fUpgradeCount, setFUpgradeCount] = useState (() => Number(localStorage.getItem('fUpgradeCount')) || 0);

  useEffect(() => {
    const secSaveState = () => {
      localStorage.setItem('fBalance', fBalance.toString());
      localStorage.setItem('fIncome', fIncome.toString());
      localStorage.setItem('fUpgradeCost', fUpgradeCost.toString());
      localStorage.setItem('fUpgradeCount', fUpgradeCount.toString());
    };
    secSaveState();
  }, [fBalance, fIncome, fUpgradeCost, fUpgradeCount]);

  useEffect(() => {
    const secInterval = setInterval(() => {
      setFBalance((currentFBalance) => currentFBalance + fIncome);
    }, 1000);

    return() => 
      clearInterval(secInterval);
  }, [fIncome]);

  const fPurshcaseUpgrade = () => {
    if (fBalance >= fUpgradeCost) {
      setFIncome(currentfIncome => currentfIncome * 1.7);
        setFBalance(currentfBalance => currentfBalance - fUpgradeCost)
        setFUpgradeCount(fUpgradeCount => fUpgradeCount + 1);

        setFUpgradeCost(currentfCost => currentfCost * 2);

        if ((fUpgradeCount + 1) % 5 === 0) {
          setFIncome(currentfIncome => currentfIncome * 1.2);
        }
        if ((fUpgradeCount + 1) % 10 === 0) {
          setFIncome(currentfIncome => currentfIncome * 1.3);
        }
      } else {
        alert("balance not enough!");
      }
  }

  return (
<>
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <button onClick={''} className="absolute right-0 top-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
  Магазин
</button>
      <button onClick={SecResetGame} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110">Start Over</button>
      <h1 className="text-4xl font-bold mb-6">Business Game</h1>
      <p className="text-xl mb-4">Balance: <span className="font-bold">${fBalance.toFixed(2)}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
      <SecBuisnessWindow
          fIncome={fIncome}
          fOnUpgrade={fPurshcaseUpgrade}
          fUpgradeCost={fUpgradeCost}
          fLevel={fUpgradeCount}
          fUnlocked={true}
        />
      </div>
    </div>
    
    </>
  );
};

export default LocationPage;