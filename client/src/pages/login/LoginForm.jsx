import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormImage from "../../assets/images/LoginFormImage";
import InputForm from "../../components/InputForm";
import PrimaryButton from "../../components/PrimaryButton";
import style from "../../sass/pages/login/loginForm.module.scss";
import { postData } from "../../utility/APICalling";
import { isLoggedUser } from "../../utility/AuthChecker";
function LoginForm({
	title,
	loginType,
	btnTitle,
	loginStateChange,
	loginState
}) {
	const [errorState, setErrorState] = useState({
		status: false,
		msg: ""
	});
	const navigate = useNavigate();
	const [loggedUser, setLoggedUser] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const userInfoHandler = (event) => {
		setUserInfo((prev) => ({
			...prev,
			[event.target.name]: event.target.value
		}));
	};
	const errorHandler = (errorProperty) => {
		let isErrorFind = false;
		for (let field of errorProperty) {
			if (!userInfo[field]) {
				setErrorState({
					status: true,
					msg: "All Field Required"
				});
				setTimeout(() => {
					setErrorState({
						status: false,
						msg: ""
					});
				}, 1000);
				isErrorFind = true;
				return isErrorFind;
			}
		}
		if (
			userInfo.email.search(
				/[a-zA-Z0-9]+@+(?<Type1>gmail).com|\w+\d@+(?<Type2>yahoo).com/
			) < 0
		) {
			setErrorState({
				status: true,
				msg: "Email format is not valid"
			});
			setTimeout(() => {
				setErrorState({
					status: false,
					msg: ""
				});
			}, 1000);
			isErrorFind = true;
			return isErrorFind;
		}
		if (loginState === "signUp") {
			if (userInfo.password !== userInfo.confirmPassword) {
				setErrorState({
					status: true,
					msg: "Password doesn't match"
				});
				setTimeout(() => {
					setErrorState({
						status: false,
						msg: ""
					});
				}, 1000);
				isErrorFind = true;
				return isErrorFind;
			}
		}
	};
	const formSubmitHandler = async () => {
		if (loginState === "signIn") {
			if (errorHandler(["email", "password"])) return;
		}
		if (loginState === "signUp") {
			if (errorHandler(["name", "email", "password", "confirmPassword"]))
				return;
		}
		const url = loginState === "signIn" ? "/login" : "/signup";
		const response = await postData(url, userInfo);
		const { status, error } = response;
		if (!status) {
			setErrorState({
				status: true,
				msg: error
			});
			setTimeout(() => {
				setErrorState({
					status: false,
					msg: ""
				});
			}, 1000);
		}
		if (loginState === "signIn" && status) {
			localStorage.setItem("user_token", response._id);
			navigate("/dashboard");
		} else if (loginState === "signUp" && status) {
			loginStateChange("signIn");
		}
	};
	useEffect(() => {
		(async () => {
			const loggedStatus = await isLoggedUser();
			if (loggedStatus) {
				navigate("/dashboard");
			} else {
				setLoggedUser(true);
			}
		})();
	});
	return (
		<>
			{loggedUser && (
				<div className={style.wrapper}>
					<div className={style.left__col}>
						<div className={style.login__form__img__wrapper}>
							<LoginFormImage />
						</div>
						<p
							className={style.create__account__text}
							onClick={loginStateChange}
						>
							{loginType}
						</p>
					</div>
					<div className={style.right__col}>
						<p className={style.login__title}>{title}</p>
						<form className={style.login__form}>
							{loginState === "signIn" && (
								<>
									<InputForm
										type='email'
										placeholder='Email'
										name='email'
										onChangeHandler={userInfoHandler}
										value={userInfo.email || ""}
									/>
									<InputForm
										type='password'
										placeholder='Password'
										name='password'
										onChangeHandler={userInfoHandler}
										value={userInfo.password || ""}
									/>
								</>
							)}
							{loginState === "signUp" && (
								<>
									<InputForm
										type='text'
										placeholder='Name'
										name='name'
										onChangeHandler={userInfoHandler}
										value={userInfo.name || ""}
									/>
									<InputForm
										type='email'
										placeholder='Email'
										name='email'
										onChangeHandler={userInfoHandler}
										value={userInfo.email || ""}
									/>
									<InputForm
										type='password'
										placeholder='Password'
										name='password'
										onChangeHandler={userInfoHandler}
										value={userInfo.password || ""}
									/>
									<InputForm
										type='password'
										placeholder='Confirm Password'
										name='confirmPassword'
										onChangeHandler={userInfoHandler}
										value={userInfo.confirmPassword || ""}
									/>
								</>
							)}
						</form>
						{errorState.status && (
							<p className={style.error__msg}>{errorState.msg}</p>
						)}
						<div className={style.login__btn__wrapper}>
							<PrimaryButton
								title={btnTitle}
								submitHandler={formSubmitHandler}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default LoginForm;
