import React, {Suspense, useEffect, useMemo, useState} from 'react';
import { useSelector } from 'react-redux';
import {car_brand_model_year, car_year, car_body_type} from "../../utils/cars";
import CategoriesDropdown from "../Dropdown/CategoriesDropdown";
import DropdownFiltering from "../Dropdown/DropdownFiltering";
import FilterPanelWithSubcats from "../Dropdown/FilterPanelWithSubcats";
import MyButton from "../UI/Button/MyButton";
import {load_car_fetch} from "../../store/carReduser";
import Card from "../UI/Card/Card";
import classes from "./CarSearchFlter.css"
import MyLoader from "../UI/Loader/MyLoader";

// AwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRemove} from "@fortawesome/free-solid-svg-icons";
library.add(faRemove)

const CarSearchFilter = ({carData}) => {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedYearStart, setSelectedYearStart] = useState(null);
    const [selectedYearEnd, setSelectedYearEnd] = useState(null);

    const [selectedBrand2, setSelectedBrand2] = useState(null);
    const [selectedModel2, setSelectedModel2] = useState(null);
    const [selectedYearStart2, setSelectedYearStart2] = useState(null);
    const [selectedYearEnd2, setSelectedYearEnd2] = useState(null);

    const [selectedBrand3, setSelectedBrand3] = useState(null);
    const [selectedModel3, setSelectedModel3] = useState(null);
    const [selectedYearStart3, setSelectedYearStart3] = useState(null);
    const [selectedYearEnd3, setSelectedYearEnd3] = useState(null);

    const [selectedBrand4, setSelectedBrand4] = useState(null);
    const [selectedModel4, setSelectedModel4] = useState(null);
    const [selectedYearStart4, setSelectedYearStart4] = useState(null);
    const [selectedYearEnd4, setSelectedYearEnd4] = useState(null);

    const [selectedBrand5, setSelectedBrand5] = useState(null);
    const [selectedModel5, setSelectedModel5] = useState(null);
    const [selectedYearStart5, setSelectedYearStart5] = useState(null);
    const [selectedYearEnd5, setSelectedYearEnd5] = useState(null);

    const [selectedBodyType, setSelectedBodyType] = useState(null);
    const [selectedTransmission, setSelectedTransmission] = useState(null);
    const [selectedEngineType, setSelectedEngineType] = useState(null);
    const [selectedDriveUnit, setSelectedDriveUnit] = useState(null);
    const [selectedEngineVolume, setSelectedEngineVolume] = useState(null);

    // значение ключа для <div> (его изменение поможет принудительно всё перерендерить)
    const [resetKey, setResetKey] = useState(0);

    // вывод количества записей
    function getWordForm(number) {
        if (number % 10 === 1 && number % 100 !== 11) {
            return 'объявление';
        } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
            return 'объявления';
        } else {
            return 'объявлений';
        }
    }

    // фильтрация записей по выбранным параметрам
    const filteredCars = carData.filter((car) => {
        const filter1 = (!selectedBrand || car.brand === selectedBrand) &&
                      (!selectedModel || car.model === selectedModel) &&
                      (!selectedYearStart || car.year >= selectedYearStart) &&
                      (!selectedYearEnd || car.year <= selectedYearEnd);

        const filter2 = (car.brand === selectedBrand2) &&
                      (!selectedModel2 || car.model === selectedModel2) &&
                      (!selectedYearStart2 || car.year >= selectedYearStart2) &&
                      (!selectedYearEnd2 || car.year <= selectedYearEnd2);

        const filter3 = (car.brand === selectedBrand3) &&
                      (!selectedModel3 || car.model === selectedModel3) &&
                      (!selectedYearStart3 || car.year >= selectedYearStart3) &&
                      (!selectedYearEnd3 || car.year <= selectedYearEnd3);

        const filter4 = (car.brand === selectedBrand4) &&
                      (!selectedModel4 || car.model === selectedModel4) &&
                      (!selectedYearStart4 || car.year >= selectedYearStart4) &&
                      (!selectedYearEnd4 || car.year <= selectedYearEnd4);

        const filter5 = (car.brand === selectedBrand5) &&
                      (!selectedModel5 || car.model === selectedModel5) &&
                      (!selectedYearStart5 || car.year >= selectedYearStart5) &&
                      (!selectedYearEnd5 || car.year <= selectedYearEnd5);

        return filter1 || filter2 || filter3 || filter4 || filter5;
    })

    // дополнительные панели поиска
    const [showFilterPanel2, setShowFilterPanel2] = useState(false)
    const [showFilterPanel3, setShowFilterPanel3] = useState(false)
    const [showFilterPanel4, setShowFilterPanel4] = useState(false)
    const [showFilterPanel5, setShowFilterPanel5] = useState(false)

    // Загружаем компонент карточки списка объявлений лениво
    const CardLazyComponent = React.lazy(() =>
        import('../UI/Card/Card').then(module => ({ default: (props) => <Card {...props} /> }))
    );

    // ******* Пагинация *******
    const [currentPage, setCurrentPage] = useState(1);  // текущая страница
    const carsPerPage = 25; // максимальное число карточек на страниц
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);    // список карточек авто текущей страницы
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);    // всего страниц
    // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const pageNumbersBefore = []    // номера страниц до текущей
    const pageNumbersAfter = []     // номера страниц после текущей
    // Список страниц до текущей
    for (let i = currentPage - 5; i < currentPage; i++) {
        if (i > 0) {
            pageNumbersBefore.push(i)
        }
    }
    // Список страниц после текущей
    for (let i = currentPage + 1; i <= totalPages && i <= currentPage + 5; i++) {
        if (i <= totalPages) {
            pageNumbersAfter.push(i)
        }
    }
    // Самая первая страница если её нет в списке
    const firsPage = !pageNumbersBefore.includes(1) &&  currentPage !== 1 ? 1 : null
    // Самая последняя страница если её нет в списке
    const lastPage = !pageNumbersAfter.includes(totalPages) && currentPage !== totalPages && totalPages !==0
        ? totalPages : null

    // обнуляем пагинацию в случае изменения параметров фильтрации
    useEffect(()=> {
        setCurrentPage(1)
    }, [
        selectedBrand,
        selectedModel,
        selectedYearStart,
        selectedYearEnd,

        selectedBrand2,
        selectedModel2,
        selectedYearStart2,
        selectedYearEnd2,

        selectedBrand3,
        selectedModel3,
        selectedYearStart3,
        selectedYearEnd3,

        selectedBrand4,
        selectedModel4,
        selectedYearStart4,
        selectedYearEnd4,

        selectedBrand5,
        selectedModel5,
        selectedYearStart5,
        selectedYearEnd5,

        selectedBodyType,
        selectedTransmission,
        selectedEngineType,
        selectedDriveUnit,
        selectedEngineVolume,
    ])
    // ******* *******

    // сброс всех инпутов в стоковое значение
    const ResetInputs = () => {
        setSelectedBrand(null)
        setSelectedModel(null)
        setSelectedYearStart(null);
        setSelectedYearEnd(null);

        setShowFilterPanel2(false)  // скрыть панель поиска

        setSelectedBrand2(null)
        setSelectedModel2(null)
        setSelectedYearStart2(null);
        setSelectedYearEnd2(null);

        setShowFilterPanel3(false)  // скрыть панель поиска

        setSelectedBrand3(null)
        setSelectedModel3(null)
        setSelectedYearStart3(null);
        setSelectedYearEnd3(null);

        setShowFilterPanel4(false)  // скрыть панель поиска

        setSelectedBrand4(null)
        setSelectedModel4(null)
        setSelectedYearStart4(null);
        setSelectedYearEnd4(null);

        setShowFilterPanel5(false)  // скрыть панель поиска

        setSelectedBrand5(null)
        setSelectedModel5(null)
        setSelectedYearStart5(null);
        setSelectedYearEnd5(null);

        setSelectedBodyType(null)
        setSelectedTransmission(null)
        setSelectedDriveUnit(null)
        setSelectedEngineType(null)
        setSelectedEngineVolume(null)

        setCurrentPage(1)   // сброс текущей странице в 1

        // изменением значения ключа заставим всё перерендериться
        setResetKey(resetKey+1)
    }

    return (
        <div key={resetKey}>
            <div className="cars_filter_roof">
                <div className="cars_params_title">
                    Поиск по параметрам
                </div>
                <div className="add_brand_box">
                {!showFilterPanel5 && (
                    <button className="filter_add_brand"
                            onClick={()=> {
                                // if (selectedBrand) setShowFilterPanel2(true)
                                // if (selectedBrand2 && showFilterPanel2) setShowFilterPanel3(true)
                                // if (selectedBrand3 && showFilterPanel3) setShowFilterPanel4(true)
                                // if (selectedBrand4 && showFilterPanel4) setShowFilterPanel5(true)

                                setShowFilterPanel2(true)
                                if (showFilterPanel2) setShowFilterPanel3(true)
                                if (showFilterPanel3) setShowFilterPanel4(true)
                                if (showFilterPanel4) setShowFilterPanel5(true)
                            }}
                    >
                        + Марка
                    </button>
                )}
            </div>
        </div>
        <div className="cars_filter_panel">
            <div className="cars_flter_1">
                <FilterPanelWithSubcats categories={car_brand_model_year}
                                        setBrandValue={(value) => setSelectedBrand(value)}
                                        setModelValue={(value) => setSelectedModel(value)}
                                        setStartYearValue={(value) => setSelectedYearStart(value)}
                                        setEndYearValue={(value) => setSelectedYearEnd(value)}
                />
            </div>

            {showFilterPanel2 && (
                <div className="cars_flter_1">
                    <FilterPanelWithSubcats categories={car_brand_model_year}
                                            setBrandValue={(value) => setSelectedBrand2(value)}
                                            setModelValue={(value) => setSelectedModel2(value)}
                                            setStartYearValue={(value) => setSelectedYearStart2(value)}
                                            setEndYearValue={(value) => setSelectedYearEnd2(value)}
                    />
                    <div className="cars_flter_del">
                        <button className="cars_flter_del_button"
                                onClick={()=> {
                                    setShowFilterPanel2(false)
                                    setSelectedBrand2(null)
                                    setSelectedModel2(null)
                                    setSelectedYearStart2(null);
                                    setSelectedYearEnd2(null);
                                }}
                        >
                            <FontAwesomeIcon icon={faRemove} />
                        </button>
                    </div>
                </div>
            )}

            {showFilterPanel3 && (
                <div className="cars_flter_1">
                    <FilterPanelWithSubcats categories={car_brand_model_year}
                                            setBrandValue={(value) => setSelectedBrand3(value)}
                                            setModelValue={(value) => setSelectedModel3(value)}
                                            setStartYearValue={(value) => setSelectedYearStart3(value)}
                                            setEndYearValue={(value) => setSelectedYearEnd3(value)}
                    />
                    <div className="cars_flter_del">
                        <button className="cars_flter_del_button"
                                onClick={()=> {
                                    setShowFilterPanel3(false)
                                    setSelectedBrand3(null)
                                    setSelectedModel3(null)
                                    setSelectedYearStart3(null);
                                    setSelectedYearEnd3(null);
                                }}
                        >
                            <FontAwesomeIcon icon={faRemove} />
                        </button>
                    </div>
                </div>
            )}

            {showFilterPanel4 && (
                <div className="cars_flter_1">
                    <FilterPanelWithSubcats categories={car_brand_model_year}
                                            setBrandValue={(value) => setSelectedBrand4(value)}
                                            setModelValue={(value) => setSelectedModel4(value)}
                                            setStartYearValue={(value) => setSelectedYearStart4(value)}
                                            setEndYearValue={(value) => setSelectedYearEnd4(value)}
                    />
                    <div className="cars_flter_del">
                        <button className="cars_flter_del_button"
                                onClick={()=> {
                                    setShowFilterPanel4(false)
                                    setSelectedBrand4(null)
                                    setSelectedModel4(null)
                                    setSelectedYearStart4(null);
                                    setSelectedYearEnd4(null);
                                }}
                        >
                            <FontAwesomeIcon icon={faRemove} />
                        </button>
                    </div>
                </div>
            )}

            {showFilterPanel5 && (
                <div className="cars_flter_1">
                    <FilterPanelWithSubcats categories={car_brand_model_year}
                                            setBrandValue={(value) => setSelectedBrand5(value)}
                                            setModelValue={(value) => setSelectedModel5(value)}
                                            setStartYearValue={(value) => setSelectedYearStart5(value)}
                                            setEndYearValue={(value) => setSelectedYearEnd5(value)}
                    />
                    <div className="cars_flter_del">
                        <button className="cars_flter_del_button"
                                onClick={()=> {
                                    setShowFilterPanel5(false)
                                    setSelectedBrand5(null)
                                    setSelectedModel5(null)
                                    setSelectedYearStart5(null);
                                    setSelectedYearEnd5(null);
                                }}
                        >
                            <FontAwesomeIcon icon={faRemove} />
                        </button>
                    </div>
                </div>
            )}

            {/*<DropdownFiltering options={car_body_type}*/}
            {/*                   onSelectChange={(value) => setSelectedBodyType(value)}*/}
            {/*                   value={selectedBodyType}*/}
            {/*/>*/}
            <div className="all_params">
                <button>
                    Все параметры
                </button>
                <button onClick={() => ResetInputs()}>
                    Сброс параметров
                </button>
            </div>
        </div>
        <div className="cars_ads">

            {/****** Количество карточек ******/}
            <div className="cars_count">
                Найдено {filteredCars.length} {getWordForm(filteredCars.length)}
            </div>

            {/****** Вывод карточек ******/}
            <div className="cars_cards">
                <Suspense fallback={<MyLoader/>}>
                    {currentCars.map((car) => (
                        <CardLazyComponent item={car} key={car.id}/>
                    ))}
                </Suspense>
            </div>

            {/****** Пагинация ******/}
            <div className="cars_pages">
                {firsPage && (
                    <span className="cars_pages_first">
                        <button key={firsPage} onClick={() => setCurrentPage(firsPage)}>
                            <div className="button_name">
                                {firsPage}
                            </div>
                        </button>
                        <div className="button_space">
                            <div className="dotes">
                                ...
                            </div>
                        </div>
                    </span>
                )}
                <span className="cars_pages_before">
                    {pageNumbersBefore.map((number) => (
                        <button key={number}
                                onClick={() => setCurrentPage(number)}
                        >
                            <div className="button_name">
                                {number}
                            </div>
                        </button>
                        ))}
                </span>
                <span className="cars_pages_current">{currentPage}</span>
                <span className="cars_pages_after">
                    {pageNumbersAfter.map((number) => (
                        <button key={number} onClick={() => setCurrentPage(number)}>
                            <div className="button_name">
                                {number}
                            </div>
                        </button>
                    ))}
                </span>
                {lastPage && (
                    <span className="cars_pages_first">
                        <div className="button_space">
                            <div className="dotes">
                                ...
                            </div>
                        </div>
                        <button key={lastPage} onClick={() => setCurrentPage(lastPage)}>
                            <div className="button_name">
                                {lastPage}
                            </div>
                        </button>
                    </span>
                )}
            </div>
        </div>
    </div>
    );
};


export default CarSearchFilter;
