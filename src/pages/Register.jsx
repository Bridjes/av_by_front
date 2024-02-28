import React, {useContext, useEffect, useState} from 'react';
import MyButton from "../components/UI/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {check_auth_fetch, login_fetch, register, register_fetch} from "../store/curentUserReduser";
import {useFatching} from "../hooks/useFatching";
import MyLoader from "../components/UI/Loader/MyLoader";
import classes from "./css/Login.css";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const isAuth = useSelector(state => state.user.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // // редирект на страницу, в которую хотел попасть
    // // неавторизованный пользак при успешной авторизации
    // useEffect(()=> {
    //     const url = localStorage.getItem("link")
    //     if(isAuth) {
    //         navigate(url);
    //     }
    // }, [isAuth])

    const submitting = () => {
        dispatch(register_fetch({
            username: username,
            email: email,
            password: password,
            setIsLoading: setIsLoading
        }))
        navigate("/login")
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
                        <input onChange={e => setEmail(e.target.value)}
                           value={email}
                           type="text"
                           name="email"
                           placeholder="email..."/>
                        <input onChange={e => setPassword(e.target.value)}
                           value={password}
                           type="password"
                           name="password"
                           placeholder="Пароль..."/>
                        <button
                            onClick={submitting}
                            className="register-button"
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
            }
        </div>
    );
};

export default Login;