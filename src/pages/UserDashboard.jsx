import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {retrieve_fetch} from "../store/curentUserInfoReduser";
import classes from "./css/UserDashboard.css"
import MyLoader from "../components/UI/Loader/MyLoader";
import {Link} from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone, faCheckSquare} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faPhone, faCheckSquare)

const UserDashboard = () => {
    const dispatcher = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user_info = useSelector(state => state.user_info.user_info)
    const isAuth = useSelector(state => state.user.isAuth)

    useEffect(() => {
        dispatcher(retrieve_fetch({setIsLoading: setIsLoading}))
    }, [dispatcher,]);
    return (
        <div>
            {isLoading
                ?
                <div className="loader_box">
                    <MyLoader/>
                </div>
                :
                <div className="user_dashboard">
                    <div className="user_control">
                        <div className="user_card">
                            <img src={user_info.photo}/>
                            <div className="user_description">
                                <div className="username">
                                    {user_info.username}
                                </div>
                                <div className="contact">
                                    <div className="icon_email">
                                        <FontAwesomeIcon icon={faEnvelope}/>
                                    </div>
                                    <div className="email_value">
                                        <Link to={`mailto:${user_info.email}`}>{user_info.email}</Link>
                                    </div>
                                </div>
                                <div className="contact">
                                    <div className="icon_phone">
                                        <FontAwesomeIcon icon={faPhone}/>
                                    </div>
                                    {user_info.phone
                                        ?
                                        <div className="email_value">
                                            <Link to={`tel:+${user_info.phone}`}>+{user_info.phone}</Link>
                                        </div>
                                        :
                                        <div className="no_phone">
                                            не указан
                                        </div>
                                    }
                                </div>
                                <div className="telegram">
                                    <div className="tg_tag">telegram:</div>
                                    {user_info.is_telegram_use
                                        ?
                                        <div className="icon_ok">
                                            привязан
                                        </div>
                                        :
                                        <div className="icon_no">
                                            не привязан
                                        </div>
                                    }
                                </div>
                                {!user_info.is_telegram_use && (
                                    <div className="add_telegram">
                                        <Link to={`tg://resolve?domain=shajtanas_bot&start=${user_info.id}`}>
                                            привязать
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="user_control">

                        </div>
                    </div>
                    <div className="user_adds">

                    </div>
                </div>
            }
        </div>
    );
};

export default UserDashboard;