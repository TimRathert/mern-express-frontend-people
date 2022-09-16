import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Editor from '../components/Editor'

function PeopleShow() {
  const [ thisPerson, setThisPerson ] = useState()
  const [ editForm, setEditForm ] = useState(null)
  const [ editorOpen, setEditorOpen ] = useState(false)
  
  const BASE_URL = process.env.REACT_APP_MONGODB_URI
  const { id } = useParams();
  const getPerson = async () => {
    try{
      const response = await fetch(`${BASE_URL}people/${id}`)
      const personData = await response.json()
      setThisPerson(personData);
      setEditForm(personData);
    }
    catch(e){
      console.log(e)
    }
  }
  const editPerson = () => {
    setEditorOpen(!editorOpen)
  }

  const navigate = useNavigate()
  const deletePerson = async () => {
    try{
      const response = await fetch(BASE_URL + 'people/' + id,{
          method: 'DELETE',
      })
      const deletedPerson = await response.json()
      navigate('/people')
      }
      catch(err){
          console.log(err)
      }
  }

  const loaded = () => {

    return(
      <div className='thisPerson'>
        { editorOpen ? <div><Editor 
            editForm = {editForm } 
            setEditForm = { setEditForm } 
            thisPerson = { thisPerson }
            setThisPerson = { setThisPerson }
            BASE_URL = { BASE_URL }
            setEditorOpen = { setEditorOpen }
        
        /></div> : <div></div> }
        <h2>{ thisPerson.name }</h2>
        <h5>{ thisPerson.title }</h5>
        <img src= { thisPerson.image } alt= { thisPerson.name } />
        <div className='button-wrapper'>
          <input type= 'submit' value= 'Cool Ranch Deleto' onClick={ deletePerson } />
          <input type= 'submit' value= 'Edit Person' onClick={ editPerson } />
        </div>
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