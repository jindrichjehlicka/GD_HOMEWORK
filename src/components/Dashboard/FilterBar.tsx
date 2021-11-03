import React, { useState } from "react";
import { DateFilter, DateFilterOption, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-backend-spi";

const availableGranularity: DateFilterGranularity[] = [
    "GDC.time.date",
    // "GDC.time.month",
    // "GDC.time.quarter",
    // "GDC.time.year",
];
const FilterBar: React.FC = () => {
    const [state, setState] = useState<any>({
        selectedFilterOption: defaultDateFilterOptions.allTime!,
        excludeCurrentPeriod: false,
    });

    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        setState({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    return <>
        <DateFilter
            filterOptions={defaultDateFilterOptions}
            excludeCurrentPeriod={state.excludeCurrentPeriod}
            selectedFilterOption={state.selectedFilterOption}
            availableGranularities={availableGranularity}
            customFilterName="Selected date"
            dateFilterMode="active"
            dateFormat="MM/dd/yyyy"
            onApply={onApply} />
    </>;
};
export default FilterBar;
