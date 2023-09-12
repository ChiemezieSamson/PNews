import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider as Rrouters } from "react-router-dom";
import store from "./Reduxstore/store/store";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";
import App from "./App";

if (process.env.NODE_ENV === "production") {
	disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Rrouters router={App} />
	</Provider>
);
