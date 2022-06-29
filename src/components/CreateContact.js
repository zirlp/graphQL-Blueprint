import { useMutation } from "@apollo/client";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { CREATE_CONTACT } from "../graphQL/Mutations.js";
import { LIST_COUNTRIES } from "../graphQL/Queries.js";

const CreateContact = ({ country, close, setEdit, edit }) => {
    const [name, setName] = useState()
    const [mail, setMail] = useState()
    const [comment, setComment] = useState()

    const [createContact, {error}] = useMutation(CREATE_CONTACT, {refetchQueries: [{query: LIST_COUNTRIES}]})

    const addContact = (name, mail, comment) => {
        createContact({
            variables: {
                name: name,
                mail: mail,
                country: country.code,
                comment: comment,
            }
        }) 
    }

    const handleSave = (name, mail, comment) => {
        addContact(name, mail, comment);
        setEdit(!edit)
        close()
      }

      if(error) return alert("Try with another name")
 
    return (
      <div>
        <div className="bp4-dialog">
            <div className="bp4-dialog-header">
                <span className="bp4-icon-large bp4-icon-new-person"></span>
                <h5 className="bp4-heading">Create contacts from {country.name}</h5>
                <button
                    onClick={close}
                    aria-label="Close"
                    className="bp4-dialog-close-button bp4-button bp4-minimal bp4-icon-cross"
                ></button>
            </div>
  
            <div className="bp4-dialog-body">
             <FormGroup>
                <FormGroup  label="Name" labelFor="name" labelInfo="(required)" >
                    <InputGroup id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </FormGroup>
                <FormGroup label="E-mail" labelFor="mail" labelInfo="(required)" >
                    <InputGroup id="mail" value={mail} onChange={(e)=>setMail(e.target.value)} />
                </FormGroup>
                <FormGroup label="comment" labelFor="comment" labelInfo="(optional)" >
                    <InputGroup id="comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
                </FormGroup>
             </FormGroup>


            </div>
  
            <div className="bp4-dialog-footer">
                <div className="bp4-dialog-footer-actions">
                { name && mail ? <button
                    type="submit"
                    className="bp4-button bp4-intent-primary"
                    onClick={()=>handleSave(name, mail, comment)}
                    >
                    Create Contact
                </button> : <></> }
                    <button type="submit" className="bp4-button" onClick={()=> setEdit(!edit)}>
                        Cancel
                    </button>
                </div>
            </div>
      </div>
    </div>
    );
  };
  
  export default CreateContact;