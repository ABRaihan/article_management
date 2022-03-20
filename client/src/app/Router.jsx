import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Header from "../pages/home/Header";
import Login from "../pages/Login";
import Post from "../pages/Post";
function Router() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/dashboard' element={<Dashboard />} />
				<Route exact path='/post/:id' element={<Post />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
