import React, {useState} from 'react';
import {categories} from "../utils/categories";
import CarCreate from "../components/Form/CarCreate";
import classes from "./css/SubmittingAnAd.component.css";
import DropdownStylishTwo from "../components/Dropdown/DropdownStylishTwo";

const SubmittingAnAd = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory('');
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };

    const renderSubcategories = () => {
        if (selectedCategory) {
            return categories[selectedCategory].map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                    {subcategory}
                </option>
            ));
        }
        return null;
    };

    const renderForm = () => {
        switch (selectedSubcategory) {
            case "Легковой автомобиль":
                return <CarCreate/>
            default:
                return null
        }
    };

    return (
        <div className="submittinf_an_ad">
            <div className="categs-creating">
                <DropdownStylishTwo categories={categories}
                                    setSubValue={setSelectedSubcategory}
                                    title="Категория"
                                    subtitle="Подкатегория"/>
            </div>

            {renderForm()}
        </div>
    );
};

export default SubmittingAnAd;