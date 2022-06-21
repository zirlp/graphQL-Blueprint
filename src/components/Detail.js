import { Dialog, DialogProps, Button } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";

const Detail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = useCallback(() => setIsOpen(!isOpen), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <div>
      <Button onClick={handleButtonClick} text="buttonText" />
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <DialogBody />
      </Dialog>
    </div>
  );
};

function DialogBody() {
  return (
    <div className="bp4-dialog-body">
      <p>
        <strong>This is going to show the details for each country</strong>
      </p>
    </div>
  );
}

export default Detail;
