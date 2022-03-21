import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isLoggedUser } from "../utility/AuthChecker";
import DashboardMenu from "./dashboard/DashboardMenu";
import style from "../sass/pages/dashboard.module.scss";
import Profile from "./dashboard/Profile";
import Posts from "./dashboard/Posts";
function Dashboard() {
	const navigate = useNavigate();
	const {pathname} = useLocation();
	const [loggedUser, setLoggedUser] = useState(false);
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
						<DashboardMenu />
						<div>
							{pathname === "/profile" && <Profile />}
							{pathname === "/posts" && <Posts />}
						</div>
					</div>
				</section>
			)}
		</>
	);
}

export default Dashboard;
