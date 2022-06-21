import { Tab, Tabs } from "@blueprintjs/core";

const ContinentTabs = ({ continentSet, setContinent }) => {
  return (
    <div className="Tabs_container">
      <Tabs
        id="Tabs"
        onChange={(tab) => setContinent(tab)}
        // selectedTabId="rx"
      >
        {continentSet.map((cont) => (
          <Tab key={cont} id={cont} title={cont} />
        ))}
        <Tabs.Expander />
      </Tabs>
    </div>
  );
};

export default ContinentTabs;
