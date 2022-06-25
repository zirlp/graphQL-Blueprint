import "../App.css";
import React, { useEffect, useState } from "react";
import { client } from "../graphQL/index.js";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "../graphQL/Queries.js";
import ContinentTabs from "./Tabs.js";
import Table from "./Table.js";
// import CountryList from "./components/CountryList";

function Main() {
  // const [country, setCountry] = useState();
  const [continent, setContinent] = useState("World");
  const [continentSet, setContinentSet] = useState(["World"]);
  const [countryList, setCountryList] = useState([]);
  const [queryList, setQueryList] = useState([]);
  const [query, setQuery] = useState();
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  //i'd like to do this set of countries in another place...
  for (let i = 0; i < data?.countries.length; i++) {
    data?.countries.forEach((country) =>
      continentSet?.includes(country.continent.name)
        ? null
        : setContinentSet([...continentSet, country.continent.name])
    );
  }
  
  useEffect(() => {
    //this is for filtering
    setCountryList(
      continent !== "World"
        ? data?.countries.filter(
            (country) => country.continent.name === continent
          )
        : data?.countries
    );
  }, [continent, data?.countries,query]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
  return (
    <div>
      
      <ContinentTabs continentSet={continentSet} setContinent={setContinent} countryList={countryList} setQueryList={setQueryList} setQuery={setQuery} />

      {data ? query&&!queryList.length ? <p>"nothing found"</p> : <Table countryList={queryList.length ? queryList : countryList} /> : <p>"Loading..."</p>}
    </div>
  );
}

export default Main;
