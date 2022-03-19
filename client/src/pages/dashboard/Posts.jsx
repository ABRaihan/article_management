import { useEffect, useState } from "react";
import NewPost from "../../components/NewPost";
import PostCart from "../../components/PostCart";
import PrimaryButton from "../../components/PrimaryButton";
import style from "../../sass/pages/dashboard/post.module.scss";
import { deleteData, getData } from "../../utility/APICalling";
import { isValidArray } from "../../utility/ValueChecker";
function Posts() {
	const [isNewPostShow, setIsNewPostShow] = useState(false);
	const [allPosts, setAllPosts] = useState([]);
	const postDeleteHandler = async (id) => {
		const { status } = await deleteData("/posts", { id });
		status &&
			setAllPosts((prev) => {
				const index = prev.findIndex(({ post_id }) => post_id === id);
				index > -1 && prev.splice(index, 1);
				return [...prev];
			});
	};
	useEffect(() => {
		(async () => {
			const id = await localStorage.getItem("user_token");
			const postData = await getData("/posts", { id });
			console.log(postData);
			setAllPosts(postData);
		})();
	}, []);
	return (
		<section className={style.wrapper}>
			<div className='container'>
				<div className={style.top__bar}>
					<h3>Posts</h3>
					<PrimaryButton
						title='Add Post'
						submitHandler={() => setIsNewPostShow(true)}
					/>
				</div>
				{isValidArray(allPosts) ? (
					<div className={style.posts__wrapper}>
						{allPosts.map(({ post_id, title, post }) => (
							<PostCart
								key={post_id}
								title={title}
								body={post}
								toolbars={true}
								postId={post_id}
								deleteHandler={postDeleteHandler.bind(
									null,
									post_id
								)}
							/>
						))}
					</div>
				) : (
					<h4>No Posts Yet</h4>
				)}
			</div>
			{isNewPostShow && (
				<NewPost
					isNewPostShow={setIsNewPostShow}
					setAllPosts={setAllPosts}
				/>
			)}
		</section>
	);
}

export default Posts;
