import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import MyButton from "../components/UI/Button/MyButton";
import CategoriesSubcategories from "../components/UI/Button/CategoriesSubcategories";
import {categories} from "../utils/categories";
import {load_car_fetch} from "../store/carReduser";
import CarSearch from "./CarSearch";

const MainPage = () => {
    const dispatch = useDispatch()
    const cars = useSelector(state => state.cars.cars)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState()

    return (
        <div>
            <CarSearch/>
        </div>
    );
};

export default MainPage;