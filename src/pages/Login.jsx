import React, {useContext, useEffect, useState} from 'react';
import MyButton from "../components/UI/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {check_auth_fetch, login_fetch, register, register_fetch} from "../store/curentUserReduser";
import {useFatching} from "../hooks/useFatching";
import MyLoader from "../components/UI/Loader/MyLoader";
import classes from "./css/Login.css";
import {useLocation, useNavigate} from "react-router-dom";


const Login = ({ from }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // редиректнет на главную страницу
    useEffect(()=> {
        // const url = localStorage.getItem("link")
        if(isAuth) {
            navigate('/')
        }
    }, [isAuth,])

    const submitting = () => {
        dispatch(login_fetch({
            username: username,
            password: password,
            setIsLoading: setIsLoading
        }))
    }

    return (
        <div className="login">
            {isLoading
                ?
                <MyLoader/>
                :
                <form onSubmit={submitting}>
                    <div className="login-form">
                        <input onChange={e => setUsername(e.target.value)}
                               value={username}
                               type="text"
                               name="username"
                               placeholder="Имя пользователя..."/>
                        <input onChange={e => setPassword(e.target.value)}
                               value={password}
                               type="password"
                               name="password"
                               placeholder="Пароль..."/>
                        <button
                            onClick={submitting}
                            className="login-button"
                        >
                            Войти
                        </button>
                        <button type="submit"
                                onClick={() => navigate("/register")}
                                className="register-button"
                        >
                            Регистрация
                        </button>
                    </div>
                </form>
            }
        </div>
    );
};

export default Login;