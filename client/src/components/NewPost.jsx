import { useState } from "react";
import ReactQuill from "react-quill";
import CloseIcon from "../assets/icons/CloseIcon";
import style from "../sass/components/newPost.module.scss";
import { postData } from "../utility/APICalling";
import InputForm from "./InputForm";
import PrimaryButton from "./PrimaryButton";
function NewPost({ isNewPostShow, setAllPosts }) {
	const [post, setPost] = useState({
		title: "",
		article: ""
	});
	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" }
			],
			["link", "image"],
			["clean"]
		]
	};
	const postChangeHandler = (value) => {
		setPost((prev) => ({ ...prev, article: value }));
	};
	const titleChangeHandler = (event) => {
		setPost((prev) => ({ ...prev, title: event.target.value }));
	};
	const postSubmitHandler = async () => {
		const id = await localStorage.getItem("user_token");
		const { status, id: post_id } = await postData("/posts", {
			...post,
			id
		});
		status && isNewPostShow(false);
		status &&
			setAllPosts((prev) => [
				...prev,
				{ post_id, user_id: id, title: post.title, post: post.article }
			]);
	};
	return (
		<section className={style.wrapper}>
			<div className='container'>
				<div className={style.new__post__wrapper}>
					<span
						className={style.close__icon}
						onClick={() => isNewPostShow(false)}
					>
						<CloseIcon />
					</span>
					<InputForm
						placeholder='Post Title'
						type='text'
						name='title'
						value={post.title || ""}
						onChangeHandler={titleChangeHandler}
					/>
					<ReactQuill
						style={{ marginTop: "15px", overflow: "scroll", height: "70vh" }}
						theme='snow'
						modules={modules}
						value={post.article}
						onChange={postChangeHandler}
					/>
					<PrimaryButton
						title='Post'
						submitHandler={postSubmitHandler}
					/>
				</div>
			</div>
		</section>
	);
}

export default NewPost;
