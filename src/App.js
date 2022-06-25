import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/index.js";
import {ApolloProvider} from "@apollo/client"
import { client } from "./graphQL/index.js";

function App() {
  return (
    <ApolloProvider client={client} >
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
