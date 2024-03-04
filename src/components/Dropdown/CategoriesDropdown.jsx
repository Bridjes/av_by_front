import React, { useState } from 'react';
import Select from "react-select";
import {SelectStyles} from "../../styles/SelectStyle";

function CategoriesDropdown({ categories, setValue, register, name, className }) {
    const [selectedItem, setSelectedItem] = useState('');

    const onChange = (event) => {
        setSelectedItem(event.target.value)
        setValue(name, event.target.value)
    }

    return (
        <select {...register(name)}
                value={selectedItem}
                onChange={onChange}
                className={className}
        >
            {categories.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}

export default CategoriesDropdown;