import React, {useEffect, useState} from 'react';
import {check_auth_fetch} from "../store/curentUserReduser";
import {useDispatch, useSelector} from "react-redux";
import {load_car_fetch} from "../store/carReduser";
import MyLoader from "../components/UI/Loader/MyLoader";
import CarSearchFilter from "../components/Serch/CarSearchFilter";
import classes from "./css/CarSearch.css";

const CarSearch = () => {
    const dispatcher = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const cars = useSelector(state => state.cars.cars)

    useEffect(()=> {
        dispatcher(load_car_fetch({setIsLoading: setIsLoading}))
    }, [dispatcher,])

    return (
        <div className="car_search_block">
            {isLoading
                ?
                <div className="loader_box">
                    <MyLoader/>
                </div>
                :
                <CarSearchFilter carData={cars}/>
            }
        </div>
    );
};

export default CarSearch;