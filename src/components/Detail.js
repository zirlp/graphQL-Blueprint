// import { Dialog, DialogProps, Button } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";

const DialogBody = ({ detail, close }) => {
  return (
    // <div className="bp4-dialog-container">
    <div className="bp4-dialog">
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
      </div>

      <div class="bp4-dialog-footer">
        <div class="bp4-dialog-footer-actions">
          <button type="button" class="bp4-button" onClick={close}>
            Close
          </button>
          <button
            type="submit"
            class="bp4-button bp4-intent-primary"
            onClick={close}
          >
            Close too
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DialogBody;
