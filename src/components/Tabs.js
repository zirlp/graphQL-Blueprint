import { Tab, Tabs } from "@blueprintjs/core";
import { Link, useNavigate, useParams } from "react-router-dom";

const ContinentTabs = ({ continentSet, setContinent }) => {
  const { tab } = useParams();
  const navigate = useNavigate();

  // const clickHandler = () => {
  //   // navigate("/")
  //   console.log("hola")
  // }

  return (
    <div className="Tabs_container">
      <Tabs id="Tabs" onChange={(tab) => setContinent(tab)}>
        {continentSet.map((cont) => (
          <Tab
            key={cont}
            id={cont}
            title={cont}
            onChange={(event) => navigate("/cont")} // ???
          />
        ))}
        <Tabs.Expander />
      </Tabs>
    </div>
  );
};

export default ContinentTabs;
