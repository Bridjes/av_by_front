import React, {useState} from 'react';

const DropdownFiltering = ({ options, onSelectChange, value}) => {
    const [val, setVal] = useState(value)

    return (
        <select onChange={(e) => onSelectChange(e.target.value)} value={val}>
        <option key="" value="">Выберите</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default DropdownFiltering;