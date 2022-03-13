import style from "../sass/components/primaryButton.module.scss";
function PrimaryButton({ title, submitHandler }) {
	return (
		<button className={style.primary__btn} onClick={submitHandler}>
			{title}
		</button>
	);
}

export default PrimaryButton;
