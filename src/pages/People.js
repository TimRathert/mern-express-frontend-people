import { useState, useEffect } from 'react'

function People(props) {
const [ people, setPeople ] = useState([])
const [newForm, setNewForm ] = useState({
    name: '',
    image: '',
    title: '',
})

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
        method: 'post',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(personData)
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
            <div key={person._id} className='person-item'>
              <h1>{person.name}</h1>
              <img src={person.image} alt={ person.name } />
              <h3>{person.title}</h3>
            </div>
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