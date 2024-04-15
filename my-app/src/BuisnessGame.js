import {useState, useEffect, useRef} from 'react'
import Location from './Component/Location';
import backgroundMusic from './Audio/please-calm-my-mind-125566.mp3'
import backgroundImage from './Photo/Fone.webp'
import greenCrystal from './Photo/greenCrystal.png'

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
  sciencePoints // Предполагаем, что sciencePoints передаются как prop
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
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-gray-700 p-5 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <p className="text-xl mb-4">Income: <span className="font-bold">${convertNumberToShortForm(income.toFixed(2) * multiplier.toFixed(2))}</span> per second</p>
      <p className="text-xl mb-4">Your Level: <span className="font-bold">{level}</span></p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        onClick={onUpgrade}
        disabled={isFifthUpgrade && sciencePoints < 1} // Отключить кнопку, если это пятое улучшение и не хватает очков науки
      >
        {isFifthUpgrade ? `Upgrade for ${convertNumberToShortForm(upgradeCost.toFixed(2))} and 1 🧪 ` : `Upgrade for ${convertNumberToShortForm(upgradeCost.toFixed(2))}`}
      </button>
    </div>
  );
};


const BuisnessGame = () => {
  const resetGame = () => {
    setIsResearching(false);
    setPurchasedLocations(false);
    setPurchasedUpgrade(false);
    setGreenCrystals(1000);
    setSciencePoints(0)
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

    setFirstBusinessMultiplier(1);
    setSecondBusinessMultiplier(1);
    setThirdBusinessMultiplier(1);


    // Очистка localStorage
    localStorage.clear();
  };




  // Функция для начала исследования
  const startResearch = () => {
    if (!isResearching) {
      setIsResearching(true);
      const startTime = Date.now();
      const endTime = startTime + researchTimeLeft * 1000;
      localStorage.setItem('researchEndTime', endTime);
      beginResearchTimer(endTime); // Вызов функции, которая начнет таймер
    }
  };
  
  // Функция для установки таймера исследования
  const beginResearchTimer = (endTime) => {
    let timer = (endTime - Date.now()) / 1000;
    const intervalId = setInterval(() => {
      timer -= 1;
      setResearchTimeLeft(timer);
      if (timer <= 0) {
        clearInterval(intervalId);
        finishResearch();
      }
    }, 1000);
  };
  
  // Функция, которая вызывается, когда исследование завершено
  const finishResearch = () => {
    setIsResearching(false);
    setSciencePoints((prevPoints) => prevPoints + 1); // Начисляем очки науки
    setResearchTimeLeft(60); // Сброс таймера
    localStorage.removeItem('researchEndTime'); // Удаляем из localStorage
  };
  
  useEffect(() => {
    // Восстановление таймера исследования из localStorage при монтировании компонента
    const savedEndTime = localStorage.getItem('researchEndTime');
    const currentTime = Date.now();
  
    if (savedEndTime && currentTime < savedEndTime) {
      setIsResearching(true);
      beginResearchTimer(Number(savedEndTime));
    }
    // Очистка интервала при размонтировании компонента
    return () => {
      const intervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
      for (let i = 0; i < intervalId; i++) {
        clearInterval(i);
      }
    };
  }, []);

  // Отображение лаборатории
  const toggleLab = () => {
    if (isStoreOpen) setIsStoreOpen(false);
    setIsLabOpen(!isLabOpen);
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


  function convertNumberToShortForm(number) {
    let suffixes = 'ambtdefghijklnopqrsuvwxyz'.split('');
    let suffixIndex = -1;
    let processedNumber = number;

  if (processedNumber >= 999999)  {
    while (processedNumber >= 1000) {
      processedNumber /= 1000;
      suffixIndex++;
    }
  } else {
    return(number);
  }
  
    let suffix = suffixIndex === -1 ? '' : suffixes[suffixIndex % suffixes.length];
    // Для суффиксов больше 'z', добавляем дополнительную букву
    let additionalSuffix = Math.floor(suffixIndex / suffixes.length);
    if (additionalSuffix > 0) {
      suffix = String.fromCharCode(96 + additionalSuffix) + suffix;
    }
  
    return processedNumber.toFixed(2) + suffix;
  }
 
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
        <div key={id} className="bg-gray-600 p-4 rounded-lg shadow-inner mt-2">
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
    if (isLabOpen) setIsLabOpen(false);
    setIsStoreOpen(!isStoreOpen);
  };

  const [firstBusinessMultiplier, setFirstBusinessMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('firstBusinessMultiplier');
    return savedMultiplier ? Number(savedMultiplier) : 1;
  });
  const [secondBusinessMultiplier, setSecondBusinessMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('secondBusinessMultiplier');
    return savedMultiplier ? Number(savedMultiplier) : 1;
  });
  const [thirdBusinessMultiplier, setThirdBusinessMultiplier] = useState(() => {
    const savedMultiplier = localStorage.getItem('thirdBusinessMultiplier');
    return savedMultiplier ? Number(savedMultiplier) : 1;
  });
  const locations = [
    { id: 1, name: 'Desert', cost: 1000 }
    // Добавьте здесь больше локаций по мере необходимости
  ];

  const totalUpgrade = [
    { 
      id: 2, totname: 'First Buisness Upgrade #1', totcost: 100
    },
    {
      id: 3, totname: 'Second Buisness Upgrade #1', totcost: 10000
    },
    {
      id: 4, totname: 'Third Buisness Upgrade #1', totcost: 100000
    },
    { 
      id: 5, totname: 'First Buisness Upgrade #2', totcost: 10000
    },
    {
      id: 6, totname: 'Second Buisness Upgrade #2', totcost: 50000
    },
    {
      id: 7, totname: 'Third Buisness Upgrade #2', totcost: 500000
    },
    
  ]

  const convertBalanceToGreenCrystals = () => {
    const conversionRate = 10000; // Курс обмена
    const newGreenCrystals = balance / conversionRate;
    setGreenCrystals(currentGreenCrystals => currentGreenCrystals + newGreenCrystals);
    setBalance(0); // Обнуляем balance после конвертации
    // Предполагается, что balance полностью конвертируется в greenCrystals
  };

  const purchaseUpgrade = (id, cost) => {
    if (balance >= cost) {
      // Обновляем баланс
      setBalance(currentBalance => {
        const newBalance = currentBalance - cost;
        localStorage.setItem('balance', newBalance.toString());
        return newBalance;
      });
    
      // Обновляем апгрейды
      setPurchasedUpgrade(prev => {
        const updatedUpgrades = { ...prev, [id]: true };
        localStorage.setItem('purchasedUpgrade', JSON.stringify(updatedUpgrades));
        return updatedUpgrades;
      });
      
      // Определите, какой бизнес нужно улучшить на основе id улучшения
      if (id === 2) { // Предполагаем, что id 2 относится к первому бизнесу
        setFirstBusinessMultiplier(prevMultiplier => {
          const newMultiplier = prevMultiplier * 2;
          // Здесь вы также можете сохранить этот новый множитель в localStorage, если это необходимо
          return newMultiplier;
        });
      } else if (id === 3) {
        setSecondBusinessMultiplier(prev => prev * 2);
      } else if (id === 4) {
        setThirdBusinessMultiplier(prev => prev * 2);
      } else if (id === 5) {
        setFirstBusinessMultiplier(prev => prev * 2);
      } else if (id === 6) {
        setSecondBusinessMultiplier(prev => prev * 2);
      } else if (id ===7) {
        setThirdBusinessMultiplier(prev => prev * 2);
      }
    } else {
      alert('Not enough balance to unlock!');
    }
  };

  const purchaseLocation = (id, cost) => {
    if (greenCrystals >= cost) {
      setGreenCrystals(currentGreenCrystals => currentGreenCrystals - cost);
      setPurchasedLocations(prevLocations => {
        const updatedLocations = { ...prevLocations, [id]: true };
        localStorage.setItem('purchasedLocations', JSON.stringify(updatedLocations));
        return updatedLocations;
      });
    } else {
      alert('Not enough green crystals to purchase!');
    }
  };
  //valuta green crystals
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isResearching, setIsResearching] = useState(false);


  const [researchTimeLeft, setResearchTimeLeft] = useState(60); // Время в секундах
  const [sciencePoints, setSciencePoints] = useState(() => Number(localStorage.getItem('sciencePoints')) || 0);
  //const [isPlaying, setIsPlaying] = useState(false);

  const [purchasedUpgrade, setPurchasedUpgrade] = useState(() => {
    const saved = localStorage.getItem('purchasedUpgrade');
    return saved ? JSON.parse(saved) : {};
  });
  const [greenCrystals, setGreenCrystals] = useState(() => Number(localStorage.getItem('greenCrystals')) || 0);
  const [purchasedLocations, setPurchasedLocations] = useState(() => {
    const savedLocations = localStorage.getItem('purchasedLocations');
    return savedLocations ? JSON.parse(savedLocations) : {};
  });
  //first bussiness
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 0);
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem('income');
    return savedIncome ? Number(savedIncome) : 1;
  });
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
      localStorage.setItem('sciencePoints', sciencePoints.toString());

      localStorage.setItem('firstBusinessMultiplier', firstBusinessMultiplier.toString());
      localStorage.setItem('secondBusinessMultiplier', secondBusinessMultiplier.toString());
      localStorage.setItem('thirdBusinessMultiplier', thirdBusinessMultiplier.toString());
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
  }, [balance, income, upgradeCost, upgradeCount, secondWindowUnlocked, secondIncome, sciencePoints, secUpgradeCost, secUpgradeCount, thirdWindowUnlocked, thirdIncome, thirdUpgradeCost, thirdUpgradeCount, greenCrystals, purchasedLocations, purchasedUpgrade, secondBusinessMultiplier, firstBusinessMultiplier, thirdBusinessMultiplier]);

    useEffect(() => {
  const interval = setInterval(() => {
    setBalance((currentBalance) => 
      currentBalance +
      income * firstBusinessMultiplier +
      secondIncome * secondBusinessMultiplier +
      thirdIncome * thirdBusinessMultiplier
    );
  }, 1000);
  
  return() => clearInterval(interval);
}, [income, firstBusinessMultiplier, secondIncome, secondBusinessMultiplier, thirdIncome, thirdBusinessMultiplier]);

    const purshcaseUpgrade = () => {
      const isFifthUpgrade = (upgradeCount + 1) % 5 === 0; // Проверяем, является ли это пятым улучшением

  if (balance >= upgradeCost && (!isFifthUpgrade || (isFifthUpgrade && sciencePoints > 0))) {
    setIncome(currentIncome => currentIncome * 1.5); // Увеличиваем доход
    setBalance(currentBalance => currentBalance - upgradeCost); // Уменьшаем баланс на стоимость улучшения
    setUpgradeCount(upgradeCount => upgradeCount + 1); // Увеличиваем счётчик улучшений

    setUpgradeCost(currentCost => currentCost * 2); // Увеличиваем стоимость следующего улучшения

    if (isFifthUpgrade) {
      // Если это пятое улучшение, уменьшаем количество очков науки
      setSciencePoints(currentPoints => currentPoints - 1);
      setIncome(currentIncome => currentIncome * 1.2); // Дополнительное увеличение дохода
    }

    if ((upgradeCount + 1) % 10 === 0) {
      // Каждое десятое улучшение увеличиваем доход еще больше
      setIncome(currentIncome => currentIncome * 1.3);
    }
  } else {
    // Если средств недостаточно или не хватает очков науки для пятого улучшения
    let errorMessage = "Balance not enough!";
    if (isFifthUpgrade && sciencePoints === 0) {
      errorMessage = "Not enough science points  for this upgrade!";
    }
    alert(errorMessage);
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
        setSecondIncome(currentsecondIncome => currentsecondIncome * 1.7 + 10);
        setBalance(prevBalance => prevBalance - secUpgradeCost);
        setSecUpgradeCount(secUpgradeCount + 1);

        setSecUpgradeCost(currentsecCost => currentsecCost * 2.5);
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
      setThirdIncome(currentthirdIncome => currentthirdIncome * 2 + 100);
      setBalance(prevBalance => prevBalance - thirdUpgradeCost);
      setThirdUpgradeCount(thirdUpgradeCount + 1);

      setThirdUpgradeCost(currentthirdCost => currentthirdCost * 3);
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
<button onClick={toggleLab} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Лаборатория</button>
<button onClick={toggleSound} className={`ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-2xl border-2 border-green-500 transition duration-300 ease-in-out`}>
          {isPlaying ? '🔊' : '🔇'}
        </button>
        </div>
        {isLabOpen && (
          <div className="absolute right-0 mt-5 top-14 mr-4 bg-gray-700 p-5 rounded-lg shadow-lg" style={{ zIndex: 100, maxHeight: '500px', overflowY: 'auto', width: '400px', backgroundImage: `url(${backgroundImage})` }}>
            <h2 className="text-xl mb-2">Лаборатория</h2>
            <p className='mb-2'>{sciencePoints}🧪</p>
            <button
  onClick={startResearch}
  disabled={isResearching}
  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
>
  {isResearching ? `Идет исследование ${researchTimeLeft.toFixed(0)} сек` : 'Начать исследование'}
</button>
          </div>
        )}
{isStoreOpen && (
  <div style={{zIndex: 100, maxHeight: '500px', overflowY: 'auto', width: '400px', backgroundImage: `url(${backgroundImage})`}}className="bg-gray-700 p-5 rounded-lg shadow-lg mt-5 absolute right-0 top-14 mr-4">
  <h2 className="text-xl mb-4">Магазин локаций</h2>
  <div className="flex items-center mb-4">
  <img src={greenCrystal} alt="Green Crystal" className="inline-block h-6 w-6" /> <span className="font-bold">{greenCrystals.toFixed(4)}</span>
  </div>
  <button onClick={convertBalanceToGreenCrystals} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110 mb-4">
    Конвертировать баланс в <img src={greenCrystal} alt="Green Crystal" className="inline-block h-6 w-6" />
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
      <p className="text-xl mb-2">Balance: <span className="font-bold">${convertNumberToShortForm(balance.toFixed(2))}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
        <BusinessWindow
          name="First Bussiness"
          income={income}
          onUpgrade={purshcaseUpgrade}
          upgradeCost={upgradeCost}
          level={upgradeCount}
          unlocked={true}
          multiplier={firstBusinessMultiplier}
          convertNumberToShortForm={convertNumberToShortForm}
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
          multiplier={secondBusinessMultiplier}
          convertNumberToShortForm={convertNumberToShortForm}
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
          multiplier={thirdBusinessMultiplier}
          convertNumberToShortForm={convertNumberToShortForm}
        />
        
      </div>
    </div>
    
    </>
  );
};
export default BuisnessGame;
