import { Link } from "react-router-dom";


const Pet = (props) => {
  const { animal, image, Name, location, bread, id} = props;
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if(image.length){
    hero = image[0];
  }
  return <Link to={`/details/${id}`} className="pet">
    <div className='image-container'>
      <img src={hero} alt={Name}/>
    </div>
    <div className="info">
      <h1>{Name}</h1>
      <h2>{`${animal} - ${bread} - ${location}`}</h2>
    </div>
  </Link>;
};

export default Pet;
