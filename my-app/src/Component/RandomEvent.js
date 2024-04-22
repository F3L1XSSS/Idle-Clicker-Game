import React, { useState, useEffect } from 'react';

const RandomEventButton = ({setBalance, income, firstBusinessMultiplier}) => {
  // Инициализация таймера из localStorage или установка по умолчанию в 600 секунд
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? Number(savedTimer) : 600;
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(timer !== 600);

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
  }, [isButtonDisabled]);
  const handleRandomEvent = () => {
    setIsButtonDisabled(true); // Отключить кнопку
    setIsButtonDisabled(true);
    // Определяем события и их вероятности
    const events = [
      { type: 'reset', probability: 0.1 },  // 10% шанс
      { type: 'hourIncome', probability: 0.1 },  //10% шанс
      { type: 'tenIncome', probability: 0.1 },   // 60% шанс
      { type: 'minusTen', probability: 0.6}
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
            alert('The stock market has fallen, your balance has disappeared! :(');
            return;
          case 'hourIncome':
            setBalance(currentBalance => currentBalance + hourIncome);
            alert(`Good news! You've earned an extra hour's income: $${hourIncome.toFixed(2)}`);
            return;
          case 'tenIncome':
            setBalance(currentBalance => currentBalance + tenIncome);
            alert(`Good news! You've earned an extra 10 minutes' income: $${tenIncome.toFixed(2)}`);
            return;
          case 'minusTen':
            setBalance(currentBalance => currentBalance - tenIncome);
            alert(`-10 test: -$${tenIncome.toFixed(2)}`);
            return;
          default:
            // Нет действия для неопределенного события
            break;
        }
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleRandomEvent}
        disabled={isButtonDisabled}
        className={` mt-4 py-2 px-4 font-bold rounded ${isButtonDisabled ? 'bg-gray-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
      >
        {isButtonDisabled ? `Wait: ${timer} sec` : 'Trigger Random Event'}
      </button>
    </div>
  );
};

export default RandomEventButton;
