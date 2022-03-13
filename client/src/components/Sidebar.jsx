import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "../assets/icons/CloseIcon";
import style from "../sass/components/sidebar.module.scss";
import { isLoggedUser } from "../utility/AuthChecker";
function Sidebar({ setSidebarState }) {
	const navigate = useNavigate();
	const sidebarMenu = [
		{ name: "Home", path: "/" },
		{ name: "Dashboard", path: "/dashboard" },
		{ name: "Login", path: "/login" }
	];
	const closeSidebarHandler = () => {
		setSidebarState(false);
	};
	const privateRouteHandler = async (path, event) => {
		const logged = await isLoggedUser();
		if (path === "/dashboard") {
			logged || navigate("/login");
		} else if (path === "/login") {
			logged && navigate("/dashboard");
		}
	};
	return (
		<aside className={style.sidebar}>
			<div className={style.close__icon__wrapper}>
				<CloseIcon handler={closeSidebarHandler} />
			</div>
			<ul className={style.side__menu}>
				{sidebarMenu.map(({ name, path }) => (
					<NavLink
						style={({ isActive }) => {
							return {
								color: isActive ? "#f79918" : "#000"
							};
						}}
						className={style.menu__item__link}
						key={Math.random()}
						to={path}
						onClick={privateRouteHandler.bind(null, path)}
					>
						{name}
					</NavLink>
				))}
			</ul>
		</aside>
	);
}

export default Sidebar;
