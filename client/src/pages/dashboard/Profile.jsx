import style from "../../sass/pages/dashboard/profile.module.scss";
function Profile() {
  return (
      <div className={style.wrapper}>
          <p className={style.user__details}><span className={style.user__title}>Name:</span> <span>A. B. Raihan</span></p>
          <p className={style.user__details}><span className={style.user__title}>Email:</span> <span>abraihan7244@gmail.com</span></p>
          <p className={style.user__details}><span className={style.user__title}>Gender:</span> <span>A. B. Raihan</span></p>
          <p className={style.user__details}><span className={style.user__title}>Date of Birth:</span> <span>A. B. Raihan</span></p>
    </div>
  )
};

export default Profile;