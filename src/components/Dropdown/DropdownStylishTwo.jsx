import React, { useState } from 'react';
import Select from "react-select";
import {SelectStyles} from "../../styles/SelectStyle";
import classes from "./DropdownStylishTwo.css"

const DropdownStylishTwo = ({categories, setSubValue, title, subtitle}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    const [subcategories, setSubcategories] = useState([]);

    const categoryOptions = Object.keys(categories).sort().map((category) => ({
        value: category,
        label: category,
    }))

    const subcategoryOptions = subcategories.map((subcategory) => ({
        value: subcategory,
        label: subcategory,
    }))

    // зафиксировать марку авто
    const setCategory = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value

        // условие сброса в значение по умолчанию
        if (value !== "") {
            setSelectedCategory(value)
            // установили список моделей текущего бренда
            setSubcategories(categories[value])
        } else {
            setSubcategories([])
            setSelectedCategory(null)
            setSubValue(null)   // очистили список подкатегорий
        }

        // Сброс побочных параметров фильтрации
        setSubValue(null)

        // Сброс побочных выборов фильтрации
        setSelectedSubCategory(null)
    }

    // зафиксировать модель авто
    const setSubCategory = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value

        // условие на случай сброса в значение по умолчанию
        if (value !== "") {
            setSubValue(value)
            setSelectedSubCategory(value)
        } else {
            setSelectedSubCategory(null)

            setSubValue(null)
        }
    }

    // получить объект выбранного элемента
    const getValue = (option, selectedOption) => {
        return selectedOption ? option.find((c) => c.value === selectedOption) : ""
    }

    return (
        <div className="dropdown_stylish_two">
            <div className="dropdown_item">
                <div className="dropdown_item_label" >{title}</div>
                <Select options={categoryOptions}
                        onChange={setCategory}
                        defaultValue={categoryOptions[0]}
                        value={getValue(categoryOptions, selectedCategory)}
                        isClearable={true}
                        isSearchable={true}
                        isRtl={true}
                        styles={SelectStyles}
                        placeholder="поиск..."
                />
            </div>
            {selectedCategory && (
                <div className="dropdown_item">
                    <div className="dropdown_item_label">{subtitle}</div>
                    <Select options={subcategoryOptions}
                            onChange={setSubCategory}
                            defaultValue={subcategoryOptions[0]}
                            value={getValue(subcategoryOptions, selectedSubCategory)}
                            isClearable={true}
                            isSearchable={true}
                            isRtl={true}
                            styles={SelectStyles}
                            placeholder="поиск..."
                            // isDisabled={!selectedBrand}
                            // placeholder={selectedBrand ? "поиск..." : "---"}
                    />
                </div>
            )}
        </div>
    );
};

export default DropdownStylishTwo;