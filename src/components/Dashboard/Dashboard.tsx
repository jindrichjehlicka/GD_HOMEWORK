import React, { useState } from "react";
import { LineChart } from "@gooddata/sdk-ui-charts";
import CalculationOverview from "./CalculationOverview";
import styles from "./Dashboard.module.scss";
import { DateDatasets, Product, Revenue } from "../../md/full";
import FilterBar, { DateFilterInfo } from "./FilterBar";


const Dashboard: React.FC = () => {
    const [dateFilterInfo, setDateFilterInfo] = useState<DateFilterInfo>();
    return <>
        <div>
            <h1>My dashboard {dateFilterInfo && ` - ${dateFilterInfo.title}`}</h1>
        </div>
        <div>
            <FilterBar onDateFilterChange={setDateFilterInfo} />
        </div>

        <div className={styles.Dashboard}>
            <div className={styles.LineChart}>
                <LineChart
                    measures={[Revenue]}
                    filters={dateFilterInfo?.filter ? [dateFilterInfo?.filter] : []}
                    segmentBy={Product.Default}
                    trendBy={DateDatasets.Date.Month.Short}
                />
            </div>
            <div className={styles.CalculationOverview}>
                <CalculationOverview filters={dateFilterInfo?.filter ? [dateFilterInfo?.filter] : []} />
            </div>


        </div>


    </>;
};
export default Dashboard;
