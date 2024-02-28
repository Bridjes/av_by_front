export const SelectStyles = {
    control: (defaultStyles) => ({
        ...defaultStyles,
        color: "#35605A",
        backgroundColor: "none",
        border: "none",
        boxShadow: "none",
        borderRadius: "none",
        width: "200px",
        height: "40px",
    }),
    input: (defaultStyles, state) => ({
        ...defaultStyles,
        color: "#00120B",
        fontFamily: "Arial",
        backgroundColor: "none",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        direction: "ltr",
    }),
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isSelected ? "#F7F0F0" : "#35605A",
        fontFamily: "Arial",
        backgroundColor: state.isSelected ? "#35605A" : "none",
        direction: "ltr",justifyContent: 'flex-end',
        '&:hover': {
            backgroundColor: '#35605A',
            color: '#F7F0F0'
        },
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? "rgba(1, 1, 1, 0.5)" : "#35605A",
        fontFamily: "Arial",
        fontSize: "16px",
        padding: "0",
        direction: "ltr",
    }),
    dropdownIndicator: (provided)=> ({
        ...provided,
        color: "#35605A",
    }),
    clearIndicator: (provided)=> ({
        ...provided,
        color: "#35605A",
    }),
    singleValue: (defaultStyles) => ({
        ...defaultStyles,
        color: "#35605A",
        fontFamily: "Arial",
        direction: "ltr",textAlign: 'left',
    }),
};