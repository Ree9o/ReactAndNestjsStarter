import { ApolloProvider } from "@apollo/client";
import client from "../libs/apollo.client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import { GuestRoute, PrivateRoute } from "../libs/AuthRoute";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute children={<Main />} />} />
          <Route path="/signin" element={<GuestRoute children={<SignIn />} />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
