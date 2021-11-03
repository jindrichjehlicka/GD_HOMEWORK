import React from "react";
import { LineChart } from "@gooddata/sdk-ui-charts";
import FilterBar from "./FilterBar";
import CalculationOverview from "./CalculationOverview";
import styles from "./Dashboard.module.scss";
import {  TotalRevenueNoFilters } from "../../md/full";


const style = { height: 300 };

const measures = [
    TotalRevenueNoFilters,

];

const Dashboard: React.FC = () => {
    return <>
        <div>
            {/*TODO: dynamic*/}
            <h1>My dashboard</h1>
        </div>
        <div>
            <FilterBar />
        </div>
        <div className={styles.Dashboard}>
            <div style={style} >
                <LineChart measures={measures}  />
            </div>
            <div>
                <CalculationOverview/>
            </div>
        </div>
    </>;
};
export default Dashboard;
