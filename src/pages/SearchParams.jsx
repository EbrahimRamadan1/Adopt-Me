import { useState, useContext } from 'react';
import Result from '../components/Result';
import useBreedList from './../hooks/useBreedList';
import usePetSearch from '../hooks/usePetSearch';
import AdoptedPetContext from '../contexts/adoptedPetContext';

// import ErrorBoundary from './../components/ErrorBoundary';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
const SearchParams = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });

  const [adoptedPet] = useContext(AdoptedPetContext);

  const breedsQuery = useBreedList(searchParams.animal);
  const breeds = breedsQuery?.data?.breeds ?? [];

  const petQuery = usePetSearch(searchParams);
  const pets = petQuery?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const animal = formData.get('animal');
          const location = formData.get('location');
          const breed = formData.get('breed');
          setSearchParams({ animal, location, breed });
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                animal: e.target.value,
                breed: '',
              });
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={!breeds.length} name="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  );
};

export default SearchParams;
