import React, { useState } from 'react';
import classes from "./CategoriesSubSubcategoriesDropdowns.css"

const CategoriesSubSubcategoriesDropdowns = ({ ...props }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('')

    const CategoryList = ({ categories, register, name, setValue }) => (
        <div>
            <select {...register(name)}
                    value={selectedCategory}
                    onChange={(event) => {
                        setValue(name, event.target.value)
                        setSelectedCategory(event.target.value)
                        setSelectedSubcategory('')
                        setSelectedSubSubcategory('')
                    }}
            >
                <option id="" value="">Выберите</option>
                {Object.keys(categories).sort().map((category) => (
                    <option id={category}
                            key={category}
                            value={category}
                    >
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );

    const SubcategoryList = ({ subcategories, register, name, setValue }) => (
        <div>
            <select {...register(name)}
                    value={selectedSubcategory}
                    onChange={(event) => {
                        setValue(name, event.target.value)
                        setSelectedSubcategory(event.target.value)
                    }}
            >
                <option id="" value="">Выберите</option>
                {Object.keys(subcategories).sort().map((subcategory) => (
                    <option id={subcategory}
                            key={subcategory}
                            value={subcategory}
                    >
                        {subcategory}
                    </option>
                ))}
            </select>
        </div>
    );

    const SubSubcategoryList = ({ subsubcategories, register, name, setValue }) => (
        <div>
            <select {...register(name)}
                    value={selectedSubSubcategory}
                    onChange={(event) => {
                        setValue(name, event.target.value)
                        setSelectedSubSubcategory(event.target.value)
                    }}
            >
                <option id="" value="">Выберите</option>
                {subsubcategories.sort((a, b) => b.localeCompare(a)).map((subsubcategory) => (
                    <option id={subsubcategory} key={subsubcategory} value={subsubcategory}>
                        {subsubcategory}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="categories-subcategories">
            <label htmlFor={props.name} >{props.title}</label>
            <CategoryList categories={props.categories}
                          name={props.name}
                          register={props.register}
                          setValue={props.setValue}
                          dropdown_name={props.dropdown_name}
            />
            {selectedCategory && (
                <div className="subcategories">
                    <label htmlFor={props.subname}>{props.subtitle}</label>
                    <SubcategoryList subcategories={props.categories[selectedCategory]}
                                     name={props.subname}
                                     register={props.register}
                                     setValue={props.setValue}
                                     dropdown_name={props.dropdown_subname}
                    />
                </div>
            )}
            {selectedCategory && selectedSubcategory && (
                <div className="subcategories">
                    <label htmlFor={props.subsubname}>{props.subsubtitle}</label>
                    <SubSubcategoryList subsubcategories={props.categories[selectedCategory][selectedSubcategory]}
                                        name={props.subsubname}
                                        register={props.register}
                                        setValue={props.setValue}
                                        dropdown_name={props.dropdown_subsubname}
                    />
                </div>
            )}
        </div>
    );
};

export default CategoriesSubSubcategoriesDropdowns;