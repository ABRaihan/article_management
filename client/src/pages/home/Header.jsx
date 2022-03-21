import { useState } from "react";
import { Link } from "react-router-dom";
import SearchItems from "../../components/SearchItems";
import Sidebar from "../../components/Sidebar";
import style from "../../sass/pages/home/header.module.scss";
import { getData } from "../../utility/APICalling";
function Header() {
	const [isSidebarShow, setIsSideBarShow] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [posts, setPosts] = useState(false);
	const sidebarShowHandler = () => {
		setIsSideBarShow(true);
	};
	let timer = null;
	const postSearchHandler = (event) => {
		setSearchValue(event.target.value);
		clearTimeout(timer);
		if (!event.target.value) {
			setPosts(false);
			return;
		}
		timer = setTimeout(async () => {
			const searchPost = await getData(
				"/search/post/" + event.target.value
			);
			setPosts(searchPost);
		}, 250);
	};
	return (
		<>
			<header className={style.wrapper}>
				<div className='container'>
					<nav className={style.navigation__wrapper}>
						<div className={style.logo__wrapper}>
							<Link to='/'>
								<p className={style.logo}>Articles</p>
							</Link>
						</div>
						<div className={style.search__bar__wrapper}>
							<input
								className={style.search__bar}
								type='search'
								placeholder='Search...'
								value={searchValue}
								onChange={postSearchHandler}
							/>
							<SearchItems
								items={posts}
								setItems={setPosts}
								setSearchValue={setSearchValue}
							/>
						</div>
						<div
							className={style.hamburger__wrapper}
							onClick={sidebarShowHandler}
						>
							<div className={style.hamburger__icon}></div>
							<div className={style.hamburger__icon}></div>
							<div className={style.hamburger__icon}></div>
						</div>
					</nav>
				</div>
			</header>
			{isSidebarShow && <Sidebar setSidebarState={setIsSideBarShow} />}
		</>
	);
}

export default Header;
