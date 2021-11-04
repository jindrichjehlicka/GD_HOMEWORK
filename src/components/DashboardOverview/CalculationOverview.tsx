import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { DataViewFacade, ErrorComponent, useExecutionDataView } from "@gooddata/sdk-ui";
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
    { value: "maximum_revenue", label: calculationOverviewStrings.MAXIMUM_REVENUE },
    { value: "minimum_revenue", label: calculationOverviewStrings.MINIMUM_REVENUE },
    { value: "median", label: calculationOverviewStrings.MEDIAN },
];

const optionDescription: Record<string, string> = {
    "maximum_revenue": calculationOverviewStrings.MAXIMUM_REVENUE_DESCRIPTION,
    "minimum_revenue": calculationOverviewStrings.MINIMUM_REVENUE_DESCRIPTION,
    "median": calculationOverviewStrings.MEDIAN_DESCRIPTION,
};

const defaultLocale = "en-US";

const CalculationOverview: React.FC<CalculationOverviewProps> = ({ filters }: CalculationOverviewProps) => {
    const { getSlicedData } = useCalculationOverviewData();
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
        label: calculationOverviewStrings.MAXIMUM_REVENUE,
    });

    return <StatusLoader
        data={result}
        error={error}
        status={status}
        renderError={() => <ErrorComponent
            icon="gd-icon-filter"
            className={styles.error}
            message={calculationOverviewStrings.ERROR_MESSAGE}
            description={calculationOverviewStrings.ERROR_DESCRIPTION}
        />}
        render={(data: DataViewFacade) => {
            const mappedData = getSlicedData(data);
            const result = getResult(selectedOption?.value as ResultType || "maximum_revenue", mappedData);
            return <div className={styles.overview}>
                <div className={styles.titles}>
                    <div
                        className="card-subheading">{selectedOption?.value && `${optionDescription[selectedOption?.value]}:`}</div>
                    <h2 className={styles.h2}>
                        {`${result.label} - ${result.currency}${Intl.NumberFormat(defaultLocale).format(result.result)}`}
                    </h2>
                </div>
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
