import { Dialog } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import DialogBody from "./Detail.js";
import Edit from "./EditDetail.js";

const Table = ({ countryList }) => {
  const [detail, setDetail] = useState();
  const [edit,setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setEdit(false)
  }, []);

  const handleButtonClick = useCallback((id, allCountries) => {   //all countries is countryList
    if(id === "url" || !id ) return alert("coming soon feature...")
    setIsOpen(!isOpen);
    setDetail(
      ...allCountries.filter((country) => country?.code === id)
    );
  }, []);


  return (
    <div>
      <Dialog isOpen={isOpen} onClose={handleClose}>
       {edit ? <Edit detail={detail} close={handleClose} setEdit={setEdit} edit={edit} /> :
        <DialogBody detail={detail} close={handleClose} setEdit={setEdit} edit={edit}/>
        }
      </Dialog>

      <table className="bp4-html-table  bp4-interactive bp4-html-table-condensed">
        <thead>
          <tr>
            <th>Country</th>
            <th>emoji</th>
            <th>Capital</th>
            <th>URL</th>
            <th>Contacts</th>
          </tr>
        </thead>
        <tbody>
          {countryList
            ? countryList.map((country) => {
                return (
                  <tr
                    onClick={(event) =>
                      handleButtonClick(event.target.id, countryList)
                    }
                  >
                    <td id={country.code}>{country.name}</td>
                    <td id={country.code}>{country.emoji}</td>
                    <td id={country.code}>{country.capital}</td>
                    {country.url ? <td id="url" >{country.url}</td> : <td></td>}
                    <td> <button className="bp4-button bp4-small bp4-intent-primary " >contacts</button> </td>
                  </tr>
                );
              })
            : "we had some troubles"}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// Table2 -----------------------------

/* <Table2
        className="bp4-html-table"
        numRows={countryList ? countryList.length : null}
      >
        <Column
          name="Country"
          cellRenderer={(index) => (
            <Cell>{countryList ? countryList[index].name : null}</Cell>
          )}
        />

        <Column
          name="Emoji"
          cellRenderer={(index) => (
            <Cell>{countryList ? countryList[index].emoji : null}</Cell>
          )}
        />
        <Column
          name="Capital"
          cellRenderer={(index) => (
            <Cell>{countryList ? countryList[index].capital : null}</Cell>
          )}
        />
      </Table2> */
