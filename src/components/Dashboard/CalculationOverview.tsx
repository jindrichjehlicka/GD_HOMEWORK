import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { DataViewFacade, useExecutionDataView } from "@gooddata/sdk-ui";
import StatusLoader from "../common/StatusLoader";
import { DateDatasets, Product, Revenue } from "../../md/full";
import styles from "./CalculationOverview.module.scss";
import { IDateFilter } from "@gooddata/sdk-model";
import useCalculationOverviewData from "./useCalculationOverviewData";
import useCalculationResult, { ResultType } from "./useCalculationResult";

interface CalculationOverviewProps {
    filters: IDateFilter[];
}

type SelectOption = { value: string, label: string }

const options = [
    { value: "maximum_revenue", label: "Maximum Revenue" },
    { value: "minimum_revenue", label: "Minimum Revenue" },
    { value: "median", label: "Median" },
];
const CalculationOverview: React.FC<CalculationOverviewProps> = ({ filters }: CalculationOverviewProps) => {
    const { getMappedData } = useCalculationOverviewData();
    const { getResult } = useCalculationResult();
    const { result, error, status } = useExecutionDataView({
        execution: {
            seriesBy: [Revenue, Product.Default],
            slicesBy: [DateDatasets.Date.Month.Short],
            filters,
        },
    });
    const [selectedOption, setSelectedOption] = useState<SingleValue<SelectOption>>({
        value: "maximum_revenue",
        label: "Maximum Revenue",
    });

    return <StatusLoader
        data={result}
        error={error}
        status={status}
        renderError={() => {
            return <></>;
        }}
        render={(data: DataViewFacade) => {
            const mappedData = getMappedData(data);
            const result = getResult(selectedOption?.value as ResultType || "maximum_revenue", mappedData);
            console.log(mappedData);
            return <>
                <h2>{`$${result}`}</h2>
                <Select
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    className={styles.Select}
                />
            </>;
        }} />;


};

export default CalculationOverview;
