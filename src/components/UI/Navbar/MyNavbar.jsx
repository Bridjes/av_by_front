import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from './MyNavbar.component.css'
import {useDispatch, useSelector} from "react-redux";
import {check_auth_fetch, logout_fetch} from "../../../store/curentUserReduser";
import MyLoader from "../Loader/MyLoader";
import DropdownWithLinks from "../../Dropdown/DropdownWithLinks";

// AwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignIn, faSignOut} from "@fortawesome/free-solid-svg-icons";
library.add(faSignIn)
library.add(faSignOut)

const MyNavbar = () => {
    const dispatcher = useDispatch()
    const user = useSelector(state => state.user.user)
    const isAuth = useSelector(state => state.user.isAuth)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // регулярна проверка авторизации
    useEffect(() => {
        dispatcher(check_auth_fetch({setIsLoading: setIsLoading}))

        const interval = setInterval(() => {
            dispatcher(check_auth_fetch({setIsLoading: setIsLoading}))
        }, 40 * 60 * 1000);  // интервал повторения в миллисекундах (раз в 40 минут)

        return () => {
            // для очистки интервала, чтобы функция не вызывалась
            // после того, как компонент будет удален из DOM
            clearInterval(interval);
        };
    }, []);

    return (
        <nav>
            <div className={"logo"}>
                <Link className={"logo-link"} to={"/"}>Magazon</Link>
            </div>
            <div className={"nav"}>
                <div className="nav-items">
                    <div className="nav-links">
                        <div className="nav-link">
                            <DropdownWithLinks
                                title="Транспорт"
                                links={{
                                        "Автомобили с пробегом": "/car_search",
                                        "Новые автомобили": "/",
                                        "Электромобили": "/",
                                        "Грузовой транспорт": "/",
                                        "Мототехника": "/",
                                        "Сельхозтехника": "/",
                                        "Спецтехника": "/",
                                        "Прицепы и полуприцепы": "/",
                                        "Автобусы": "/",
                                        "Водный транспорт": "/",
                                }}
                            />
                        </div>
                        <div className="nav-link">
                            <DropdownWithLinks
                                title="Запчасти и шины"
                                links={{
                                        "Шины и диски": "/",
                                        "Б/у запчасти для авто": "/",
                                        "Весь авто на запчасти": "/",
                                        "Автотовары и расходники": "/",
                                }}
                            />
                        </div>
                        <div className="nav-link">
                            <Link
                                className="nav-link-url"
                                to="/"
                            >
                                Журнал
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="nav-items">
                    <button
                        className="nav-items-button"
                        onClick={() => navigate("/submitting_an_ad")}
                    >
                        Подать объявление
                    </button>
                </div>
            </div>
            <div className={"auth"}>
                {isAuth
                    ?
                    <div className={"auth_content"}>
                        {isLoading
                            ?
                            <MyLoader/>
                            :
                            <div className="auth_container">
                                <div className="user_info"
                                     onClick={() => {
                                         navigate("/user_dashboard")
                                         // перехо на новую страницу
                                         // const url = 'user_dashboard'
                                         // const newWindow = window.open(url, '_blank');
                                         // if (newWindow) newWindow.opener = null;
                                    }}
                                >
                                    <img src={user.photo}/>
                                    <div className="username">{user.username}</div>
                                </div>
                                <div>
                                    <button className="auth_logout_button"
                                            onClick={()=>dispatcher(logout_fetch({setIsLoading: setIsLoading}))}
                                    >
                                        <FontAwesomeIcon icon={faSignOut} />
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <button className="auth_login_button"
                            onClick={() => navigate('/login')}
                    >
                        <FontAwesomeIcon icon={faSignIn} />
                    </button>
                }
            </div>
        </nav>
    );
};

export default MyNavbar;