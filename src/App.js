import "./App.css";
import React, { useEffect, useState } from "react";
import { client } from "./graphQL";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "./graphQL/Queries";
// import CountryList from "./components/CountryList";
import ContinentTabs from "./components/Tabs";
import Table from "./components/Table2";

function App() {
  // const [country, setCountry] = useState();
  const [continent, setContinent] = useState();
  const [countryList, setCountryList] = useState();
  const [continentSet, setContinentSet] = useState([]);
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  useEffect(() => {
    setCountryList(
      data?.countries.filter((country) => country.continent.name === continent)
    );
  }, [continent, data?.countries]);

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

      <Table countryList={countryList} />
    </div>
  );
}

export default App;
