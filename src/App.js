import React, {useState} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import DefaultRoute from "./pages/DefaulRoute";
import MyNavbar from "./components/UI/Navbar/MyNavbar";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import {useDispatch, useSelector} from "react-redux";
import SubmittingAnAd from "./pages/SubmittingAnAd";
import CarSearch from "./pages/CarSearch";
import CarView from "./pages/CarView";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import classes from "./pages/css/App.css";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    function PrivateRoute({ element: Element, isAuthenticated, ...rest }) {
        // сохраняем ссылку на желаемую страницу в память
        // localStorage для редиректа после успешной авторизации
        localStorage.setItem('link', window.location.pathname)

        return isAuthenticated ? (
          <Element {...rest} />
        ) : (
          <Navigate to="/login" replace />
        );
    }

    // чек авторизации расположен в компоненте MyNavbar

    return (
        <div className="container">
            <BrowserRouter>
                <MyNavbar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/car_search" element={<CarSearch/>}/>
                    <Route path="/car_view" element={<CarView/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/user_dashboard"
                           element={<PrivateRoute element={UserDashboard} isAuthenticated={isAuth}/>}
                    />
                    <Route
                        path="/submitting_an_ad"
                        element={<PrivateRoute element={SubmittingAnAd} isAuthenticated={isAuth}/>}
                    />
                    <Route path="*" element={<DefaultRoute/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
