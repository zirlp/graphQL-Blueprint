// import { Dialog, DialogProps, Button } from "@blueprintjs/core";

const DialogBody = ({ detail, close, setEdit, edit }) => {

  return (
    <div>
    {  <div className="bp4-dialog">
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
        {detail.url ? <p>URL: {detail.url}</p> : <></>}
        {detail.comment ? <p>Comment: {detail.comment}</p> : <></>}
      </div>

      <div className="bp4-dialog-footer">
        <div className="bp4-dialog-footer-actions">
          <button
            type="submit"
            className="bp4-button bp4-intent-primary"
            onClick={()=>setEdit(!edit)}
          >
            Edit
          </button> 
          <button type="submit" className="bp4-button" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>}
  </div>
  );
};

export default DialogBody;
