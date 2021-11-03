import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { DataViewFacade, useExecutionDataView } from "@gooddata/sdk-ui";
import StatusLoader from "../common/StatusLoader";
import { Product, Revenue } from "../../md/full";
import styles from "./CalculationOverview.module.scss";


type  SelectOption = { value: string, label: string }

const options = [
    { value: "minimum_revenue", label: "Minimum Revenue" },
    { value: "maximum_revenue", label: "Maximum Revenue" },
    { value: "median", label: "Median" },
];
const CalculationOverview: React.FC = () => {
    const { result, error, status } = useExecutionDataView({
        execution: {
            seriesBy: [Revenue],
            slicesBy: [Product.Default],
        },
    });
    const [selectedOption, setSelectedOption] = useState<SingleValue<SelectOption>>();

    const handleChange = (selectedOption: SingleValue<SelectOption>) => {
        setSelectedOption(selectedOption);
    };

    return <StatusLoader
        data={result}
        error={error}
        status={status}
        render={(data: DataViewFacade) => {
            console.log(data);
            return <>
                <h2>$456</h2>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    className={styles.Select}
                />
            </>;
        }} />;

};

export default CalculationOverview;
