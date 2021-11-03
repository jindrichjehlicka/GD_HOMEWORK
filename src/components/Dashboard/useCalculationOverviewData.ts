import { DataViewFacade } from "@gooddata/sdk-ui";

interface UseCalculationOverviewData {
    getMappedData: (data: DataViewFacade) => any;
}

const useCalculationOverviewData = (): UseCalculationOverviewData => {

    const getMappedData = (data: DataViewFacade): any => {
        const slices = data?.data().slices().toArray();
        return slices?.map((slice) => {
            return {
                label: slice.sliceTitles()[0],
                ...slice.dataPoints().map((p) => p.rawValue),
            };
        });
    };

    return {
        getMappedData,
    };
};

export default useCalculationOverviewData;
