import { Column, Table2, Cell } from "@blueprintjs/table";

const Table = ({ countryList }) => {
  return (
    <div>
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
};

export default Table;
