import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_URL} from "../../API";
import classes from "./Serch.component.css"

const Serch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm) {
                const terms = {
                    cars: [],
                    trucks: []
                }
                try {
                    const response = await axios.get(
                    `${API_URL}/car-search?search=${searchTerm}`
                    );
                    terms.cars = response.data.map((hit) => hit);
                } catch (error) {
                    console.error(error);
                }
                try {
                    const response = await axios.get(
                    `${API_URL}/truck-search?search=${searchTerm}`
                    );
                    terms.trucks = response.data.map((hit) => hit);
                } catch (error) {
                    console.error(error);
                }
                setSuggestions(Object.values(terms).flat())
            } else {
                setSuggestions([])
            }
        };

        fetchSuggestions();
    }, [searchTerm]);

    return (
        <div className="search">
            <input
                placeholder="Поиск..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                list="search-query"
            />
            {/*<datalist className="search-query" id="search-query">*/}
            {/*    {*/}
            {/*        suggestions.map((suggestion, id) => (*/}
            {/*            <option*/}
            {/*                id={console.log(id)}*/}
            {/*                key={id}*/}
            {/*                value={suggestion.title}*/}
            {/*            />*/}
            {/*    ))}*/}
            {/*</datalist>*/}
            <div className="queries">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.title}>{suggestion.title}</div>
                ))}
            </div>
        </div>
    );
};

export default Serch;