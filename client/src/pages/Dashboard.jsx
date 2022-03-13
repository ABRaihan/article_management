import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedUser } from "../utility/AuthChecker";
import DashboardMenu from "./dashboard/DashboardMenu";
import style from "../sass/pages/dashboard.module.scss";
import Profile from "./dashboard/Profile";
import Posts from "./dashboard/Posts";
function Dashboard() {
	const navigate = useNavigate();
	const [loggedUser, setLoggedUser] = useState(false);
	const [menuState, setMenuState] = useState("profile");
	useEffect(() => {
		(async () => {
			const loggedStatus = await isLoggedUser();
			if (!loggedStatus) {
				navigate("/login");
			} else {
				setLoggedUser(true);
			}
		})();
		return () => false;
	});
	return (
		<>
			{loggedUser && (
				<section className={style.wrapper}>
					<div className='container'>
						<DashboardMenu setMenuState={setMenuState} />
						<div>
							{menuState === "profile" && <Profile />}
							{menuState === "posts" && <Posts />}
						</div>
					</div>
				</section>
			)}
		</>
	);
}

export default Dashboard;
