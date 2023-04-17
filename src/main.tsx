import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "./redux/store";
import Router from "./router";
import "./assets/css/app.css";
import firebase from "firebase/app";
import {FirebaseAuthProvider} from  "@react-firebase/auth";
const client = new ApolloClient({
  uri: "https://useful-alien-99.hasura.app/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "GsY1XnKtxlRcXWnUBTW79bwetgA97Zefd9ZGXUNcifw0IukTcXTo5oVEVe3IXbDh",
  },
  cache: new InMemoryCache(),
});
const config = {
  apiKey: "AIzaSyC3i_3rTugkLkps83CdSz0eC25VchL6bvQ",
  authDomain: "entrans-selfservice.firebaseapp.com",
  projectId: "entrans-selfservice",
  storageBucket: "entrans-selfservice.appspot.com",
  messagingSenderId: "1040776697835",
  appId: "1:1040776697835:web:00f26b0ed1e3a668142bae",
  measurementId: "G-R6B5DCL38M",
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </Provider>
    </FirebaseAuthProvider>
    <ScrollToTop />
  </BrowserRouter>
);
