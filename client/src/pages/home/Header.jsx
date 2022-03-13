import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import style from "../../sass/pages/home/header.module.scss";
function Header() {
	const [isSidebarShow, setIsSideBarShow] = useState(false);
	const sidebarShowHandler = () => {
		setIsSideBarShow(true);
	};
	return (
		<>
			<header className={style.wrapper}>
				<div className='container'>
					<nav className={style.navigation__wrapper}>
						<div className={style.logo__wrapper}>
							<Link to="/">
								<p className={style.logo}>Articles</p>
							</Link>
							<div
								className={style.hamburger__wrapper}
								onClick={sidebarShowHandler}
							>
								<div className={style.hamburger__icon}></div>
								<div className={style.hamburger__icon}></div>
								<div className={style.hamburger__icon}></div>
							</div>
						</div>
						<div className={style.search__bar__wrapper}>
							<input
								className={style.search__bar}
								type='search'
								placeholder='Search...'
							/>
						</div>
					</nav>
				</div>
			</header>
			{isSidebarShow && <Sidebar setSidebarState={setIsSideBarShow} />}
		</>
	);
}

export default Header;
