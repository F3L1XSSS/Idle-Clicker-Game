import Location from "./Location";

const Store = ({ toggleStore, isStoreOpen, locations, purchaseLocation, purchasedLocations }) => {
    return (
      <>
        <button onClick={toggleStore} className="store-button">Магазин</button>
        {isStoreOpen && (
          <div className="store-popup">
            {/* Здесь отображаются локации */}
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
          </div>
        )}
      </>
    );
  };

  export default Store;
