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

  const handleButtonClick = useCallback((countryName, allCountries) => {   //all countries is countryList
    setIsOpen(!isOpen);
    setDetail(
      ...allCountries.filter((country) => country?.name === countryName)
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
                    <td id={country.name}>{country.name}</td>
                    <td>{country.emoji}</td>
                    <td>{country.capital}</td>
                    {country.url ? <td>{country.url}</td> : <td></td>}
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
