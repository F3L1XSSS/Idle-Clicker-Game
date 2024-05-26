import { useState, useEffect, useRef } from 'react';

import ModalStore from '../components/ModalStore';
import RandomEventButton from '../components/RandomEventButton';
import CanvasContainer from '../components/CanvasContainer';
import BusinessWindow from '../components/BusinessWindow';
import backgroundMusic from '../audio/please-calm-my-mind-125566.mp3';
import backgroundImage from '../images/fone.webp';
import menuIcon from '../images/menuIcon.png';
import ModalLaboratory from '../components/ModalLaboratory';
import ModalRandomEvent from '../components/ModalRandomEvent';
import TaxLoanMenu from '../components/TaxLoanMenu';
import AchievementsModal from '../components/AchievementsModal';
import PropertyModal from '../components/ModalProperty';
import OwnedPropertiesModal from '../components/OwnedPropertyModal';

const BusinessGamePage = () => {
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 0);
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem('income');
    return savedIncome ? Number(savedIncome) : 1;
  });

  const [secondIncome, setSecondIncome] = useState(() => {
    const savedSecondIncome = localStorage.getItem('secondIncome');
    return savedSecondIncome ? Number(savedSecondIncome) : 0;
  });

  const [thirdIncome, setThirdIncome] = useState(() => {
    const savedThirdIncome = localStorage.getItem('thirdIncome');
    return savedThirdIncome ? Number(savedThirdIncome) : 0;
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isModalRandomEventOpen, setIsModalRandomEventOpen] = useState(false);

  const toggleModalRandomEvent = () => {
    setIsModalRandomEventOpen(!isModalRandomEventOpen);
  };

  // Инициализация таймера из localStorage или установка по умолчанию в 600 секунд
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? Number(savedTimer) : 600;
  });

  const resetGame = () => {
    if (researchIntervalId !== null) {
      clearInterval(researchIntervalId);
      setResearchIntervalId(null);
    }
    setResearchCost(0);
    setPayment(0);
    setDebt(0);
    setTaxes(0);
    setIsResearching(false);
    setPurchasedLocations(false);
    setPurchasedUpgrade(false);
    setGreenCrystals(0);
    setSciencePoints(0);
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

    setAchievements(0);
    setProperty(0);

    setTimer(0);

    // Очистка localStorage
    localStorage.clear();
  };

  const [achievements, setAchievements] = useState(() => {
    // Читаем данные из localStorage при инициализации состояния
    const savedAchievements = localStorage.getItem('achievements');
    let parsedAchievements;
  
    try {
      parsedAchievements = JSON.parse(savedAchievements);
    } catch (error) {
      parsedAchievements = [];
    }
  
    // Проверяем, что parsedAchievements является массивом
    return Array.isArray(parsedAchievements) ? parsedAchievements : [];
  });
  
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  
  const toggleAchievementsModal = () => {
    if (isStoreOpen) setIsStoreOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isLabOpen) setIsLabOpen(false);
    if (isOwnedPropertiesModalOpen) setIsOwnedPropertiesModalOpen(false);
    if (isPropertyModalOpen) setIsPropertyModalOpen(false);
    setIsAchievementsModalOpen(!isAchievementsModalOpen);
  };
  
  // Добавляем первое достижение, когда баланс достигает 1 миллиона
  useEffect(() => {
    if (balance >= 1000000) {
      setAchievements(prevAchievements => {
        // Проверяем, является ли prevAchievements массивом
        if (Array.isArray(prevAchievements) && !prevAchievements.includes('Первый миллион')) {
          const newAchievements = [...prevAchievements, 'Первый миллион'];
          localStorage.setItem('achievements', JSON.stringify(newAchievements));
          return newAchievements;
        }
        return prevAchievements;
      });
    }
  }, [balance]);

  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isOwnedPropertiesModalOpen, setIsOwnedPropertiesModalOpen] = useState(false);

  const togglePropertyModal = () => {
    if (isStoreOpen) setIsStoreOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isLabOpen) setIsLabOpen(false);
    if (isAchievementsModalOpen) setIsAchievementsModalOpen(false);
    if (isOwnedPropertiesModalOpen) setIsOwnedPropertiesModalOpen(false);
    setIsPropertyModalOpen(!isPropertyModalOpen);
  };

  const toggleOwnedPropertyModal = () => {
    if (isStoreOpen) setIsStoreOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isLabOpen) setIsLabOpen(false);
    if (isAchievementsModalOpen) setIsAchievementsModalOpen(false);
    if (isPropertyModalOpen) setIsPropertyModalOpen(false);
    setIsOwnedPropertiesModalOpen(!isOwnedPropertiesModalOpen);
  };

  const handleBuy = (item) => {
    console.log('Property before purchase:', property);
    console.log('Attempting to buy:', item);
  
    if (Array.isArray(property) && balance >= item.price && !property.some((p) => p.name === item.name)) {
      const newProperty = [...property, item];
      setProperty(newProperty);
      setBalance(balance - item.price);
      console.log('Property after purchase:', newProperty);
    } else {
      console.log('Insufficient balance or property already owned');
      alert('Not enough balance to buy this property or property already owned!');
    }
  };

  const properties = [
    { name: 'Big Mac', price: 2 },
    { name: 'Flip Flops', price: 3 },
    { name: 'Coca-Cola Pack', price: 5 },
    { name: 'Movie Ticket', price: 12 },
    { name: 'Book', price: 15 },
    { name: 'Lobster Dinner', price: 45 }
  ];

  const [researchIntervalId, setResearchIntervalId] = useState(null);
  // Функция для начала исследования
  const [researchCost, setResearchCost] = useState(() => {
    const initialCost = Number(localStorage.getItem('researchCost'));
    return initialCost >= 0 ? initialCost : 0; // Если стоимость уже есть в localStorage, используем ее, иначе начинаем с 0
  });

  const startResearch = () => {
    // Если уже идет исследование или нет средств, ничего не делаем
    if (isResearching || balance < researchCost) {
      if (balance < researchCost) {
        alert('Недостаточно средств для исследования');
      }
      return;
    }

    setIsResearching(true);
    setBalance(currentBalance => currentBalance - researchCost);
    const endTime = Date.now() + researchTimeLeft * 1000;
    localStorage.setItem('researchEndTime', endTime);
    beginResearchTimer(endTime);
  };

  const beginResearchTimer = endTime => {
    // Устанавливаем новый таймер и сразу же сохраняем его ID
    const intervalId = setInterval(() => {
      const timer = (endTime - Date.now()) / 1000;
      setResearchTimeLeft(timer);

      if (timer <= 0) {
        clearInterval(intervalId);
        finishResearch();
      }
    }, 1000);
    setResearchIntervalId(intervalId);
  };

  const finishResearch = () => {
    setSciencePoints(prevPoints => prevPoints + 1);
    setResearchTimeLeft(60);
    localStorage.removeItem('researchEndTime');

    const nextCost = researchCost === 0 ? 100 : Math.floor(researchCost * 1.5);
    setResearchCost(nextCost);
    localStorage.setItem('researchCost', nextCost.toString());

    setIsResearching(false);
    // Не забудьте сбросить ID интервала
    setResearchIntervalId(null);
  };

  useEffect(() => {
    return () => {
      if (researchIntervalId !== null) {
        clearInterval(researchIntervalId);
      }
    };
  }, [researchIntervalId]);

  useEffect(() => {
    const savedEndTime = localStorage.getItem('researchEndTime');
    const currentTime = Date.now();

    if (savedEndTime && currentTime < savedEndTime) {
      setIsResearching(true);
      beginResearchTimer(Number(savedEndTime));
    } else {
      setResearchTimeLeft(60);
      setIsResearching(false);
      localStorage.removeItem('researchEndTime');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Отображение лаборатории
  const toggleLab = () => {
    if (isStoreOpen) setIsStoreOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    setIsLabOpen(!isLabOpen);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(backgroundMusic));

  useEffect(() => {
    const audio = audioRef.current;
    // Управление воспроизведением музыки должно происходить только при изменении isPlaying
    if (isPlaying) {
      // Проигрываем музыку, если isPlaying === true
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log(`Не удалось воспроизвести звук: ${e}`);
        });
      }
    } else {
      // Останавливаем музыку, если isPlaying === false
      audio.pause();
    }

    // Устанавливаем loop здесь, чтобы гарантировать, что оно применяется после play
    audio.loop = true;

    // Очистка только происходит при размонтировании компонента
    return () => {
      audio.pause();
    };
  }, [isPlaying]); // Убедитесь, что у вас есть isPlaying в массиве зависимостей

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  function convertNumberToShortForm(number) {
    let suffixes = 'ambtdefghijklnopqrsuvwxyz'.split('');
    let suffixIndex = -1;
    let processedNumber = number;

    if (processedNumber >= 999999) {
      while (processedNumber >= 1000) {
        processedNumber /= 1000;
        suffixIndex++;
      }
    } else {
      return number;
    }

    let suffix = suffixIndex === -1 ? '' : suffixes[suffixIndex % suffixes.length];
    // Для суффиксов больше 'z', добавляем дополнительную букву
    let additionalSuffix = Math.floor(suffixIndex / suffixes.length);
    if (additionalSuffix > 0) {
      suffix = String.fromCharCode(96 + additionalSuffix) + suffix;
    }

    return processedNumber.toFixed(2) + suffix;
  }

  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const toggleStore = () => {
    if (isLabOpen) setIsLabOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taxes, setTaxes] = useState(() => Number(localStorage.getItem('taxes')) || 0);

  // Функция для открытия/закрытия меню
  // const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = event => {
    if (isStoreOpen) setIsStoreOpen(false);
    if (isLabOpen) setIsLabOpen(false);
    // const rect = event.currentTarget.getBoundingClientRect();
    // setMenuPosition({
    //   top: rect.bottom + window.scrollY,
    //   left: rect.left + window.scrollX,
    // });
    setIsMenuOpen(!isMenuOpen);
  };

  const [creditAmount, setCreditAmount] = useState(
    () => Number(localStorage.getItem('creditAmount')) || 0
  );
  const [debt, setDebt] = useState(() => Number(localStorage.getItem('debt')) || 0);
  const [payment, setPayment] = useState(() => Number(localStorage.getItem('payment')) || 0);

  useEffect(() => {
    let interval;
    if (debt > 0 && payment > 0) {
      interval = setInterval(() => {
        setDebt(prevDebt => {
          const penalty = payment * 0.5; // 50% пеня от ежесекундного платежа
          const totalPayment = payment + penalty;

          setBalance(prevBalance => {
            if (prevBalance >= totalPayment) {
              // Если средств достаточно для оплаты кредита и пени
              const newBalance = prevBalance - totalPayment;
              localStorage.setItem('balance', newBalance.toString());
              return newBalance;
            } else {
              // Если средств недостаточно
              alert('Недостаточно средств для оплаты кредита и пени');
              clearInterval(interval);
              return prevBalance; // Возвращаем предыдущий баланс
            }
          });

          const newDebt = prevDebt - payment;
          if (newDebt <= 0) {
            clearInterval(interval);
            setCreditAmount(0);
            setPayment(0);
          }

          localStorage.setItem('debt', Math.max(newDebt, 0).toString());
          return Math.max(newDebt, 0);
        });
      }, 1000);
    }

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, [debt, payment]);

  const takeCredit = income => {
    if (debt > 0) {
      alert('Вы ещё не выплатили предыдущий кредит!');
      return;
    }

    const amount = prompt('Введите сумму кредита (максимум 1,000,000):');

    // Если пользователь нажал "Отмена" в prompt
    if (amount === null) {
      alert('Ввод отменен.');
      return;
    }

    const credit = parseFloat(amount);
    const maxCredit = Math.min(1000000, income * 200); // Максимум либо 1,000,000, либо в 200 раз больше дохода

    // Проверяем, что введено число и оно не превышает максимально допустимый кредит
    if (!isNaN(credit) && credit > 0 && credit <= maxCredit) {
      const initialPayment = credit * 0.01; // Фиксированный начальный ежесекундный платеж

      setCreditAmount(credit);
      setDebt(credit);
      setPayment(initialPayment); // Сохраняем начальный ежесекундный платеж
      setBalance(currentBalance => currentBalance + credit); // Начисляем кредит на баланс

      localStorage.setItem('creditAmount', credit.toString());
      localStorage.setItem('debt', credit.toString());
      localStorage.setItem('payment', initialPayment.toString());
    } else if (credit > maxCredit) {
      alert(`Сумма кредита не может превышать ${maxCredit}.`);
    } else {
      alert('Пожалуйста, введите валидную сумму.');
    }
  };

  // Эффект для начисления налогов
  useEffect(() => {
    const handleTaxCalculation = () => {
      setTaxes(currentTaxes => currentTaxes + (income + secondIncome + thirdIncome) * 0.2);
    };

    // Запустите начисление налогов сразу при монтировании компонента
    handleTaxCalculation();

    // Установите интервал на каждую минуту, а не каждую секунду
    const taxInterval = setInterval(handleTaxCalculation, 1000); // 60000 миллисекунд = 1 минута

    // Очистите интервал при размонтировании компонента
    return () => clearInterval(taxInterval);
  }, [income, secondIncome, thirdIncome]); // Перезапускаем интервал, если баланс изменился

  // Функция для оплаты налогов
  const payTaxes = () => {
    setBalance(currentBalance => {
      if (currentBalance >= taxes) {
        setTaxes(0); // Сбросить налоги после оплаты
        return currentBalance - taxes;
      } else {
        alert('Недостаточно средств для оплаты налогов!');
        return currentBalance; // Возвращаем текущий баланс, если средств недостаточно
      }
    });
  };

  const convertBalanceToGreenCrystals = () => {
    const conversionRate = 10000; // Курс обмена
    const newGreenCrystals = balance / conversionRate;
    if (debt > 0) {
      alert('You cant make convertation until your debt is exist!');
    }
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
      if (id === 2) {
        // Предполагаем, что id 2 относится к первому бизнесу
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
      } else if (id === 7) {
        setThirdBusinessMultiplier(prev => prev * 2);
      }
    } else {
      alert('Not enough balance to unlock!');
    }
  };

  const purchaseLocation = (id, cost) => {
    // Assuming taxes is a state variable that is updated elsewhere in the application.
    if (greenCrystals >= cost) {
      if (taxes >= 1000000) {
        alert('Your taxes are too high, please pay before purchasing a location!');
        return; // Exit the function early if taxes are too high
      }
      if (debt > 0) {
        alert('Please pay your credit before purchasing a loaction!');
        return;
      }
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
  const [sciencePoints, setSciencePoints] = useState(
    () => Number(localStorage.getItem('sciencePoints')) || 0
  );
  //const [isPlaying, setIsPlaying] = useState(false);

  const [purchasedUpgrade, setPurchasedUpgrade] = useState(() => {
    const saved = localStorage.getItem('purchasedUpgrade');
    return saved ? JSON.parse(saved) : {};
  });
  const [greenCrystals, setGreenCrystals] = useState(
    () => Number(localStorage.getItem('greenCrystals')) || 0
  );
  const [purchasedLocations, setPurchasedLocations] = useState(() => {
    const savedLocations = localStorage.getItem('purchasedLocations');
    return savedLocations ? JSON.parse(savedLocations) : {};
  });
  //first bussiness

  const [upgradeCost, setUpgradeCost] = useState(
    () => Number(localStorage.getItem('upgradeCost')) || 10
  );
  const [upgradeCount, setUpgradeCount] = useState(
    () => Number(localStorage.getItem('upgradeCount')) || 0
  );

  //second bussiness
  const [secondWindowUnlocked, setSecondWindowUnlocked] = useState(
    () => Number(localStorage.getItem('secondWindowUnlocked')) || 0
  );
  const [secUpgradeCost, setSecUpgradeCost] = useState(
    () => Number(localStorage.getItem('secUpgradeCost')) || 100
  );
  const [secUpgradeCount, setSecUpgradeCount] = useState(
    () => Number(localStorage.getItem('secUpgradeCount')) || 0
  );

  //third bussiness
  const [thirdWindowUnlocked, setThirdWindowUnlocked] = useState(
    () => Number(localStorage.getItem('thirdWindowUnlocked')) || 0
  );
  const [thirdUpgradeCost, setThirdUpgradeCost] = useState(
    () => Number(localStorage.getItem('thirdUpgradeCost')) || 10000
  );
  const [thirdUpgradeCount, setThirdUpgradeCount] = useState(
    () => Number(localStorage.getItem('thirdUpgradeCount')) || 0
  );

  const [property, setProperty] = useState(() => {
    const savedProperty = JSON.parse(localStorage.getItem("property"));
    return Array.isArray(savedProperty) ? savedProperty : [];
  });

  const secondUnlockCost = 10000;
  const thirdUnlockCost = 500000;

  useEffect(() => {
    // Сохранение текущего состояния в localStorage
    const saveState = () => {
      localStorage.setItem('achievements', JSON.stringify(achievements));
      localStorage.setItem('property', JSON.stringify(property));

      localStorage.setItem('researchCost', researchCost.toString());
      localStorage.setItem('creditAmount', creditAmount.toString());
      localStorage.setItem('debt', debt.toString());
      localStorage.setItem('payment', payment.toString());

      localStorage.setItem('sciencePoints', sciencePoints.toString());

      localStorage.setItem('firstBusinessMultiplier', firstBusinessMultiplier.toString());
      localStorage.setItem('secondBusinessMultiplier', secondBusinessMultiplier.toString());
      localStorage.setItem('thirdBusinessMultiplier', thirdBusinessMultiplier.toString());
      localStorage.setItem('purchasedUpgrade', JSON.stringify(purchasedUpgrade));
      localStorage.setItem('taxes', JSON.stringify(taxes));

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
  }, [
    property,
    achievements,
    balance,
    income,
    researchCost,
    upgradeCost,
    creditAmount,
    debt,
    payment,
    upgradeCount,
    taxes,
    secondWindowUnlocked,
    secondIncome,
    sciencePoints,
    secUpgradeCost,
    secUpgradeCount,
    thirdWindowUnlocked,
    thirdIncome,
    thirdUpgradeCost,
    thirdUpgradeCount,
    greenCrystals,
    purchasedLocations,
    purchasedUpgrade,
    secondBusinessMultiplier,
    firstBusinessMultiplier,
    thirdBusinessMultiplier,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(
        currentBalance =>
          currentBalance +
          income * firstBusinessMultiplier +
          secondIncome * secondBusinessMultiplier +
          thirdIncome * thirdBusinessMultiplier
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [
    income,
    firstBusinessMultiplier,
    secondIncome,
    secondBusinessMultiplier,
    thirdIncome,
    thirdBusinessMultiplier,
  ]);

  const purshcaseUpgrade = () => {
    const isFifthUpgrade = (upgradeCount + 1) % 5 === 0;
    const isTenthUpgrade = (upgradeCount + 1) % 10 === 0;
  
    if (balance >= upgradeCost) {
      // Рассчитываем фактор увеличения дохода в зависимости от номера улучшения
      let baseIncrement = 1.05; // Базовое увеличение на 5%
      let additionalIncrement = (upgradeCount % 5) * 0.01; // Дополнительное увеличение на 1% за каждый уровень в текущем цикле пяти улучшений
      let incrementFactor = baseIncrement + additionalIncrement;
  
      // Увеличиваем доход
      setIncome(currentIncome => currentIncome * incrementFactor);
  
      // Уменьшаем баланс на стоимость улучшения
      setBalance(currentBalance => currentBalance - upgradeCost);
  
      // Увеличиваем счётчик улучшений
      setUpgradeCount(currentCount => currentCount + 1);
  
      // Увеличиваем стоимость следующего улучшения
      let costMultiplier = 1.1 + (isFifthUpgrade ? 0.05 : 0); // Основное увеличение на 10%, дополнительное на 5% каждое пятое улучшение
      setUpgradeCost(currentCost => currentCost * costMultiplier);
  
      if (isFifthUpgrade) {
        if (sciencePoints > 0) {
          // Дополнительное увеличение дохода на 25% на каждом пятом улучшении
          setIncome(currentIncome => currentIncome * 1.25);
          // Уменьшаем количество очков науки
          setSciencePoints(currentPoints => currentPoints - 1);
        } else {
          alert('Not enough science points for this upgrade!');
          // Отменяем последнее улучшение, если не хватает научных очков
          setIncome(currentIncome => currentIncome / incrementFactor);
          setBalance(currentBalance => currentBalance + upgradeCost);
          setUpgradeCount(currentCount => currentCount - 1);
          setUpgradeCost(currentCost => currentCost / costMultiplier);
          return;
        }
      }
  
      if (isTenthUpgrade) {
        // Удвоение дохода на каждом десятом улучшении
        setIncome(currentIncome => currentIncome * 2);
      }
    } else {
      alert('Not enough balance for this upgrade!');
    }
  };
  
  const unlockSecondWindow = () => {
    if (balance >= secondUnlockCost && !secondWindowUnlocked) {
      setBalance(prevBalance => prevBalance - secondUnlockCost);
      setSecondWindowUnlocked(true);
      localStorage.setItem('secondWindowUnlocked', '1');
    } else {
      alert('Not enough balance to unlock!');
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
    const isFifthUpgrade = (secUpgradeCount + 1) % 5 === 0;
    const isTenthUpgrade = (secUpgradeCount + 1) % 10 === 0;
    const isFirstUpgrade = (secUpgradeCount === 0);
  
    if (balance >= secUpgradeCost) {
      let baseSecIncrement = 1.07; // Базовое увеличение на 7%
      let additionalSecIncrement = (secUpgradeCount % 5) * 0.01; // Дополнительное увеличение на 1% за каждый уровень в текущем цикле пяти улучшений
      let incrementSecFactor = baseSecIncrement + additionalSecIncrement;
  
      setSecondIncome(currentSecondIncome => currentSecondIncome * incrementSecFactor);
      setBalance(prevBalance => prevBalance - secUpgradeCost);
      setSecUpgradeCount(secUpgradeCount + 1);
  
      let costSecMultiplier = 1.12 + (isFifthUpgrade ? 0.05 : 0); // Основное увеличение на 12%, дополнительное на 5% каждое пятое улучшение
      setSecUpgradeCost(currentSecCost => currentSecCost * costSecMultiplier);
  
      if (isFirstUpgrade) {
        setSecondIncome(10);
        return;
      }
  
      if (isFifthUpgrade) {
        if (sciencePoints > 0) {
          // Дополнительное увеличение дохода на 25% на каждом пятом улучшении
          setSecondIncome(currentSecondIncome => currentSecondIncome * 1.25);
          // Уменьшаем количество очков науки
          setSciencePoints(currentPoints => currentPoints - 1);
        } else {
          alert('Not enough science points for this upgrade!');
          // Отменяем последнее улучшение, если не хватает научных очков
          setSecondIncome(currentSecondIncome => currentSecondIncome / incrementSecFactor);
          setBalance(currentBalance => currentBalance + secUpgradeCost);
          setSecUpgradeCount(currentSecUpgradeCount => currentSecUpgradeCount - 1);
          setSecUpgradeCost(currentSecCost => currentSecCost / costSecMultiplier);
          return;
        }
      }
  
      if (isTenthUpgrade) {
        // Удвоение дохода на каждом десятом улучшении
        setSecondIncome(currentSecondIncome => currentSecondIncome * 2);
      }
    } else {
      alert('Not enough balance for this upgrade!');
    }
  };
  
  const thirdPurshcaseUpgrade = () => {
    const isFifthUpgrade = (thirdUpgradeCount + 1) % 5 === 0;
    const isTenthUpgrade = (thirdUpgradeCount + 1) % 10 === 0;
    const isFirstUpgrade = (thirdUpgradeCount === 0);
  
    if (balance >= thirdUpgradeCost) {
      let baseThirdIncrement = 1.1; // Базовое увеличение на 10%
      let additionalThirdIncrement = (thirdUpgradeCount % 5) * 0.01; // Дополнительное увеличение на 1% за каждый уровень в текущем цикле пяти улучшений
      let incrementThirdFactor = baseThirdIncrement + additionalThirdIncrement;
  
      setThirdIncome(currentThirdIncome => currentThirdIncome * incrementThirdFactor);
      setBalance(prevBalance => prevBalance - thirdUpgradeCost);
      setThirdUpgradeCount(thirdUpgradeCount + 1);
  
      let costThirdMultiplier = 1.15 + (isFifthUpgrade ? 0.05 : 0); // Основное увеличение на 15%, дополнительное на 5% каждое пятое улучшение
      setThirdUpgradeCost(currentThirdCost => currentThirdCost * costThirdMultiplier);
  
      if (isFirstUpgrade) {
        setThirdIncome(100);
        return;
      }
  
      if (isFifthUpgrade) {
        if (sciencePoints > 0) {
          // Дополнительное увеличение дохода на 25% на каждом пятом улучшении
          setThirdIncome(currentThirdIncome => currentThirdIncome * 1.25);
          // Уменьшаем количество очков науки
          setSciencePoints(currentPoints => currentPoints - 1);
        } else {
          alert('Not enough science points for this upgrade!');
          // Отменяем последнее улучшение, если не хватает научных очков
          setThirdIncome(currentThirdIncome => currentThirdIncome / incrementThirdFactor);
          setBalance(currentBalance => currentBalance + thirdUpgradeCost);
          setThirdUpgradeCount(currentThirdUpgradeCount => currentThirdUpgradeCount - 1);
          setThirdUpgradeCost(currentThirdCost => currentThirdCost / costThirdMultiplier);
          return;
        }
      }
  
      if (isTenthUpgrade) {
        // Удвоение дохода на каждом десятом улучшении
        setThirdIncome(currentThirdIncome => currentThirdIncome * 2);
      }
    } else {
      alert('Not enough balance for this upgrade!');
    }
  };
  

  const calculatedPenalty = payment * 0.5;

  const totalPayment = Number(payment.toFixed(0)) + calculatedPenalty;

  return (
    <>
      <CanvasContainer />
      <div className="content-container" style={{ position: 'relative' }}>
        <div
  style={{ backgroundImage: `url(${backgroundImage})` }}
  className="relative min-h-screen bg-cover bg-center bg-fixed text-white flex flex-col items-center justify-center"
  >
          <AchievementsModal
            isShowing={isAchievementsModalOpen}
            toggleModal={toggleAchievementsModal}
            achievements={achievements}
          />
          
          <PropertyModal
        isShowing={isPropertyModalOpen}
        toggleModal={togglePropertyModal}
        properties={properties}
        ownedProperties={property}
        handleBuy={handleBuy}
      />
      <OwnedPropertiesModal
        isShowing={isOwnedPropertiesModalOpen}
        toggleModal={toggleOwnedPropertyModal}
        ownedProperties={property}
      />

          <div className="absolute top-0 left-0 m-4 z-50">
            <button className="p-2" onClick={toggleMenu}>
              <img
                src={menuIcon}
                alt="Menu"
                className="h-9 w-9"
              />
            </button>
          </div>

          <div className="absolute top-0 right-0 m-4 flex items-center space-x-2 z-50">
            <RandomEventButton
              timer={timer}
              setTimer={setTimer}
              setBalance={setBalance}
              setIncome={setIncome}
              income={income}
              setUpgradeCost={setUpgradeCost}
              firstBusinessMultiplier={firstBusinessMultiplier}
              setIsModalRandomEventOpen={setIsModalRandomEventOpen}
              setModalMessage={setModalMessage}
              upgradeCount={upgradeCount}
              setUpgradeCount={setUpgradeCount}
              secUpgradeCount={secUpgradeCount}
              setSecUpgradeCount={setSecUpgradeCount}
              thirdUpgradeCount={thirdUpgradeCount}
              setThirdUpgradeCount={setThirdUpgradeCount}
            />

<button
            onClick={togglePropertyModal}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
          >
            Купить имущество
          </button>

          <button
            onClick={toggleOwnedPropertyModal}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
          >
            Просмотр имущества
          </button>

            <button
              onClick={toggleAchievementsModal}
              className="top-0 bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded transition-all ease-in-out duration-300"
            >
              Достижения
            </button>

            <button
              onClick={toggleStore}
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded transition-all ease-in-out duration-300"
            >
              Магазин
            </button>
            <button
              onClick={toggleLab}
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-all ease-in-out duration-300"
            >
              Лаборатория
            </button>
            <button
              onClick={toggleSound}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white font-bold text-2xl border-2 border-green-700"
            >
              {isPlaying ? '🔊' : '🔇'}
            </button>
          </div>

          <ModalRandomEvent
            isShowing={isModalRandomEventOpen}
            message={modalMessage}
            toggleModal={toggleModalRandomEvent}
          />

          {isLabOpen && (
            <ModalLaboratory
              isShowing={isLabOpen}
              toggleLab={toggleLab}
              sciencePoints={sciencePoints}
              startResearch={startResearch}
              isResearching={isResearching}
              researchTimeLeft={researchTimeLeft}
              researchCost={researchCost}
            />
          )}

          <TaxLoanMenu
            taxes={taxes}
            payTaxes={payTaxes}
            takeCredit={takeCredit}
            income={income}
            debt={debt}
            totalPayment={totalPayment}
            toggleMenu={toggleMenu}
            isMenuOpen={isMenuOpen}
          />

          {isStoreOpen && (
            <ModalStore
              greenCrystals={greenCrystals}
              convertBalanceToGreenCrystals={convertBalanceToGreenCrystals}
              purchasedLocations={purchasedLocations}
              purchaseLocation={purchaseLocation}
              purchasedUpgrade={purchasedUpgrade}
              purchaseUpgrade={purchaseUpgrade}
              toggleStore={toggleStore}
              isShowing={isStoreOpen}
            />
          )}

          <button
            onClick={resetGame}
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
            style={{ zIndex: 10 }}
          >
            Начать заново
          </button>
          <h1 className="text-4xl font-bold mb-6" style={{ zIndex: 10 }}>
            Биржевая Игра
          </h1>
          <p className="text-xl mb-2" style={{ zIndex: 10 }}>
            Баланс:{' '}
            <span className="font-bold">${convertNumberToShortForm(balance.toFixed(2))}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4" style={{ zIndex: 10 }}>
            <BusinessWindow
              name="Первый Бизнес"
              income={income}
              onUpgrade={purshcaseUpgrade}
              upgradeCost={upgradeCost}
              level={upgradeCount}
              unlocked={true}
              multiplier={firstBusinessMultiplier}
              convertNumberToShortForm={convertNumberToShortForm}
            />
            <BusinessWindow
              name="Второй Бизнес"
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
              name="Третий Бизнес"
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
      </div>
    </>
  );
};
export default BusinessGamePage;
