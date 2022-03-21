import { Link, useNavigate } from "react-router-dom";
import style from "../../sass/pages/dashboard/dashboardMenu.module.scss";
function DashboardMenu() {
	const navigate = useNavigate();
	const menus = [
		{ name: "Profile", path: "/profile" },
		{ name: "Posts", path: "/posts" },
		{ name: "Logout", path: "logout" }
	];
	const menuStateChangeHandler = (menu) => {
		if (menu === "logout") {
			localStorage.removeItem("user_token");
			navigate("/");
			return;
		}
	};
	return (
		<ul className={style.menu__wrapper}>
			{menus.map(({ name, path }) => (
				<li
					className={style.menu__item}
					key={Math.random()}
					onClick={menuStateChangeHandler.bind(null, path)}
				>
					<Link to={path}>{name}</Link>
				</li>
			))}
		</ul>
	);
}

export default DashboardMenu;
