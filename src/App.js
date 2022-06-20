import "./App.css";
import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
// import CountryList from "./components/CountryList";
import { Column, Table2, Cell } from "@blueprintjs/table";
import { Tab, Tabs } from "@blueprintjs/core";
import { LIST_CONTINENTS, LIST_COUNTRIES } from "./graphQL/Queries";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function App() {
  // const [country, setCountry] = useState();
  const [continent, setContintent] = useState();
  const [countryList, setCountryList] = useState();
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  useEffect(() => {
    setCountryList(
      data?.countries.filter((country) => country.continent.name === continent)
    );
  }, [continent, data?.countries]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }
  return (
    <div>
      <Tabs
        id="Tabs"
        onChange={(tab) => setContintent(tab)}
        // selectedTabId="rx"
      >
        {LIST_CONTINENTS.map((cont) => (
          <Tab key={cont} id={cont} title={cont} />
        ))}
        <Tabs.Expander />
      </Tabs>

      <Table2 numRows={countryList ? countryList.length : null}>
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
      </Table2>
    </div>
  );
}

export default App;
