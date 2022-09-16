import React, { prevState } from 'react'
import { useParams } from 'react-router-dom';

function Editor(props) {
    
    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(props.editForm)
        }
        const url = `${props.BASE_URL}people/${id}`
        console.log(props.editForm)
        try{
            const response =  await fetch(url, options)
            // const updatedPerson = await response.json()

            // props.setThisPerson(updatedPerson)
            // props.setEditFormat(updatedPerson)

        }
        catch(err) {
            console.log(err)
        }
        
       /*  props.setEditorOpen(!prevState)
        props.setEditForm({
            name: props.thisPerson.name,
            image: props.thisPerson.image,
            title: props.thisPerson.title,
        }) */
    }
    
    const handleChange = (e) => {
        props.setEditForm({...props.editForm, [e.target.name]: e.target.value})
    }

  return (
    <div>
         <form onSubmit={ handleSubmit }>
            <input
                type="text"
                value={ props.editForm.name }
                onChange={ handleChange }
                name = "name"
                placeholder="Name"
                
            />
            <input
                type="text"
                value={ props.editForm.image }
                onChange={ handleChange }
                name = "image"
                placeholder="Image"
            />
            <input
                type="text"
                value={ props.editForm.title }
                onChange={ handleChange }
                name = "title"
                placeholder="Title"
            />
            <input type="submit" value="Update Person"/>
        </form>
    </div>
  )
}

export default Editor