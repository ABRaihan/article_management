import { useEffect, useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import LinkedIn from "../../assets/icons/LinkedIn";
import TwitterIcon from "../../assets/icons/TwitterIcon";
import YoutubeIcon from "../../assets/icons/YoutubeIcon";
import InputForm from "../../components/InputForm";
import PrimaryButton from "../../components/PrimaryButton";
import UserInfoForm from "../../components/UserInfoForm";
import style from "../../sass/pages/dashboard/profile.module.scss";
import { getData, postData } from "../../utility/APICalling";
import { YMDFormat } from "../../utility/DateFormat";
import { isValidObject } from "../../utility/ValueChecker";
function Profile() {
	const [profileInfo, setProfileInfo] = useState({});
	const [userInfo, setUserInfo] = useState({});
	const [isUserFormShow, setIsUserFormShow] = useState(false);
	const socialIcons = {
		facebook: <FacebookIcon />,
		youtube: <YoutubeIcon />,
		twitter: <TwitterIcon />,
		linkedin: <LinkedIn />
	};
	const userInfoChangeHandler = (event) => {
		if (
			["facebook", "youtube", "twitter", "linkedin"].includes(
				event.target.name
			)
		) {
			setUserInfo((prev) => ({
				...prev,
				social: {
					...prev.social,
					[event.target.name]: event.target.value
				}
			}));
		} else {
			setUserInfo((prev) => ({
				...prev,
				[event.target.name]: event.target.value
			}));
		}
	};
	const userInfoSubmitHandler = async () => {
		const id = await localStorage.getItem("user_token");
		const tempUserInfo = { ...userInfo };

		tempUserInfo.dob = YMDFormat(tempUserInfo.dob);
		const { status } = await postData("/userInfo", tempUserInfo, { id });
		if (status) {
			setProfileInfo(userInfo);
			setIsUserFormShow(false);
		}
	};
	useEffect(() => {
		(async () => {
			const id = await localStorage.getItem("user_token");
			const userData = await getData("/userInfo", { id });
			setProfileInfo(userData);
			setUserInfo(userData);
		})();
	}, []);
	return (
		<>
			<div className={style.wrapper}>
				<span
					className={style.edit__icon}
					onClick={() => setIsUserFormShow(true)}
				>
					<EditIcon />
				</span>
				<h3 className={style.user__heading}>User Info</h3>
				<div className={style.user__info__wrapper}>
					<p className={style.user__details}>
						<span className={style.user__title}>Name</span>
						<span>:</span>
						<span>{profileInfo.name || "N/A"}</span>
					</p>
					<p className={style.user__details}>
						<span className={style.user__title}>Email</span>
						<span>:</span>
						<span>{profileInfo.email || "N/A"}</span>
					</p>
					<p className={style.user__details}>
						<span className={style.user__title}>Gender</span>
						<span>:</span>
						<span>{profileInfo.gender || "N/A"}</span>
					</p>
					<p className={style.user__details}>
						<span className={style.user__title}>Date of Birth</span>
						<span>:</span>
						<span>{YMDFormat(profileInfo.dob) || "N/A"}</span>
					</p>
				</div>
				<h3 className={style.user__heading}>Social Links</h3>
				<div className={style.user__social__wrapper}>
					{isValidObject(profileInfo.social) ? (
						<ul className={style.social__link}>
							{Object.keys(profileInfo.social).map((key) => {
								if (profileInfo.social[key]) {
									return (
										<li key={Math.random()}>
											<a
												href={profileInfo.social[key]}
												target='_blank'
												rel='noreferrer'
											>
												{socialIcons[key]}
											</a>
										</li>
									);
								}
								return null;
							})}
						</ul>
					) : (
						<p className={style.no__social__link}>
							No Social Link Set Yet
						</p>
					)}
				</div>
			</div>
			{isUserFormShow && (
				<UserInfoForm isUserFormShow={setIsUserFormShow}>
					<InputForm
						type='text'
						placeholder='Name'
						name='name'
						value={userInfo.name || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<InputForm
						type='text'
						placeholder='Gender'
						name='gender'
						value={userInfo.gender || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<InputForm
						type='date'
						placeholder='Date Of Birth'
						name='dob'
						defaultValue={YMDFormat(userInfo.dob) || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<InputForm
						type='text'
						placeholder='Facebook'
						name='facebook'
						value={userInfo.social.facebook || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<InputForm
						type='text'
						placeholder='Youtube'
						name='youtube'
						value={userInfo.social.youtube || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<InputForm
						type='text'
						placeholder='Twitter'
						name='twitter'
						value={userInfo.social.twitter || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<InputForm
						type='text'
						placeholder='LinkedIn'
						name='linkedin'
						value={userInfo.social.linkedin || ""}
						onChangeHandler={userInfoChangeHandler}
					/>
					<PrimaryButton
						submitHandler={userInfoSubmitHandler}
						title='Submit'
					/>
				</UserInfoForm>
			)}
		</>
	);
}

export default Profile;
