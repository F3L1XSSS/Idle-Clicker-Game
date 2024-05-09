import { locations } from '../constants/locations';
import { totalUpgrade } from '../constants/totalUpgrade';
import Location from '../components/Location';
import TotalUpgrade from './TotalUpgrade';
import Modal from './Common/Modal';
import backgroundImage from '../images/fone.webp';
import greenCrystal from '../images/greenCrystal.png';

import '../styles/scrollbar.scss';

const ModalStore = ({
  greenCrystals,
  convertBalanceToGreenCrystals,
  purchasedLocations,
  purchaseLocation,
  purchasedUpgrade,
  purchaseUpgrade,
  toggleStore,
  isShowing,
}) => {
  return (
    <Modal isShowing={isShowing} toggle={toggleStore}>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="absolute right-0 w-[400px] h-[calc(100vh-20px)] py-[20px] mt-[10px] mb-[10px] rounded-tl-lg rounded-bl-lg"
      >
        <div className="h-[calc(100vh-60px)] px-5 shadow-lg overflow-y-auto">
          <div className="relative">
            <h2 className="text-xl mb-4">Магазин локаций</h2>
            <button
              onClick={toggleStore}
              className="absolute  right-2 bottom-0 transition-all ease-in-out hover:scale-110 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
                fill="white"
                stroke="white"
              >
                <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-4">
            <img src={greenCrystal} alt="Green Crystal" className="inline-block h-6 w-6" />{' '}
            <span className="font-bold">{greenCrystals.toFixed(4)}</span>
          </div>
          <button
            onClick={convertBalanceToGreenCrystals}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold mb-4 py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Конвертировать баланс в{' '}
            <img src={greenCrystal} alt="Green Crystal" className="inline-block h-6 w-6" />
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
      </div>
    </Modal>
  );
};

export default ModalStore;
