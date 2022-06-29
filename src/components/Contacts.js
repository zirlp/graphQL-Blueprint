
const Contacts = ({ contacts, country, close, handleEdit, create }) => {

    return (
      <div>
        <div className="bp4-dialog">
            <div className="bp4-dialog-header">
                <span className="bp4-icon-large bp4-icon-info-sign"></span>
                <h5 className="bp4-heading">Contacts from {country.name}</h5>
                <button
                    onClick={close}
                    aria-label="Close"
                    className="bp4-dialog-close-button bp4-button bp4-minimal bp4-icon-cross"
                ></button>
            </div>
  
            <div className="bp4-dialog-body">
                { contacts.map((c,index) => 
                    <div className="bp4-dialog-body" onClick={()=>handleEdit(c)} 
                        style={{"background":"#DCDCDC", "padding":"10px","borderRadius":"2%", "cursor":"pointer"}}>  
                        <p>{index+1}.- <strong> {c.name}</strong></p>
                        <p>E-mail: {c.mail}</p>
                        <p>Comment: {c?.comment}</p>
                    </div>  
                )}
            </div>
  
            <div className="bp4-dialog-footer">
                <div className="bp4-dialog-footer-actions">
                    <button
                        type="submit"
                        className="bp4-button bp4-intent-primary"
                          onClick={()=>create()} 
                        >
                        Add new contact
                    </button> 
                    <button type="submit" className="bp4-button" onClick={close}>
                        Close
                    </button>
                </div>
            </div>
      </div>
    </div>
    );
  };
  
  export default Contacts;