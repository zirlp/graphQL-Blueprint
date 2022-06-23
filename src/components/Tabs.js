import { Tab, Tabs } from "@blueprintjs/core";
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
        <input type={"text"} placeholder={"Search by name..."} value={input} onChange={(event)=>handleSearch(event)}/>
        <Tabs.Expander />
      </Tabs>
    </div>
  );
};

export default ContinentTabs;


