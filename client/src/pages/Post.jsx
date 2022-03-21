import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData } from "../utility/APICalling";
import style from "../sass/pages/post.module.scss";
import InputForm from "../components/InputForm";
import PrimaryButton from "../components/PrimaryButton";
import { isLoggedUser } from "../utility/AuthChecker";

function Post() {
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [userComment, setUserComment] = useState({});
	const [userReact, setUserReact] = useState({});
	const { id } = useParams();
	const commentsChangeHandler = (event) => {
		setUserComment((prev) => ({
			...prev,
			[event.target.name]: event.target.value
		}));
	};
	const commentSubmitHandler = async () => {
		const logged = await isLoggedUser();
		if (logged) {
			const user_id = await localStorage.getItem("user_token");
			const commentRes = await postData("/post/comments", {
				user_id,
				post_id: id,
				comments: userComment.comments
			});
			if (commentRes.status) {
				const commentData = await getData("/post/comments", { id });
				setComments(commentData);
				setUserComment({});
			}
		} else {
			alert("Please Login For Comments");
		}
	};
	const userReactHandler = async (react) => {
		const logged = await isLoggedUser();
		if (!logged) {
			alert("Please Login For React");
			return;
		}
		const user_id = await localStorage.getItem("user_token");
		if (react === "like") {
			const response = await postData("/post/react", {
				user_id,
				post_id: id,
				likes: true,
				dislike: false
			});
			response.status && setUserReact({ likes: true, dislike: false });
		} else if (react === "dislike") {
			const response = await postData("/post/react", {
				user_id,
				post_id: id,
				likes: false,
				dislike: true
			});
			response.status && setUserReact({ likes: false, dislike: true });
		}
	};
	useEffect(() => {
		(async () => {
			const postData = await getData("/post/" + id);
			setPost(postData);
		})();
	}, [id]);
	useEffect(() => {
		(async () => {
			const commentData = await getData("/post/comments", { id });
			setComments(commentData);
		})();
	}, [id]);
	useEffect(() => {
		(async () => {
			const user_id = await localStorage.getItem("user_token");
			const reactRes = await getData("/post/react", {
				user_id,
				post_id: id
			});
			setUserReact(reactRes);
		})();
	}, [id]);
	return (
		<section className={style.wrapper}>
			<div className='container'>
				<div className={style.post_wrapper}>
					<p>{post?.title}</p>
					<div
						dangerouslySetInnerHTML={{
							__html: post?.post
						}}
					></div>
					<div className={style.post__react}>
						<div className={style.like__dislike}>
							<button
								className={`${style.like__btn} ${
									userReact?.likes ? style.react__active : ""
								}`}
								onClick={userReactHandler.bind(null, "like")}
							>
								Like
							</button>
							<button
								className={`${style.dislike__btn} ${
									userReact?.dislike
										? style.react__active
										: ""
								}`}
								onClick={userReactHandler.bind(null, "dislike")}
							>
								Dislike
							</button>
						</div>
						<div className={style.comment__box}>
							<InputForm
								placeholder='Comment'
								type='text'
								name='comments'
								value={userComment.comments || ""}
								onChangeHandler={commentsChangeHandler}
							/>
							<PrimaryButton
								title='Comment'
								submitHandler={commentSubmitHandler}
							/>
						</div>
					</div>
				</div>
				<div className={style.comments__wrapper}>
					{comments.map(({ name, comments }) => (
						<div key={Math.random()}>
							<p>{name}</p>
							<p>{comments}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Post;
