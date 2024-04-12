import {useState, useEffect, useRef} from 'react'
import Location from './Component/Location';
import backgroundMusic from './Audio/please-calm-my-mind-125566.mp3'
import backgroundImage from './Photo/Fone.webp'

const BusinessWindow = ({ name, income, onUpgrade, upgradeCost, level, unlocked, onUnlock, unlockCost }) => {

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
    <div className="bg-gray-700 p-5 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <p className="text-xl mb-4">Income: <span className="font-bold">${income.toFixed(2)}</span> per second</p>
      <p className="text-xl mb-4">Your Level: <span className="font-bold">{level}</span></p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={onUpgrade}
      >
        Upgrade for ${upgradeCost.toFixed(2)}
      </button>
    </div>
  );
};

const BuisnessGame = () => {
  const resetGame = () => {
    setPurchasedLocations(0);
    setPurchasedUpgrade(false);
    setGreenCrystals(0);
    // Сброс состояний до начальных значений
    setBalance(0);
    setIncome(1);
    setUpgradeCost(10);
    setUpgradeCount(0);

    setSecondWindowUnlocked(false);
    setSecondIncome(0);
    setSecUpgradeCost(100);
    setSecUpgradeCount(0);

    setThirdWindowUnlocked(false);
    setThirdIncome(0);
    setThirdUpgradeCost(10000);
    setThirdUpgradeCount(0);

    // Очистка localStorage
    localStorage.clear();
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

 
  const TotalUpgrade = ({ id, totname, totcost, totOnPurshcase, totPurchcased }) => {

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


  const locations = [
    { id: 1, name: 'Desert', cost: 10000 }
    // Добавьте здесь больше локаций по мере необходимости
  ];

  const totalUpgrade = [
    { 
      id: 2, totname: 'Total Upgrade #1', totcost: 100
    },
    {
      id: 3, totname: 'Total Upgrade #2', totcost: 10000
    },
    {
      id: 4, totname: 'Total Upgrade #4', totcost: 1000000
    }
    
  ]

  const convertBalanceToGreenCrystals = () => {
    const conversionRate = 10000; // Курс обмена
    const newGreenCrystals = balance / conversionRate;
    setGreenCrystals(currentGreenCrystals => currentGreenCrystals + newGreenCrystals);
    setBalance(0); // Обнуляем balance после конвертации
    // Предполагается, что balance полностью конвертируется в greenCrystals
  };

  const purchaseUpgrade = (id, totcost) => {
    if (balance >= totcost) {
      setBalance(currentBalance => currentBalance - totcost);
      setPurchasedUpgrade(prev => ({ ...prev, [id]: true }));
      // Дополнительно, если нужно, обновите другие связанные состояния
      setIncome(currentIncome => currentIncome * 2);
    } else {
      alert('Not enough balance to unlock!');
    }
  };

  const purchaseLocation = (id, cost) => {
    if (greenCrystals >= cost) {
      setGreenCrystals(currentGreenCrystals => currentGreenCrystals - cost);
      setPurchasedLocations(prev => ({ ...prev, [id]: true }));
    } else {
      alert('Not enough green crystals to purchase!');
    }
  };
  //valuta green crystals

  //const [isPlaying, setIsPlaying] = useState(false);

  const [purchasedUpgrade, setPurchasedUpgrade] = useState(() => {
    const saved = localStorage.getItem('purchasedUpgrade');
    return saved ? JSON.parse(saved) : {};
  });
  const [greenCrystals, setGreenCrystals] = useState(() => Number(localStorage.getItem('greenCrystals')) || 0);
  const [purchasedLocations, setPurchasedLocations] = useState({});
  //first bussiness
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 0);
  const [income, setIncome] = useState(() => Number(localStorage.getItem('income')) || 1);
  const [upgradeCost, setUpgradeCost] = useState(() => Number(localStorage.getItem('upgradeCost')) || 10);
  const [upgradeCount, setUpgradeCount] = useState(() => Number(localStorage.getItem('upgradeCount')) || 0);

  //second bussiness
  const [secondWindowUnlocked, setSecondWindowUnlocked] = useState(() => Number(localStorage.getItem('secondWindowUnlocked')) || 0);
  const [secondIncome, setSecondIncome] = useState(() => Number(localStorage.getItem('secondIncome')) || 0);
  const [secUpgradeCost, setSecUpgradeCost] = useState(() => Number(localStorage.getItem('secUpgradeCost')) || 100);
  const [secUpgradeCount, setSecUpgradeCount] = useState(() => Number(localStorage.getItem('secUpgradeCount')) || 0);
  
  //third bussiness
  const [thirdWindowUnlocked, setThirdWindowUnlocked] = useState(() => Number(localStorage.getItem('thirdWindowUnlocked')) || 0);
  const [thirdIncome, setThirdIncome] = useState(() => Number(localStorage.getItem('thirdIncome')) || 0);
  const [thirdUpgradeCost, setThirdUpgradeCost] = useState(() => Number(localStorage.getItem('thirdUpgradeCost')) || 10000);
  const [thirdUpgradeCount, setThirdUpgradeCount] = useState(() => Number(localStorage.getItem('thirdUpgradeCount')) || 0);

  const secondUnlockCost = 1000;
  const thirdUnlockCost = 50000;

  useEffect(() => {
    // Сохранение текущего состояния в localStorage
    const saveState = () => {
      localStorage.setItem('purchasedUpgrade', JSON.stringify(purchasedUpgrade));

      localStorage.setItem('purchasedLocations', JSON.stringify(purchasedLocations));
      localStorage.setItem('greenCrystals', greenCrystals.toString());
      //first Window
      localStorage.setItem('balance', balance.toString());
      localStorage.setItem('income', income.toString());
      localStorage.setItem('upgradeCost', upgradeCost.toString());
      localStorage.setItem('upgradeCount', upgradeCount.toString());
      //second Window
      localStorage.setItem('secondWindowUnlocked', secondWindowUnlocked ? '1' : '0');
      localStorage.setItem('secondIncome', secondIncome.toString());
      localStorage.setItem('secUpgradeCost', secUpgradeCost.toString());
      localStorage.setItem('secUpgradeCount', secUpgradeCount.toString());
      //third Window
      localStorage.setItem('thirdWindowUnlocked', thirdWindowUnlocked ? '1' : '0');
      localStorage.setItem('thirdIncome', thirdIncome.toString());
      localStorage.setItem('thirdUpgradeCost', thirdUpgradeCost.toString());
      localStorage.setItem('thirdUpgradeCount', thirdUpgradeCount.toString());
    };

    // Вызов сохранения состояния при изменении любого из состояний
    saveState();
  }, [balance, income, upgradeCost, upgradeCount, secondWindowUnlocked, secondIncome, secUpgradeCost, secUpgradeCount, thirdWindowUnlocked, thirdIncome, thirdUpgradeCost, thirdUpgradeCount, greenCrystals, purchasedLocations, purchasedUpgrade]);

    useEffect(() => {
      const interval = setInterval(() => {
        setBalance((currentBalance) => currentBalance + income + secondIncome + thirdIncome);
      }, 1000);
      
      return() =>
        clearInterval(interval);
    }, [income + secondIncome + thirdIncome])

    const purshcaseUpgrade = () => {
      if (balance >= upgradeCost) {
        setIncome(currentIncome => currentIncome * 1.7);
        setBalance(currentBalance => currentBalance - upgradeCost)
        setUpgradeCount(upgradeCount => upgradeCount + 1);

        setUpgradeCost(currentCost => currentCost * 2);

        if ((upgradeCount + 1) % 5 === 0) {
          setIncome(currentIncome => currentIncome * 1.2);
        }
        if ((upgradeCount + 1) % 10 === 0) {
          setIncome(currentIncome => currentIncome * 1.3);
        }
      } else {
        alert("Balance not enough!");
      }
    };

    const unlockSecondWindow = () => {
      
      if (balance >= secondUnlockCost && !secondWindowUnlocked) {
        
      setBalance(prevBalance => prevBalance - secondUnlockCost);
       setSecondWindowUnlocked(true);
       localStorage.setItem('secondWindowUnlocked', '1');
      } else {
        alert("Not enough balance to unlock!");
      }
    };

    const unlockThirdWindow = () => {
      if (balance >= thirdUnlockCost && !thirdWindowUnlocked) {
        setBalance(prevBalance => prevBalance - thirdUnlockCost);
        setThirdWindowUnlocked(true);
        localStorage.setItem('thirdWindowUnlocked', '1');
      } else {
        alert('Not enough balance to unlock!');
      }
    };
     
    const secPurshcaseUpgrade = () => {
      if (balance >= secUpgradeCost) {
        setSecondIncome(currentsecondIncome => currentsecondIncome * 1.6 + 10);
        setBalance(prevBalance => prevBalance - secUpgradeCost);
        setSecUpgradeCount(secUpgradeCount + 1);

        setSecUpgradeCost(currentsecCost => currentsecCost * 3);
        if ((secUpgradeCount + 1) % 5 === 0){
          setSecondIncome(currentsecondIncome => currentsecondIncome * 1.25)
        }
        if ((secUpgradeCount + 1) % 10 === 0){
          setSecondIncome(currentsecondIncome => currentsecondIncome * 1.5) && setSecUpgradeCost(currentsecCost => currentsecCost * 1.25);
        }
        if ((secUpgradeCount + 1) % 100 === 0){
          setSecondIncome(currentsecondIncome => currentsecondIncome * 1.5);
        }
    } else {
      alert("balance not enough!");
    }
  };

  const thirdPurshcaseUpgrade = () => {
    if (balance >= thirdUpgradeCost) {
      setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5 + 100);
      setBalance(prevBalance => prevBalance - thirdUpgradeCost);
      setThirdUpgradeCount(thirdUpgradeCount + 1);

      setThirdUpgradeCost(currentthirdCost => currentthirdCost * 5);
      if ((thirdUpgradeCount + 1) % 5 === 0){
        setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5)
      }
      if ((secUpgradeCount + 1) % 10 === 0){
        setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5) && setSecUpgradeCost(currentsecCost => currentsecCost * 1.5);
      }
      if ((secUpgradeCount + 1) % 100 === 0){
        setThirdIncome(currentthirdIncome => currentthirdIncome * 1.5);
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
  <div style={{zIndex: 100, maxHeight: '500px', overflowY: 'auto'}}className="bg-gray-700 p-5 rounded-lg shadow-lg mt-5 absolute right-0 top-14 mr-4">
  <h2 className="text-xl mb-4">Магазин локаций</h2>
  <p className="text-xl mb-4">Green Crystals: <span className="font-bold">{greenCrystals}</span></p>
  <button onClick={convertBalanceToGreenCrystals} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110 mb-4">
    Конвертировать баланс в Green Crystals
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

<div className="mt-8 mb-4">
      <h2 className="text-xl font-bold">Upgrades</h2>
    </div>

    {totalUpgrade.map(totalUpgradeItem => (
  <TotalUpgrade
  key={totalUpgradeItem.id}
  id={totalUpgradeItem.id}
  totname={totalUpgradeItem.totname}
  totcost={totalUpgradeItem.totcost}
  totPurchcased={!!purchasedUpgrade[totalUpgradeItem.id]}
  totOnPurshcase={purchaseUpgrade}
/>
  
  ))}

    </div>
)}
      <button onClick={resetGame} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110">Start Over</button>
      <h1 className="text-4xl font-bold mb-6">Business Game</h1>
      <p className="text-xl mb-2">Balance: <span className="font-bold">${balance.toFixed(2)}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
        <BusinessWindow
          name="First Bussiness"
          income={income}
          onUpgrade={purshcaseUpgrade}
          upgradeCost={upgradeCost}
          level={upgradeCount}
          unlocked={true}
        />
        <BusinessWindow
          name="Second Bussiness"
          income={secondIncome}
          onUpgrade={secPurshcaseUpgrade}
          upgradeCost={secUpgradeCost}
          level={secUpgradeCount}
          unlocked={secondWindowUnlocked}
          onUnlock={unlockSecondWindow}
          unlockCost={secondUnlockCost}
        />
          <BusinessWindow
          name="Third Bussiness"
          income={thirdIncome}
          onUpgrade={thirdPurshcaseUpgrade}
          upgradeCost={thirdUpgradeCost}
          level={thirdUpgradeCount}
          unlocked={thirdWindowUnlocked}
          onUnlock={unlockThirdWindow}
          unlockCost={thirdUnlockCost}
        />
        
      </div>
    </div>
    
    </>
  );
};
export default BuisnessGame;