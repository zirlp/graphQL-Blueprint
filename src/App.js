import "./App.css";
import React, { useEffect, useState } from "react";
import { client } from "./graphQL";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "./graphQL/Queries";
import ContinentTabs from "./components/Tabs";
import Table from "./components/Table";
// import CountryList from "./components/CountryList";

function App() {
  // const [country, setCountry] = useState();
  const [continent, setContinent] = useState("World");
  const [continentSet, setContinentSet] = useState(["World"]);
  const [countryList, setCountryList] = useState([]);
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  useEffect(() => {
    //this is for filtering
    setCountryList(
      continent !== "World"
        ? data?.countries.filter(
            (country) => country.continent.name === continent
          )
        : data?.countries
    );
  }, [continent, data?.countries]);

  //i'd like to do this set of countries in another place...
  for (let i = 0; i < data?.countries.length; i++) {
    data?.countries.forEach((country) =>
      continentSet?.includes(country.continent.name)
        ? null
        : setContinentSet([...continentSet, country.continent.name])
    );
  }

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
  return (
    <div>
      <ContinentTabs continentSet={continentSet} setContinent={setContinent} />

      {data ? <Table countryList={countryList} /> : <p>"Loading..."</p>}
    </div>
  );
}

export default App;
