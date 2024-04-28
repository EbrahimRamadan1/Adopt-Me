import Pet from './Pet';

const Result = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((el) => {
          return (
            <Pet
              animal={el.animal}
              key={el.id}
              id={el.id}
              Name={el.name}
              bread={el.breed}
              image={el.images}
              location={`${el.city},${el.state}`}
            />
          );
        })
      )}
    </div>
  );
};
export default Result;
