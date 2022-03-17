import style from "../sass/components/inputForm.module.scss";
function InputForm({ type, placeholder, value, defaultValue, name, onChangeHandler }) {
	return (
		<div className={style.wrapper}>
			<input
				className={style.input__control}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				defaultValue={defaultValue}
				onChange={onChangeHandler}
			/>
		</div>
	);
}

export default InputForm;
