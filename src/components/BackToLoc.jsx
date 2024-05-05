import { useNavigate } from 'react-router-dom';

const BackToLock = ({ id, name }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div key={id} className="mt-4 bg-gray-600 p-4 rounded-lg shadow-inner">
      <h3 className="text-lg">{name}</h3>
      <button
        onClick={handleNavigate}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
      >
        Перейти
      </button>
    </div>
  );
};

export default BackToLock;
