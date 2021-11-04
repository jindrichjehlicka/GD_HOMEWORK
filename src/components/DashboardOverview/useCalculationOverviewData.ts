import { DataViewFacade } from "@gooddata/sdk-ui";
//
export type CalculationData = {
    label: string;
    values: string[]
}

interface UseCalculationOverviewData {
    getSlicedData: (data: DataViewFacade) => CalculationData[];
}

const useCalculationOverviewData = (): UseCalculationOverviewData => {

    const getSlicedData = (data: DataViewFacade): CalculationData[] => {
        const slices = data?.data().slices().toArray();
        return slices?.map((slice) => {
            return {
                label: slice.sliceTitles()[0],
                //rawValue could be used, however formatted also returns currency
                values:slice.dataPoints().map(({formattedValue}) => formattedValue() || '')
            };
        });
    };

    return {
        getSlicedData,
    };
};

export default useCalculationOverviewData;
