import React from "react";
import ReactDOM from "react-dom";
import "./sass/style.scss";
import 'react-quill/dist/quill.snow.css';
import App from "./app/App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
