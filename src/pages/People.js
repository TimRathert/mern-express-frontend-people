import { useState, useEffect } from 'react'

function People(props) {
const [ people, setPeople ] = useState([])

const BASE_URL = "https://mern-express-backend-people.herokuapp.com/";

const getPeople = async () => {
    try {
        const response = await fetch(BASE_URL + 'people')
        const allPeople = await response.json()
        setPeople(allPeople)
    }catch(err){
        console.log(err)
    }

}

useEffect(()=>{getPeople()}, [])


const loaded = () => {
    return people?.map((person, index) => {
      return (
        <div key={person._id}>
          <h1>{person.name}</h1>
          <img src={person.image} alt={ person.name } />
          <h3>{person.title}</h3>
        </div>
      );
    });
  };

  const loading = () => (
    <section className="people-list">
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
    <section className="people-list">{people && people.length ? loaded() : loading()}</section>
  );
}

export default People