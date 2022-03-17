import CloseIcon from "../assets/icons/CloseIcon";
import style from "../sass/components/userInfoForm.module.scss";
function UserInfoForm({ isUserFormShow, children }) {
	return (
		<section className={style.wrapper}>
			<div className={style.user__form__wrapper}>
				<span
					className={style.close__icon}
					onClick={() => isUserFormShow(false)}
				>
					<CloseIcon />
				</span>
				{children}
			</div>
		</section>
	);
}

export default UserInfoForm;
