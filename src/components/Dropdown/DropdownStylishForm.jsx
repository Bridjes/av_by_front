import React, { useState } from 'react';
import Select from "react-select";
import {SelectStyles} from "../../styles/SelectStyle";
import classes from "./DropdownStylishForm.css"

const DropdownStylishForm = ({ categories, setValue, register, name, title }) => {
    const [selectedItem, setSelectedItem] = useState('');


    const onChange = (selectedOption) => {
        const value = selectedOption === null ? "" : selectedOption.value

        // условие сброса в значение по умолчанию
        if (value !== "") {
            setSelectedItem(value)
            setValue(name, value)
        } else {
            setSelectedItem(null)
            setValue(name, null)
        }
    }

    const Options = categories.map((category) => ({
            value: category,
            label: category,
        }))
    // Options.unshift({
    //     value: "",
    //     label: "Любая"
    // })

    const getValue = (option, selectedOption) => {
        return selectedOption ? option.find((c) => c.value === selectedOption) : ""
    }

    return (
        <div className="dropdown_one_form_item">
            <div className="dropdown_item_label">{title}:</div>
            <Select {...register(name)}
                    options={Options}
                    onChange={onChange}
                    defaultValue={Options[0]}
                    value={getValue(Options, selectedItem)}
                    isClearable={true}
                    isSearchable={true}
                    isRtl={true}
                    styles={SelectStyles}
                    placeholder="поиск..."
            />
        </div>
    );
};

export default DropdownStylishForm;