import { useQuery } from 'react-query';

const fetchPets = async ({ queryKey }) => {
  const [, { animal, location, breed }] = queryKey;
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );
  return res.json();
};

const usePetSearch = (SearchParams) => {
  return useQuery(['search-pets', SearchParams], fetchPets);
};
export default usePetSearch;
