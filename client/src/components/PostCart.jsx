import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";
import style from "../sass/components/postCart.module.scss";
function PostCart({
	title,
	body,
	toolbars,
	deleteHandler,
	editHandler,
	children
}) {
	return (
		<div className={style.post__cart}>
			{toolbars && (
				<div className={style.toolbars}>
					<span onClick={editHandler}>
						<EditIcon color='#000' />
					</span>
					<span onClick={deleteHandler}>
						<DeleteIcon />
					</span>
				</div>
			)}
			<div className={style.cart__header}>
				<p className={style.cart__title}>{title}</p>
			</div>
			<div
				className={style.cart__body}
				dangerouslySetInnerHTML={{ __html: body }}
			></div>
			<div className={style.cart__footer}>{children}</div>
		</div>
	);
}

export default PostCart;
