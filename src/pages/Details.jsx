import { useNavigate, useParams } from 'react-router-dom';
import Loader from './../components/Loader';
import usePet from './../hooks/usePet';
import Carousel from '../components/Carousel';
import { useState, useContext, lazy } from 'react';
const Modal = lazy(() => import('../components/Modal'));
import AdoptedPetContext from './../contexts/adoptedPetContext';

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const petQuery = usePet(id);
  const pet = petQuery?.data?.pets[0];
  return (
    <div className="details">
      {petQuery.isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {petQuery.isError && <h2>{petQuery.error.message}</h2>}
      {pet && (
        <div>
          <Carousel images={pet.images} />
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal} - ${pet.breed} - ${pet.city},${pet.state}`}</h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Adopt {pet.name}
          </button>
          <p>{pet.description}</p>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Back
          </button>
          {showModal && (
            <Modal>
              <h1>Would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
