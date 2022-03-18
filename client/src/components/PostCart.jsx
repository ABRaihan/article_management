import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";
import style from "../sass/components/postCart.module.scss";
function PostCart({ title, body, toolbars, children }) {
	return (
		<div className={style.post__cart}>
			{toolbars && (
				<div className={style.toolbars}>
					<span>
						<EditIcon color='#000' />
					</span>
					<span>
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