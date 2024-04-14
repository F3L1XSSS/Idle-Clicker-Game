import React, { useEffect, useState, useRef } from 'react';
import Location from './Component/Location2';
import backgroundMusic from './Audio/steps-full.wav'
import backgroundImage from './Photo/Fone2.webp'
import YellowCrystal from './Photo/yellowCrystal.png'
import BackToLock from './Component/BackToLoc';

const SecBuisnessWindow = ({fname, fIncome, fOnUpgrade, fUpgradeCost, fLevel, fUnlocked, fOnUnlock, fUnlockCost, multiplier}) => {
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
      <h3 className="text-2xl font-bold mb-4">{fname}</h3>
      <p className="text-xl mb-4">Income: <span className="font-bold">${fIncome.toFixed(2) * multiplier.toFixed(2)}</span> per second</p>
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

    localStorage.removeItem('fBalance');
    localStorage.removeItem('fIncome');
    localStorage.removeItem('fUpgradeCost');
    localStorage.removeItem('fUpgradeCount');
    localStorage.removeItem('secPurchasedUpgrade');
    localStorage.removeItem('purchasedLocations');
  };

  const convertBalanceToYellowCrystal = () => {
    const conversionRate = 10000000; // Курс обмена
    const newYellowCrystal = fBalance / conversionRate;
    setYellowCrystal(currentYellowCrystal => currentYellowCrystal + newYellowCrystal);
    setFBalance(0); // Обнуляем balance после конвертации
    // Предполагается, что balance полностью конвертируется в yellowCrystals
  };

  const purchaseLocation = (id, cost) => {
    if (yellowCrystal >= cost) {
      setYellowCrystal(currentYellowCrystal => currentYellowCrystal - cost);
      setPurchasedLocations(prev => ({ ...prev, [id]: true }));
    } else {
      alert('Not enough yellow crystals to purchase!');
    }
  };

  const purchaseUpgrade = (id, cost) => {
    if (fBalance >= cost) {
      setFBalance(currentfBalance => currentfBalance - cost);
      setSecPurchasedUpgrade(prev => ({ ...prev, [id]: true }));
      
      if (id === 2 || id === 5) {
        setSFirstBusinessMultiplier(prev => {
          const newMultiplier = prev * 2;
          localStorage.setItem('sFirstBusinessMultiplier', newMultiplier.toString()); // Сохраняем новый множитель
          return newMultiplier;
        });
      }
      // ... остальная часть функции
    } else {
      alert('Not enough balance to unlock!');
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(backgroundMusic));

  useEffect(() => {
    // Автоматическое воспроизведение, когда компонент монтируется
    audioRef.current.play().catch((e) => console.log(`Не удалось воспроизвести звук: ${e}`));
    audioRef.current.loop = true;

    // Очистка перед размонтированием компонента
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    // Управление воспроизведением музыки
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  const SecTotalUpgrade = ({ id, totname, totcost, totOnPurshcase, totPurchcased }) => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlePurchase = () => {
        // Если покупка успешна, деактивируем кнопку
        if(totOnPurshcase(id, totcost)) {
            setIsButtonDisabled(true);
        }
    };

    return (
        <>
        <div key={id} className="bg-gray-600 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg">{totname}</h3>
          <p>Стоимость: {totcost} $</p>
          <p>Effect: income x2</p>
          {!totPurchcased && (
            <button
              onClick={handlePurchase}
              disabled={isButtonDisabled}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mt-3 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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
}

  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const toggleStore = () => {
    setIsStoreOpen(!isStoreOpen);
  };

  const [sFirstBusinessMultiplier, setSFirstBusinessMultiplier] = useState(() => {
    // Загружаем сохраненное значение из localStorage или устанавливаем 1, если его нет
    const savedMultiplier = localStorage.getItem('sFirstBusinessMultiplier');
    return savedMultiplier ? Number(savedMultiplier) : 1;
  });
  

  const locations = [
    { id: 100, name: 'Space', cost: 1000 }
    // Добавьте здесь больше локаций по мере необходимости
  ];

  const goBack = [
   { id: 999, name: 'First Location' }
  ]

  const totalUpgrade = [
    { 
      id: 2, totname: 'First Buisness Upgrade #1', totcost: 10000
    },
    
    { 
      id: 5, totname: 'First Buisness Upgrade #2', totcost: 1000000
    },  
  ]

  const [purchasedLocations, setPurchasedLocations] = useState(() => {
    const savedLocations = localStorage.getItem('purchasedLocations');
    return savedLocations ? JSON.parse(savedLocations) : {};
  });
  const [secPurchasedUpgrade, setSecPurchasedUpgrade] = useState(() => {
    const saved = localStorage.getItem('secPurchasedUpgrade');
    return saved ? JSON.parse(saved) : {};
  });

  const [yellowCrystal, setYellowCrystal] = useState(() => Number(localStorage.getItem('yellowCrystal')) || 1000);
  const [fBalance, setFBalance] = useState(() => Number(localStorage.getItem('fBalance')) || 0);
  const [fIncome, setFIncome] = useState(() => Number(localStorage.getItem('fIncome')) || 100);
  const [fUpgradeCost, setFUpgradeCost] = useState (() => Number(localStorage.getItem('fUpgradeCost')) || 1000);
  const [fUpgradeCount, setFUpgradeCount] = useState (() => Number(localStorage.getItem('fUpgradeCount')) || 0);

  useEffect(() => {
    const secSaveState = () => {
      localStorage.setItem('secPurchasedUpgrade', JSON.stringify(secPurchasedUpgrade));
      localStorage.setItem('purchasedLocations', JSON.stringify(purchasedLocations));
      localStorage.setItem('sFirstBusinessMultiplier', sFirstBusinessMultiplier.toString()); // Сохраняем множитель


      localStorage.setItem('fBalance', fBalance.toString());
      localStorage.setItem('fIncome', fIncome.toString());
      localStorage.setItem('fUpgradeCost', fUpgradeCost.toString());
      localStorage.setItem('fUpgradeCount', fUpgradeCount.toString());
    };
    secSaveState();
  }, [fBalance, fIncome, fUpgradeCost, fUpgradeCount, purchasedLocations, secPurchasedUpgrade, sFirstBusinessMultiplier]);

  useEffect(() => {
    const secInterval = setInterval(() => {
      setFBalance((currentFBalance) => currentFBalance + fIncome * sFirstBusinessMultiplier);
    }, 1000);

    return() => 
      clearInterval(secInterval);
  }, [fIncome,sFirstBusinessMultiplier]);

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
<div style={{ backgroundImage: `url(${backgroundImage})` }} className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <div className="absolute right-0 top-0 m-4 flex items-center space-x-2">
      <button onClick={toggleStore} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
  Магазин
</button>
<button onClick={toggleSound} className={`ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-2xl border-2 border-green-500 transition duration-300 ease-in-out`}>
          {isPlaying ? '🔊' : '🔇'}
        </button>
        </div>

        {isStoreOpen && (
  <div style={{zIndex: 100, maxHeight: '500px', overflowY: 'auto', width: '400px'}}className="bg-gray-700 p-5 rounded-lg shadow-lg mt-5 absolute right-0 top-14 mr-4">
  <h2 className="text-xl mb-4">Магазин локаций</h2>
  <div className="flex items-center mb-4">
  <img src={YellowCrystal} alt="Green Crystal" className="inline-block h-6 w-6" /> <span className="font-bold">{yellowCrystal.toFixed(4)}</span>
  </div>
  <button onClick={convertBalanceToYellowCrystal} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110 mb-4">
    Конвертировать баланс в <img src={YellowCrystal} alt="Green Crystal" className="inline-block h-6 w-6" />
  </button>
    {locations.map(location => (
        <Location
          key={location.id}
          id={location.id}
          name={location.name}
          cost={location.cost}
          purchased={!!purchasedLocations[location.id]}
          onPurchase={purchaseLocation}
        />
      ))}

      {goBack.map(goBack => (
        <BackToLock
          key={goBack.id}
          id={goBack.id}
          name={goBack.name}
          />
      ))}

<div className="mt-8 mb-4">
      <h2 className="text-xl font-bold">Upgrades</h2>
    </div>

    {totalUpgrade.map(totalUpgradeItem => (
  <SecTotalUpgrade
  key={totalUpgradeItem.id}
  id={totalUpgradeItem.id}
  totname={totalUpgradeItem.totname}
  totcost={totalUpgradeItem.totcost}
  totPurchcased={!!secPurchasedUpgrade[totalUpgradeItem.id]}
  totOnPurshcase={purchaseUpgrade}
/>
  
  ))}

    </div>
)}


      <h1 className="text-4xl font-bold mb-6 text-orange-800">Business Game</h1>
      <p className="text-orange-800 text-xl mb-4">Balance: <span className="text-orange-800 font-bold">${fBalance.toFixed(2)}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
      <SecBuisnessWindow
          fname="First Buisness"
          fIncome={fIncome}
          fOnUpgrade={fPurshcaseUpgrade}
          fUpgradeCost={fUpgradeCost}
          fLevel={fUpgradeCount}
          fUnlocked={true}
          multiplier={sFirstBusinessMultiplier}
        />
      </div>
    </div>
    
    </>
  );
};

export default LocationPage;
