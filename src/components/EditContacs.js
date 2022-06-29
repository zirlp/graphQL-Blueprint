import { useMutation } from "@apollo/client";
import { TypeNameMetaFieldDef } from "graphql";
import React, { useState } from "react";
import { DELETE_CONTACT, EDIT_CONTACT } from "../graphQL/Mutations.js";
import { LIST_COUNTRIES } from "../graphQL/Queries.js";

const EditContacts = ({ contact, country, close, setEdit, edit }) => {
    const [name, setName] = useState()
    const [mail, setMail] = useState()
    const [comment, setComment] = useState()
    
    const [deleteContact, {error}] = useMutation(DELETE_CONTACT, {refetchQueries: [{query: LIST_COUNTRIES}]} )
    const [editContact] = useMutation(EDIT_CONTACT, {refetchQueries: [{query: LIST_COUNTRIES}]} )

    const erase = () => {
        deleteContact({
            variables: {
                code: contact.code,
                country: country.code
            }
        }) 
    }

    const modify = (name, mail, comment) => {
        editContact({
            variables: {
                code: contact.code,
                country: country.code,
                name:name,
                mail: mail,
                comment:comment
            }
        }) 
    }

    const deleteHandler = () =>{
        erase()
        setEdit(!edit)
        close()
    }

    const editHandler = () => {
        // this is a mess.....

        if(name && !mail && !comment) modify(name, contact.mail, contact.comment)
        else if(mail && !name && !comment) modify(contact.name, mail, contact.comment)
        else if(comment && !name && !mail) modify(contact.name, contact.mail, comment)
        else if(name && !mail && comment) modify(name, contact.mail, comment)
        else if(mail && !name && comment) modify(contact.name, mail, comment)
        else if(mail && name && !comment) modify(name, mail, contact.comment)
        else modify(name, mail, comment)

        setEdit(!edit)
        close()
    }

    return (
      <div>
        <div className="bp4-dialog">
            <div className="bp4-dialog-header">
                <span className="bp4-icon-large bp4-icon-info-sign"></span>
                <h5 className="bp4-heading">Edit {contact.name} from {country.name}</h5>
                <button
                    onClick={close}
                    aria-label="Close"
                    className="bp4-dialog-close-button bp4-button bp4-minimal bp4-icon-cross"
                ></button>
            </div>
  
            <div className="bp4-dialog-body">
                <div className="bp4-dialog-body" style={{"background":"#DCDCDC", "padding":"10px","borderRadius":"2%"}}>  
                        <div  style={{"width":"100%", "position":"relative"}}>
                        <button
                            onClick={deleteHandler}
                            aria-label="Close"
                            className="bp4-button bp4-minimal bp4-icon-cross"
                            style={{"right":"-12px", "top":"-12px","position":"absolute"}}
                        ></button>
                        </div>
                    <p>Name: <input value = {name || contact.name} onChange={e=>setName(e.target.value)} ></input></p>
                    <p>E-mail: <input value={mail || contact.mail} onChange={e=>setMail(e.target.value)} ></input></p>
                    <p>Comment: <input value={comment || contact.comment} onChange={e=>setComment(e.target.value)} ></input></p>
                </div>  
                
            </div>
  
            <div className="bp4-dialog-footer">
                <div className="bp4-dialog-footer-actions">
                { name || mail || comment ? <button
                    type="submit"
                    className="bp4-button bp4-intent-primary"
                    onClick={editHandler}
                    >
                    Save changes
                </button> : <></> }
                    <button type="submit" className="bp4-button" onClick={()=>setEdit(!edit)}>
                        Cancel
                    </button>
                </div>
            </div>
      </div>
    </div>
    );
  };
  
  export default EditContacts;