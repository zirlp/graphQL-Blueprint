import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_COUNTRY_PROPERTIES } from "../graphQL/Mutations.js";
import { LIST_COUNTRIES } from "../graphQL/Queries.js";
import { TextArea } from "@blueprintjs/core";

const Edit = ({detail, close, edit, setEdit }) => {
  
  const [btn, setBtn] = useState(true);
  const [btnT, setBtnT] = useState(true);
  const [url,setUrl] =useState();
  const [comment, setComment] = useState();
  const regEx = /https?:\/\//;
  const [validate, setValidate] = useState(false)

  const [editCountryProperties, {error} ] = useMutation(EDIT_COUNTRY_PROPERTIES, {refetchQueries: [{query: LIST_COUNTRIES}]})
  
  const mutateCountry = (url, comment) => {
    if(url && comment)  
    editCountryProperties({
      variables: {
        country: detail.code,
        comment: comment,
        url: url,
      }
    }) 
    else if(url && !comment) 
    editCountryProperties({
      variables: {
        country: detail.code,
        comment: detail.comment,
        url: url,
      }
    })
    else if(comment && !url)
    editCountryProperties({
      variables: {
        country: detail.code,
        comment: comment,
        url: detail.url,
      }
    })  
    
  }

  const handleUrl = (e) => {
    e.preventDefault()
    setUrl(e.target.value)
    if(!regEx.test(e.target.value)) setValidate(true)
    else setValidate(false)
  }

  const handleSave = (url, comment) => {
    mutateCountry(url, comment);
    setEdit(!edit)
    close()
  }
  
  const handleDelete = (url,comment) => {
 
    alert("working on it")
  }




  if(error) console.log(error)
  
    return     <div className="bp4-dialog">
    <div className="bp4-dialog-header">
      <span className="bp4-icon-large bp4-icon-edit"></span>
      <h5 className="bp4-heading">Edit country details</h5>
      <button
        onClick={close}
        aria-label="Close"
        className="bp4-dialog-close-button bp4-button bp4-minimal bp4-icon-cross"
      ></button>
    </div>

    <div className="bp4-dialog-body">
      <p>
        <strong>Name: {detail.name}</strong>
      </p>
      <p>Continent: {detail.continent.name}</p>
      <p>Capital: {detail.capital}</p>
      <p>
        Languages:
        {detail.languages.map((element) => {
          return `  ${element.name}(${element.code}) `;
        })}
      </p>
      <p>Native name: {detail.native}</p>
      <p>Currency: {detail.currency} </p>
      <>
        {  detail.url ? <span><p>URL: <input className={`bp4-input ${validate ? "bp4-intent-danger" : null}`} value={url || detail.url} onChange={(e)=> handleUrl(e)}></input>
          <button className="bp4-button bp4-minimal bp4-icon-remove" onClick={()=> handleDelete()}  ></button></p> 
          {validate ? <span style={{color:"red"}} >URL must start with https:// or http://</span> : null} </span> 
            :   btn ? <button
            type="button"
            className="bp4-button bp4-intent-primary"
            onClick={()=>setBtn(!btn)}
                >
            Add URL
          </button> :  <p>URL: <input className={`bp4-input ${validate ? "bp4-intent-danger" : null}`} placeholder="https:// or http:// only" onChange={(e)=> handleUrl(e)}></input></p>
        }   
      </>  <br/>
       
      <>
      { detail.comment ? <p>Comment: <TextArea className="bp4-small" value={comment||detail.comment} onChange={(e)=>setComment(e.target.value)}></TextArea>
        <button className="bp4-button bp4-minimal bp4-icon-remove" onClick={()=> handleDelete()}  ></button></p> 
          : btnT ? <button
          type="button"
          className="bp4-button bp4-intent-primary"
          onClick={()=>setBtnT(!btnT)}
      >
        Add comment
      </button> : <p>Comment: <TextArea className="bp4-small" onChange={(e)=> setComment(e.target.value)} ></TextArea></p>  }
      </>
    </div>

    <div className="bp4-dialog-footer">
      <div className="bp4-dialog-footer-actions">
        { !validate && (url || comment) ? <button
          type="submit"
          className="bp4-button bp4-intent-primary"
          onClick={()=>handleSave(url, comment)}
        >
          Save changes
        </button> : <></> }
        <button type="submit" className="bp4-button" onClick={()=>setEdit(!edit)}>
          Cancel
        </button>
      </div>
    </div>
  </div>


}

export default Edit;