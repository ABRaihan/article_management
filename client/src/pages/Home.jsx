import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCart from "../components/PostCart";
import style from "../sass/pages/home.module.scss";
import { getData } from "../utility/APICalling";
import { isValidArray } from "../utility/ValueChecker";
function Home() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		(async () => {
			const postsData = await getData("/posts");
			setPosts(postsData);
		})();
	}, []);
	return (
		<section className={style.wrapper}>
			<div className='container'>
				<div className={style.post__wrapper}>
					{isValidArray(posts) &&
						posts.map(({ post_id, name, title, post }) => (
							<PostCart
								key={post_id}
								title={title}
								body={post}
								toolbars={false}
							>
								<p className={style.author}>Author: {name}</p>
								<Link to={"/post/" + post_id}>
									<button className={style.read__more__btn}>
										Read More
									</button>
								</Link>
							</PostCart>
						))}
				</div>
			</div>
		</section>
	);
}

export default Home;
