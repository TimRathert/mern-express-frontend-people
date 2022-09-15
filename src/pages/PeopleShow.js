import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PeopleShow() {
  const [ thisPerson, setThisPerson ] = useState()
  
  const BASE_URL = process.env.REACT_APP_MONGODB_URI
  const { id } = useParams();
  const getPerson = async () => {
    try{
      const response = await fetch(`${BASE_URL}people/${id}`)
      const personData = await response.json()
      setThisPerson(personData)
    }
    catch(e){
      console.log(e)
    }
  }
  const navigate = useNavigate()
  const deletePerson = async () => {
    try{
      const deletePerson = await fetch(BASE_URL + 'people' + id,{
          method: 'DELETE',
      });
      navigate('/people')
      }
      catch(err){
          console.log(err)
      }
  }

  const loaded = () => {

    return(
      <div>
        <h2>{ thisPerson.name }</h2>
        <img src= { thisPerson.image } alt= { thisPerson.name } />
        <h5>{ thisPerson.title }</h5>
        <input type= 'submit' value= 'Cool Ranch Deleto' onClick={ deletePerson }></input>

      </div>
    )
  }
  const notLoaded = () => {
    return(
      <div>
        Loading...
      </div>
    )
  }
  useEffect(() => {
    getPerson()
  },[])
  return (
    thisPerson ? loaded() : notLoaded()
  )
}

export default PeopleShow