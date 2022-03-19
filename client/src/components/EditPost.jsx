import { useState } from "react";
import ReactQuill from "react-quill";
import CloseIcon from "../assets/icons/CloseIcon";
import style from "../sass/components/editPost.module.scss";
import { postData, updateData } from "../utility/APICalling";
import InputForm from "./InputForm";
import PrimaryButton from "./PrimaryButton";
function EditPost({ isEditPostShow, post, setPost, setAllPost }) {
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
		setPost((prev) => ({ ...prev, post: value }));
	};
	const titleChangeHandler = (event) => {
		setPost((prev) => ({ ...prev, title: event.target.value }));
	};
	const postSubmitHandler = async () => {
		const { status } = await updateData("/posts", post);
		status && isEditPostShow(false);
		status &&
			setAllPost((prev) => {
				const index = prev.findIndex(
					({ post_id }) => post_id === post.post_id
				);
				index > -1 && (prev[index] = post);
				return [...prev];
			});
	};
	return (
		<section className={style.wrapper}>
			<div className='container'>
				<div className={style.edit__post__wrapper}>
					<span
						className={style.close__icon}
						onClick={() => isEditPostShow(false)}
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
						style={{
							marginTop: "15px",
							overflow: "scroll",
							height: "70vh"
						}}
						theme='snow'
						modules={modules}
						value={post.post}
						onChange={postChangeHandler}
					/>
					<PrimaryButton
						title='Save'
						submitHandler={postSubmitHandler}
					/>
				</div>
			</div>
		</section>
	);
}

export default EditPost;
