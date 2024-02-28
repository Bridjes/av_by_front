import React, { useState } from 'react';
import classes from "./DropdownWithLinks.css";
import {Link} from "react-router-dom";

const DropdownWithLinks = ({ ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const entries = Object.entries(props.links);

    return (
        <div
            className="dropdown" // Добавление класса для стилизации
            onMouseEnter={() => setIsOpen(true)} // Обработчик события наведения курсора
            onMouseLeave={() => setIsOpen(false)} // Обработчик события увода курсора
        >
            <button className="dropdown-button">
                {props.title}
                <span>▼</span>
            </button>
                {isOpen && (
                    <div className="dropdown-content"> {/* Добавление класса для стилизации */}
                        {entries.map(([key, value]) => (
                            <Link className="link"
                                  to={value}
                                  key={key}
                            >
                                <div className="dropdown-item"
                                     key={key}
                                >
                                    {key}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default DropdownWithLinks;