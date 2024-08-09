import React from "react";
import Navbar from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";
import Create from "./components/Create";

function App() {
	return (
		<>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Create></Create>}></Route>
				<Route path="/all" element={<Read></Read>}></Route>
				<Route path="/:id" element={<Update></Update>}></Route>
			</Routes>
		</>
	);
}

export default App;
