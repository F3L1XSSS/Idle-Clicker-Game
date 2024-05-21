import React from 'react';

const BusinessCarousel = ({
  income,
  upgradeCost,
  upgradeCount,
  secIncome,
  secUpgradeCost,
  secUpgradeCount,
  thirdIncome,
  thirdUpgradeCost,
  thirdUpgradeCount,
  firstBusinessMultiplier,
  secondBusinessMultiplier,
  thirdBusinessMultiplier,
  unlockSecondWindow,
  unlockThirdWindow,
  secondWindowUnlocked,
  thirdWindowUnlocked,
  convertNumberToShortForm,
  purshcaseUpgrade,
  secPurshcaseUpgrade,
  secondUnlockCost,
  thirdUnlockCost,
  thirdPurshcaseUpgrade
}) => {
  return (
    <div className="carousel-container flex justify-center items-center">
      {/* Здесь размещаем карусель бизнесов */}
      <div className="carousel">
        {/* Первый бизнес */}
        <div className="business-window">
          <h2>First Business</h2>
          <p>Income: ${convertNumberToShortForm(income)}</p>
          <button onClick={purshcaseUpgrade}>Upgrade for ${upgradeCost}</button>
          <p>Level: {upgradeCount}</p>
        </div>
        {/* Второй бизнес */}
        {secondWindowUnlocked && (
          <div className="business-window">
            <h2>Second Business</h2>
            <p>Income: ${convertNumberToShortForm(secIncome)}</p>
            <button onClick={secPurshcaseUpgrade}>Upgrade for ${secUpgradeCost}</button>
            <p>Level: {secUpgradeCount}</p>
          </div>
        )}
        {/* Т```jsx
        {/* Второй бизнес */}
        {!secondWindowUnlocked && (
          <div className="business-window">
            <h2>Second Business</h2>
            <p>Unlock for ${secondUnlockCost}</p>
            <button onClick={unlockSecondWindow}>Unlock</button>
          </div>
        )}
        {secondWindowUnlocked && (
          <div className="business-window">
            <h2>Second Business</h2>
            <p>Income: ${convertNumberToShortForm(secIncome)}</p>
            <button onClick={secPurshcaseUpgrade}>Upgrade for ${secUpgradeCost}</button>
            <p>Level: {secUpgradeCount}</p>
          </div>
        )}
        {/* Третий бизнес */}
        {!thirdWindowUnlocked && (
          <div className="business-window">
            <h2>Third Business</h2>
            <p>Unlock for ${thirdUnlockCost}</p>
            <button onClick={unlockThirdWindow}>Unlock</button>
          </div>
        )}
        {thirdWindowUnlocked && (
          <div className="business-window">
            <h2>Third Business</h2>
            <p>Income: ${convertNumberToShortForm(thirdIncome)}</p>
            <button onClick={thirdPurshcaseUpgrade}>Upgrade for ${thirdUpgradeCost}</button>
            <p>Level: {thirdUpgradeCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCarousel;
