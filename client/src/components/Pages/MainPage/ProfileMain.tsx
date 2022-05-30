import React from "react";
import style from "./ProfileMain.module.scss";

export const ProfileMain: React.FC = (): JSX.Element => {
    return (
        <div className={style.wrapper}>
            <h1 className={style.profile_main_title}>Belarty Frontend</h1>
            <h2 className={style.profile_frontend_blog_title}>
                Блог фронтенд-разработчика
            </h2>
            <img
                className={style.profile_main_image}
                src="assets/img/blog_photo.jpg"
            />
            <h3 className={style.profile_about_title}>Обо мне</h3>
            <br />
            <h2 className={style.profile_about_me}>
                2 года опыта. Проекты на фрилансе, работа в дизайн-студии.
                <br />
                Знание английского - чтение технической документации. <br />
                <br />
            </h2>
            <i>
                <strong> О навыках во фронтенде на Github!</strong>
            </i>
            <h2 className={style.profile_about_me}>
                <br />
                Хочу поработать в большой команде с несколькими frontend
                разработчиками.
                <br />
            </h2>
            <br />
            <strong>Мои резюме:</strong>
            <div className="social_media_wrapper">
                <a href="https://career.habr.com/belarty">
                    <img
                        src="assets/img/habr_logo.png"
                        width="60"
                        height="50"
                        alt="Habr"
                    />
                </a>
                <a href="https://hh.ru/resume/063971beff091387e20039ed1f6e5256523647">
                    <img
                        src="assets/img/hh_logo.png"
                        width="60"
                        height="45"
                        alt="HeadHunter"
                    />
                </a>
                <a href="https://github.com/klimhammet62">
                    <img
                        className={style.github_logo}
                        src="assets/img/github_logo.png"
                        width="100"
                        height="70"
                        alt="GitHub"
                    />
                </a>
            </div>
        </div>
    );
};
