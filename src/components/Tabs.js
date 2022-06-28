import { Icon, Tab, Tabs } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ContinentTabs = ({ continentSet, setContinent, countryList, setQueryList, setQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState()
  var params = searchParams.get("continent");

  
  const handleSearch = (event) => {
    event.preventDefault()
    setInput(event.target.value)  //this is to "control" the input value
    setQuery(event.target.value)  //this is to pass it to parent component and do the filtering
    setQueryList(countryList) //needed to do this to prevent the first search to be a "nothing found"
    //if stops typing, trigger the search
    const delayedSearch = setTimeout(()=> {
      let searchQuery = countryList.filter((country)=> country.name.toLowerCase().includes(event.target.value.toLowerCase()) )
      setQueryList(searchQuery)
      },1000)
      return ()=> clearTimeout(delayedSearch)
    
  }
  
  
  const handleTabChange = (tab) => {
    setQueryList([])
    setSearchParams({ continent: `${tab}` });
  };   
  
  if (!params) {
    setSearchParams({ continent: "World" });
  }

  useEffect(() => {
    
    setContinent(params);
    setInput("") //clear input after making a tab change
    setQuery("") //same with query
  }, [searchParams]);


  return (
    <div className="Tabs_container">
      <Tabs
        id="Tabs"
        onChange={(tab) => handleTabChange(tab)}
        selectedTabId={params}
      >
        {continentSet.map((cont) => (
          <Tab
            key={cont}
            id={cont}
            title={cont}
          />
        ))}
        <div className="bp4-input-group" >
          <Icon icon="search" size={"15"} style={{marginTop:"5px"}} ></Icon>
          <input className="bp4-input bp4-round bp4-small" style={{"padding-left":"25px"}} type={"text"} placeholder={"Search by name..."} value={input} onChange={(event)=>handleSearch(event)}></input>
        </div>
        <Tabs.Expander />
      </Tabs>
    </div>
  );
};

export default ContinentTabs;


