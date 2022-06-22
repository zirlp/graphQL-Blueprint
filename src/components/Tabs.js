import { Tab, Tabs } from "@blueprintjs/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ContinentTabs = ({ continentSet, setContinent }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  var params = searchParams.get("continent");

  useEffect(() => {
    setContinent(params);
  }, [searchParams]);

  const handleOnChange = (tab) => {
    setSearchParams({ continent: `${tab}` });
  };

  if (!params) {
    setSearchParams({ continent: "World" });
  }
  return (
    <div className="Tabs_container">
      <Tabs
        id="Tabs"
        onChange={(tab) => handleOnChange(tab)}
        selectedTabId={params}
      >
        {continentSet.map((cont) => (
          <Tab
            key={cont}
            id={cont}
            title={cont}
            // ???
          />
        ))}
        <Tabs.Expander />
      </Tabs>
    </div>
  );
};

export default ContinentTabs;

{
  /* <Tabs id="Tabs" onChange={(tab) => setContinent(tab)}> */
}
