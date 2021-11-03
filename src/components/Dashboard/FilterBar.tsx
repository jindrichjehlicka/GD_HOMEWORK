import React, { useEffect, useState } from "react";
import { DateFilter, DateFilterHelpers, DateFilterOption, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-backend-spi";
import { IDateFilter } from "@gooddata/sdk-model";
import { DateDatasets } from "../../md/full";

export type DateFilterInfo = { filter: IDateFilter, title: string }

interface FilterBarProps {
    onDateFilterChange: (filterInfo: DateFilterInfo) => void;
}

const availableGranularity: DateFilterGranularity[] = [
    "GDC.time.month",
];

//This should be dynamic when internationalization is implemented
const defaultLocale = "en-US";

//JSX.Element could be used instead of React.FC. This would prevent specifying FilterBarProps twice.
const FilterBar: React.FC<FilterBarProps> = ({ onDateFilterChange }: FilterBarProps) => {
    const [state, setState] = useState<any>({
        selectedFilterOption: defaultDateFilterOptions.allTime,
        excludeCurrentPeriod: false,
    });

    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        setState({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    //This logic cannot be in onApply, since it would not send the default state to the parent component.
    useEffect(() => {
        const filter = DateFilterHelpers.mapOptionToAfm(
            state.selectedFilterOption,
            DateDatasets.Date.ref,
            state.excludeCurrentPeriod,
        );
        const title = DateFilterHelpers.getDateFilterTitle(state.selectedFilterOption, defaultLocale);
        onDateFilterChange({ filter, title });
    }, [onDateFilterChange, state]);

    return <>
        {/* I don't think that the imported constant defaultDateFilterOptions should be used in here as it also offers filtering by days, while the view is based on months*/}
        <DateFilter
            filterOptions={defaultDateFilterOptions}
            excludeCurrentPeriod={state.excludeCurrentPeriod}
            selectedFilterOption={state.selectedFilterOption}
            availableGranularities={availableGranularity}
            onApply={onApply} />
    </>;
};
export default FilterBar;
