import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { DataViewFacade, useExecutionDataView } from "@gooddata/sdk-ui";
import StatusLoader from "../common/StatusLoader";
import { DateDatasets, Product, Revenue } from "../../md/full";
import styles from "./CalculationOverview.module.scss";
import { IDateFilter } from "@gooddata/sdk-model";
import useCalculationOverviewData from "./useCalculationOverviewData";
import useCalculationResult, { ResultType } from "./useCalculationResult";
import calculationOverviewStrings from "./calculationOverviewStrings";

interface CalculationOverviewProps {
    filters: IDateFilter[];
}

type SelectOption = { value: string, label: string }

const options = [
    { value: "maximum_revenue", label: calculationOverviewStrings.MINIMUM_REVENUE },
    { value: "minimum_revenue", label: calculationOverviewStrings.MINIMUM_REVENUE },
    { value: "median", label: calculationOverviewStrings.MEDIAN },
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
        label: calculationOverviewStrings.MEDIAN,
    });

    return <StatusLoader
        data={result}
        error={error}
        status={status}
        renderError={() => <></>}
        render={(data: DataViewFacade) => {
            const mappedData = getMappedData(data);
            const result = getResult(selectedOption?.value as ResultType || "maximum_revenue", mappedData);
            return <div className={styles.overview}>
                <h2 className={styles.title}>{`$${result}`}</h2>
                <Select
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    className={styles.Select}
                />
            </div>;
        }} />;


};

export default CalculationOverview;
