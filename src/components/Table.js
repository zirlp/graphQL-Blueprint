import { Dialog, Icon } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import Contacts from "./Contacts.js";
import Detail from "./Detail.js";
import CreateContact from "./CreateContact.js";
import Edit from "./EditDetail.js";
import EditContacts from "./EditContacs.js";

const Table = ({ countryList }) => {
  // ------ Detail handlers ---------------
  const [edit,setEdit] = useState(false)
  const [detail, setDetail] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setEdit(false)
  }, []);

  const handleButtonClick = useCallback((id, allCountries) => {   //all countries is countryList
    setIsOpen(!isOpen);
    setDetail(
      ...allCountries.filter((country) => country?.code === id)
    );
  }, []);

// -----Contact handlers ------------------

  const [editContact,setEditContact] = useState(false);
  const [createContact, setCreateContact] = useState(false);
  const [country, setCountry] = useState();
  const [contact, setContact] = useState();
  const [contacts, setContacts] = useState();
  const [open, setOpen] = useState(false);
  const handleContactsClose = useCallback(() => {
    setOpen(false)
    setEditContact(false)
    setCreateContact(false)
  }, []);

  const handleContactsClick = useCallback((currentCountry) => {   //all countries is countryList
      setCountry(currentCountry)
      setOpen(!open);
      setContacts(currentCountry.contacts);
  }, []);
  
  const openCreate = useCallback((currentCountry)=> {
    if(currentCountry)setCountry(currentCountry)
    setCreateContact(!createContact)
    setOpen(!open)
  },[])

  const handleEdit = (contact) => {
    setContact(contact)
    setEditContact(!editContact)
  }


  return (
    <div>
      <Dialog isOpen={isOpen} onClose={handleClose}>
       {edit ? <Edit detail={detail} close={handleClose} setEdit={setEdit} edit={edit} /> :
        <Detail detail={detail} close={handleClose} setEdit={setEdit} edit={edit}/>
        }
      </Dialog>

      <Dialog isOpen={open} onClose={handleContactsClose} >
        { editContact ?  <EditContacts contact={contact} country={country} close={handleContactsClose} setEdit={setEditContact} edit={editContact} />    
          : createContact ? <CreateContact country={country} close={handleContactsClose} setEdit={setCreateContact} edit={createContact} /> 
          : <Contacts contacts={contacts} country={country} close={handleContactsClose} handleEdit={handleEdit} create={openCreate}/>}
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
                  <tr>
                    <td id={country.code} onClick={(event) => 
                      handleButtonClick(event.target.id, countryList)}>{country.name}</td>
                    <td id={country.code}>{country.emoji}</td> 
                    <td id={country.code}>{country.capital}</td>
                    {country.url ? <td id="url" onClick={()=>alert("maybe later ;P")}>{country.url}</td> : <td></td>}
                    {country.contacts?.length ? 
                      <td><button className="bp4-button bp4-minimal bp4-small" style={{"fontSize":"12px","color":"gray", "fontWeight":"bold"}}
                        onClick={() => handleContactsClick(country)}> 
                        <Icon icon="git-repo" size={"25"} style={{marginRight:"-15px", marginBottom:"-5px"}} /> {country.contacts.length}</button></td> 
                      : <td id="add" > <button className="bp4-button bp4-minimal bp4-icon-add" onClick={()=>openCreate(country)} ></button> </td>}
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
