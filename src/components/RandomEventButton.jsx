import { useState, useEffect } from 'react';

const RandomEventButton = ({
  setBalance,
  income,
  firstBusinessMultiplier,
  timer,
  setTimer,
  setIsModalRandomEventOpen,
  setModalMessage,
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonDisabled]);

  const handleRandomEvent = () => {
    setIsButtonDisabled(true); // Отключить кнопку

    // Определяем события и их вероятности
    const events = [
      { type: 'reset', probability: 0.1 }, // 10% шанс
      { type: 'hourIncome', probability: 0.1 }, //10% шанс
      { type: 'tenIncome', probability: 0.1 }, // 60% шанс
      { type: 'minusTen', probability: 0.6 },
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
