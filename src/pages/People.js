import { configure } from '@testing-library/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function People(props) {
const [ people, setPeople ] = useState([])
const [ newForm, setNewForm ] = useState({
    name: '',
    image: '',
    title: '',
})

let BASE_URL = process.env.REACT_APP_MONGODB_URI;

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

//useEffect(()=>{console.log(people)},[people])

const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = await createPeople()
    setNewForm({
        name: '',
        image: '',
        title: '',
    })
}

const handleChange = (e) => {
    setNewForm({...newForm, [e.target.name]: e.target.value})
}

const createPeople = async (personData) => {
    try{
    const newPerson = await fetch(BASE_URL + 'people',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm)
    });
    
    getPeople();
    }
    catch(err){
        console.log(err)
    }
}

const loaded = () => {
    const newPersonForm = () => {
        return (
        <form onSubmit={ handleSubmit }>
            <input
                type="text"
                value={ newForm.name }
                onChange={ handleChange }
                name = "name"
                placeholder="Name"
                
            />
            <input
                type="text"
                value={ newForm.image }
                onChange={ handleChange }
                name = "image"
                placeholder="Image"
            />
            <input
                type="text"
                value={ newForm.title }
                onChange={ handleChange }
                name = "title"
                placeholder="Title"
            />
            <input type="submit" value="New Person"/>
        </form>
        )
    }
    const peopleList = people.map((person, index) => {
      return (
        <Link 
            key={ index }
            className='person-item' 
            style={{textDecoration: 'none'}} 
            to={`/people/${ person._id}`}>
            <div key={person._id}>
              <h1>{person.name}</h1>
              <img src={person.image} alt={ person.name } />
              <h3>{person.title}</h3>
            </div>
        </Link>
      );
    });
    return(
        <>
        { newPersonForm() }
        { peopleList }
        </>
    )
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