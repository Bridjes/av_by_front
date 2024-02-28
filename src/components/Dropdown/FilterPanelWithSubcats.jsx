import React, {useState} from 'react';
import Select from 'react-select';
import classes from "./FilterPanelWthSubcats.css";
import {SelectStyles} from "../../styles/SelectStyle";

const FilterPanelWithSubcats = ({ ...props }) => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYearStart, setSelectedYearStart] = useState('');
    const [selectedYearEnd, setSelectedYearEnd] = useState('');

    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);

    const brandOptions = Object.keys(props.categories).sort().map((category) => ({
            value: category,
            label: category,
        }))
    brandOptions.unshift({
        value: "",
        label: "Любая"
    })

    const modelOptions = Object.keys(models).sort().map((subcategory) => ({
            value: subcategory,
            label: subcategory,
        }))
    modelOptions.unshift({
        value: "",
        label: "Любая"
    })

    const yearOptions = years.sort((a, b) =>
        b.localeCompare(a)).map((subcategory) => ({
            value: subcategory,
            label: subcategory,
        }));
    yearOptions.unshift({
        value: "",
        label: "Любой"
    })

    // зафиксировать марку авто
    const setBrand = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value

        // условие сброса в значение по умолчанию
        if (value !== "") {
            props.setBrandValue(value)
            setSelectedBrand(value)
            // установили список моделей текущего бренда
            setModels(props.categories[value])
        } else {
            props.setBrandValue(null)
            setSelectedBrand(null)
            setModels([])   // очистили список моделей текущего бренда
            setYears([])    // очистили список годов выпуска
        }

        // Сброс побочных параметров фильтрации
        props.setModelValue(null)
        props.setStartYearValue(null)
        props.setEndYearValue(null)

        // Сброс побочных выборов фильтрации
        setSelectedModel(null)
        setSelectedYearStart(null)
        setSelectedYearEnd(null)
    }

    // зафиксировать модель авто
    const setModel = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value

        // условие на случай сброса в значение по умолчанию
        if (value !== "") {
            props.setModelValue(value)
            setSelectedModel(value)

            // временно выбираем наименьший и наибольший годы
            const minY = props.categories[selectedBrand][value].map(Number).reduce((x, y) => Math.min(x, y))
            const maxY = props.categories[selectedBrand][value].map(Number).reduce((x, y) => Math.max(x, y))

            // Установка параметров фильтрации в значения (годов от и до) по умолчанию
            props.setStartYearValue(minY)
            props.setEndYearValue(maxY)
            // установили список годов выпуска текущей модели
            setYears(props.categories[selectedBrand][value])
        } else {
            setSelectedModel(null)

            props.setModelValue(null)
            props.setStartYearValue(null)
            props.setEndYearValue(null)
            // очистили список годов
            setYears([])
        }
    }

    // зафиксировать минимальный год
    const setStartYear = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value
        props.setStartYearValue(value)
        setSelectedYearStart(value)
    }

    // зафиксировать максимальный год
    const setEndYear = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value
        props.setEndYearValue(value)
        setSelectedYearEnd(value)
    }

    // получить объект выбранного элемента
    const getValue = (option, selectedOption) => {
        return selectedOption ? option.find((c) => c.value === selectedOption) : ""
    }

    return (
        <div className="dropdown_with_subcats">
            <div className="dropdown_item">
                <div className="dropdown_item_label" >Марка:</div>
                <Select options={brandOptions}
                        onChange={setBrand}
                        defaultValue={brandOptions[0]}
                        value={getValue(brandOptions, selectedBrand)}
                        isClearable={true}
                        isSearchable={true}
                        isRtl={true}
                        styles={SelectStyles}
                        placeholder="поиск..."
                />
            </div>
            {/*{selectedBrand && (*/}
            <div className="dropdown_item">
                <div className="dropdown_item_label">Модель:</div>
                <Select options={modelOptions}
                        onChange={setModel}
                        defaultValue={modelOptions[0]}
                        value={getValue(modelOptions, selectedModel)}
                        isClearable={true}
                        isSearchable={true}
                        isRtl={true}
                        styles={SelectStyles}
                        isDisabled={!selectedBrand}
                        placeholder={selectedBrand ? "поиск..." : "---"}
                />
            </div>
            {/*)}*/}
            {/*{selectedModel && (*/}
            <div className="dropdown_item">
                <div className="dropdown_item_label">Год от:</div>
                <Select options={yearOptions}
                        onChange={setStartYear}
                        defaultValue={yearOptions[0]}
                        value={getValue(yearOptions, selectedYearStart)}
                        isClearable={true}
                        isSearchable={true}
                        isRtl={true}
                        styles={SelectStyles}
                        isDisabled={!selectedModel}
                        placeholder={selectedModel ? "поиск..." : "---"}
                />
            </div>
            {/*)}*/}
            {/*{selectedModel && (*/}
            <div className="dropdown_item">
                <div className="dropdown_item_label">до:</div>
                <Select options={yearOptions}
                        onChange={setEndYear}
                        defaultValue={yearOptions[0]}
                        value={getValue(yearOptions, selectedYearEnd)}
                        isClearable={true}
                        isSearchable={true}
                        isRtl={true}
                        styles={SelectStyles}
                        isDisabled={!selectedModel}
                        placeholder={selectedModel ? "поиск..." : "---"}
                />
            </div>
            {/*)}*/}
        </div>
    );
};

export default FilterPanelWithSubcats;