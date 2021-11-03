import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import styles from "./CalculationOverview.module.scss";

type  SelectOption = { value: string, label: string }

const options = [
    { value: "minimum_revenue", label: "Minimum Revenue" },
    { value: "maximum_revenue", label: "Maximum Revenue" },
    { value: "median", label: "Median" },
];
const CalculationOverview: React.FC = () => {

    const [selectedOption, setSelectedOption] = useState<SingleValue<SelectOption>>();

    const handleChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedOption(selectedOption);
    };

    return <>
        {/*TODO calculations*/}
        <h1>$456</h1>
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            className={styles.Select}
        />
    </>;
};

export default CalculationOverview;
