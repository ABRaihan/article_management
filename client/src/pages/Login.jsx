import { useEffect, useState } from "react";
import LoginForm from "./login/LoginForm";
import style from "../sass/pages/login.module.scss";
function Login() {
	const [loginState, setLoginState] = useState("signIn");

	const loginSateChangeHandler = () => {
		setLoginState((prev) => {
			if (prev === "signIn") return "signUp"
			if (prev === "signUp") return "signIn";
		});
	};
	useEffect(() => {
		return () => false;
	})
	return (
		<section>
			<div className='container'>
				<div className={style.wrapper}>
					{loginState === "signIn" && (
						<LoginForm
							title='Sign In'
							loginType='Create an account'
							btnTitle='Login'
							loginStateChange={loginSateChangeHandler}
							loginState={loginState}
						/>
					)}
					{loginState === "signUp" && (
						<LoginForm
							title='Sign Up'
							loginType='Already A Member'
							btnTitle='Register'
							loginState={loginState}
							loginStateChange={loginSateChangeHandler}
						/>
					)}
				</div>
			</div>
		</section>
	);
}

export default Login;
