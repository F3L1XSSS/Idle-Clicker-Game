import { useState, useEffect } from 'react';

const RandomEventButton = ({
  setBalance,
  setIncome,
  income,
  firstBusinessMultiplier,
  timer,
  setTimer,
  setIsModalRandomEventOpen,
  setModalMessage,
  upgradeCount,
  setUpgradeCount,
  setUpgradeCost,
  secUpgradeCount,
  setSecUpgradeCount,
  thirdUpgradeCount,
  setThirdUpgradeCount
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(timer !== 1);

  useEffect(() => {
    if (isButtonDisabled) {
      // Обновление таймера каждую секунду
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer - 1;
          // Сохранение в localStorage
          localStorage.setItem('timer', newTimer.toString());
          if (newTimer <= 0) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            localStorage.removeItem('timer'); // Удаление из localStorage при истечении таймера
            return 600; // Сбросить таймер на 10 минут
          }
          return newTimer;
        });
      }, 1000);

      // Очистка интервала при размонтировании компонента
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonDisabled]);

  const handleRandomEvent = () => {
    setIsButtonDisabled(true); // Отключить кнопку

    // Определяем события и их вероятности
    const events = [
      { type: 'reset', probability: 0 }, // 5% шанс
      { type: 'hourIncome', probability: 0 }, //5% шанс
      { type: 'tenIncome', probability: 0 }, // 10% шанс
      { type: 'minusTen', probability: 0.5 }, // 10% шанс
      { type: 'minusLvlOne', probability: 0.5}, // 10% шанс
      { type: 'minusLvlSec', probability: 0}, // 10% шанс
      { type: 'minusLvlThird', probability: 0}, // 10% шанс
      { type: 'plusLvlOne', probability: 0}, // 10% шанс
      { type: 'plusLvlSec', probability: 0}, // 10% шанс
      { type: 'plusLvlThird', probability: 0}, // 10% шанс
      { type: 'nothing', probability: 0} // 10%
    ];

    // Рассчитываем случайное число для определения события
    let randomEvent = Math.random();
    let cumulativeProbability = 0;

    // Считаем доход за час и 10 минут
    const secondsPerHour = 900;
    const secondsPerTen = 200;
    const hourIncome = income * secondsPerHour * firstBusinessMultiplier;
    const tenIncome = income * secondsPerTen * firstBusinessMultiplier;

    // Определяем, какое событие происходит
    for (let event of events) {
      cumulativeProbability += event.probability;
      if (randomEvent < cumulativeProbability) {
        switch (event.type) {
          case 'reset':
            setBalance(0);
            setModalMessage('The stock market has fallen, your balance has disappeared! :(');
            setIsModalRandomEventOpen(true);
            return;
          case 'hourIncome':
            setBalance(currentBalance => currentBalance + hourIncome);
            setModalMessage(
              `Good news! You've earned an extra hour's income: $${hourIncome.toFixed(2)}`
            );
            setIsModalRandomEventOpen(true);
            return;
          case 'tenIncome':
            setBalance(currentBalance => currentBalance + tenIncome);
            setModalMessage(
              `Good news! You've earned an extra 10 minutes' income: $${tenIncome.toFixed(2)}`
            );
            setIsModalRandomEventOpen(true);
            return;
          case 'minusTen':
            setBalance(currentBalance => currentBalance - tenIncome);
            setModalMessage(`-10 test: -$${tenIncome.toFixed(2)}`);
            setIsModalRandomEventOpen(true);
            return;
            
            case 'minusLvlOne':
  if (upgradeCount > 0) {
    const newUpgradeCount = upgradeCount - 1;
    let newIncome = 1; // начальное значение дохода
    let newUpgradeCost = 10; // начальное значение стоимости улучшения

    for (let i = 0; i < newUpgradeCount; i++) {
      const baseIncrement = 1.05; // Базовое увеличение на 5%
      const additionalIncrement = (i % 5) * 0.01; // Дополнительное увеличение на 1% за каждый уровень в текущем цикле пяти улучшений
      const incrementFactor = baseIncrement + additionalIncrement;

      newIncome *= incrementFactor;

      if ((i + 1) % 5 === 0) {
        newIncome *= 1.25; // Дополнительное увеличение дохода на 25% на каждом пятом улучшении
      }

      if ((i + 1) % 10 === 0) {
        newIncome *= 2; // Удвоение дохода на каждом десятом улучшении
      }

      const costMultiplier = 1.1 + ((i + 1) % 5 === 0 ? 0.05 : 0); // Основное увеличение на 10%, дополнительное на 5% каждое пятое улучшение
      newUpgradeCost *= costMultiplier;
    }

    // Пропорциональное уменьшение дохода
    const previousIncome = income;
    newIncome *= previousIncome / income; // Пропорциональное уменьшение дохода на основе текущего значения дохода

    setIncome(newIncome);
    setUpgradeCount(newUpgradeCount);
    setUpgradeCost(newUpgradeCost);
    setModalMessage(`-1 lvl on first business!`);
    setIsModalRandomEventOpen(true);
  } else {
    setModalMessage(`Nothing changed!`);
    setIsModalRandomEventOpen(true);
  }
  return;

            
          default:
            // Нет действия для неопределенного события
            break;
        }
      }
    }
  };

  return (
    <>
      <button
        onClick={handleRandomEvent}
        disabled={isButtonDisabled}
        className={`py-2 px-4 font-bold rounded transition duration-300 ease-in-out ${
          isButtonDisabled ? 'bg-gray-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
      >
        {isButtonDisabled ? `Wait: ${timer} sec` : 'Trigger Random Event'}
      </button>
    </>
  );
};

export default RandomEventButton;
