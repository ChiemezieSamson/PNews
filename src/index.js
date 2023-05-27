import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider as Rrouters } from "react-router-dom";
import store from "./Reduxstore/store/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Rrouters router={App} />
		</Provider>
	</React.StrictMode>
);
