import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {load_car_pk_fetch} from "../store/carReduser";
import MyLoader from "../components/UI/Loader/MyLoader";

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

import classes from "./css/CarView.css"
import MyButton from "../components/UI/Button/MyButton";

const CarView = () => {

    // проброс id в адресной строке
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    const dispatcher = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const car = useSelector(state => state.cars.current_car)

    useEffect(()=> {
        dispatcher(load_car_pk_fetch({pk:id, setIsLoading: setIsLoading}))
    }, [dispatcher,])

    const getPhotos = () => {
        console.log(car.photo_1)
        return [
            {src: car.photo_1},
            {src: car.photo_2},
            {src: car.photo_3},
            {src: car.photo_4},
            {src: car.photo_5},
        ]
    }

    // пробег есть не у всех
    const mileage = ""
    try {
        const mileage = `${car.mileage.toLocaleString('ru-RU')} км`
    } catch {
        console.log()
    }

    return (
        <div className="car_view">
            {isLoading
                ?
                <div className="loader_box">
                    <MyLoader/>
                </div>
                :
                <div className="info">
                    <div className="car_title">
                        Продажа {car.brand} {car.model} {car.year} г. в г. {car.city}
                    </div>
                    <div className="car_chars">
                        <div className="photos">
                            <Carousel images={getPhotos()} style={{ height: "100%", width: "100%"}} />
                        </div>
                        <div className="characteristics">
                            <div className="price">
                                {car.price} $
                            </div>
                            <div className="tth">
                                <div className="prgf">
                                    {car.year} г., {car.transmission}, {car.engine_volume} л, {car.engine_type}, {mileage}
                                </div>
                                <div className="prgf">
                                    {car.body_type}, {car.drive_unit}, {car.color}
                                </div>
                                <div className="prgf">
                                    {car.interior_material} ({car.interior_color} цвет)
                                </div>
                            </div>
                            <div className="contact">
                                <div className="contact_city">
                                    {car.city}
                                </div>
                                <MyButton>Написать продавцу</MyButton>
                            </div>
                        </div>
                    </div>
                    <div className="advanced_info">
                        <div className="advanced_info_title">
                            Описание
                        </div>
                        <div className="description">
                            {car.description}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CarView;