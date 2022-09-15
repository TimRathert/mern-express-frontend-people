import { useState, useEffect } from 'react'

function Fish(props) {
const [ fish, setFish ] = useState([])

const BASE_URL = "https://mern-express-backend-people.herokuapp.com/";

const getFish = async () => {
    try {
        const response = await fetch(BASE_URL + 'fish')
        const allFish = await response.json()
        setFish(allFish)
    }catch(err){
        console.log(err)
    }

}

useEffect(()=>{getFish()}, [])


const loaded = () => {
    return fish?.map((person, index) => {
      return (
        <div key={person._id} className='person-item'>
          <h1>{person.name}</h1>
          <img src={person.image} alt={ person.name } />
          <h3>{person.title}</h3>
        </div>
      );
    });
  };

  const loading = () => (
    <section className="fish-list">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
            alt="beans"
          />{" "}
        </span>
      </h1>
    </section>
  );

  return (
    <section className="fish-list">{fish && fish.length ? loaded() : loading()}</section>
  );
}

export default Fish