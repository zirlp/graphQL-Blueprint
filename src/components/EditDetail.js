import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_COUNTRY_PROPERTIES } from "../graphQL/Mutations.js";

const Edit = ({detail, close, edit, setEdit}) => {

  const [editCountryProperties, {data, loading, error}] = useMutation(EDIT_COUNTRY_PROPERTIES)

  const mutateCountry = () => {
    editCountryProperties({
      variables: {
        country: detail.code,
        comment: comment,
        url: url,
      }
    })
    console.log(detail)
  }

  if(error) console.log(error)

    const [btn, setBtn] = useState(true);
    const [btnT, setBtnT] = useState(true);
  
    const [url,setUrl] =useState();
    const [comment, setComment] = useState();
    
    const handleSave = () => {
      mutateCountry();
      setEdit(!edit)
      close()
    }

    const handleClose =()=>{
        setEdit(!edit);
        close()
    }

   
    


    return     <div className="bp4-dialog">
    <div className="bp4-dialog-header">
      <span className="bp4-icon-large bp4-icon-info-sign"></span>
      <h5 className="bp4-heading">Country details</h5>
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
        {  detail.url ? <p>URL: <input value={url||detail.url} onChange={(e)=> setUrl(e.target.value)}></input></p>
            :   btn ? <button
            type="button"
            className="bp4-button bp4-intent-primary"
            onClick={()=>setBtn(!btn)}
                >
            Add URL
          </button> :  <p>URL: <input placeholder="only valid urls" onChange={(e)=>setUrl(e.target.value)}></input></p>
        }   
      </>  <br/>
       
      <>
      { detail.comment ? <p>Comment: <input value={comment||detail.comment} onChange={(e)=>setComment(e.target.value)}></input></p> 
        : btnT ? <button
        type="button"
        className="bp4-button bp4-intent-primary"
        onClick={()=>setBtnT(!btnT)}
      >
        Add comment
      </button> : <p>Comment: <input onChange={(e)=> setComment(e.target.value)} ></input></p>  }
      </>
    </div>

    <div className="bp4-dialog-footer">
      <div className="bp4-dialog-footer-actions">
        <button type="submit" className="bp4-button" onClick={handleClose}>
          Cancel
        </button>
        { <button
          type="submit"
          className="bp4-button bp4-intent-primary"
          onClick={handleSave}
        >
          Save changes
        </button>}
      </div>
    </div>
  </div>


}

export default Edit;