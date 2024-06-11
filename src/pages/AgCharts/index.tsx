// import React from "react";
// import { AgChartsReact } from "ag-charts-react";
// import {
//   AgChartOptions,
//   AgBarSeriesOptions,
//   AgLineSeriesOptions,
//   AgCategoryAxisOptions,
//   AgNumberAxisOptions,
//   AgChartLegendOptions,
//   AgChartCaptionOptions,
//   AgChartSubtitleOptions
// } from "ag-charts-community";

// const AGCharts = () => {
//     const options: AgChartOptions = {
//         title: { text: "Ice Cream Sales and Avg Temp" } as AgChartCaptionOptions,
//         subtitle: { text: "Data from 2022" } as AgChartSubtitleOptions,
//         data: [
//             { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
//             { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
//             { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
//             { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
//             { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
//             { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
//         ],
//         series: [
//             {
//                 type: "bar",
//                 xKey: "month",
//                 yKey: "iceCreamSales",
//                 yName: "Ice Cream Sales",
//             } as AgBarSeriesOptions,
//             {
//                 type: "line",
//                 xKey: "month",
//                 yKey: "avgTemp",
//                 yName: "Average Temperature (°C)",
//             } as AgLineSeriesOptions,
//         ],
//         axes: [
//             {
//                 type: "category",
//                 position: "bottom",
//             } as AgCategoryAxisOptions,
//             {
//                 type: "number",
//                 position: "left",
//                 keys: ["iceCreamSales"],
//                 label: {
//                     formatter: (params) => {
//                         return parseFloat(params.value).toLocaleString();
//                     },
//                 },
//             } as AgNumberAxisOptions,
//             {
//                 type: "number",
//                 position: "right",
//                 keys: ["avgTemp"],
//                 label: {
//                     formatter: (params) => {
//                         return params.value + " °C";
//                     },
//                 },
//             } as AgNumberAxisOptions,
//         ],
//         legend: {
//             position: "right",
//         } as AgChartLegendOptions,
//     };

//     return (
//         <React.Fragment>
//             <div className="page-content">
//                 <div className="container-fluid" style={{ height: '400px' }}>
//                     <AgChartsReact options={options} />
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default AGCharts;

import React from "react";
import SimpleBar from "../../components/Common/AgChartsDataGraphic/Bar/SimpleBar";
import HorizontalBar from "../../components/Common/AgChartsDataGraphic/Bar/HorizontalBar";
import SimpleLine from "../../components/Common/AgChartsDataGraphic/Line/SimpleLine";
import SimpleArea from "../../components/Common/AgChartsDataGraphic/Area/SimpleArea";
import SimplePie from "../../components/Common/AgChartsDataGraphic/Pie/SimplePie";
import SimpleDonut from "../../components/Common/AgChartsDataGraphic/Donut/SimpleDonut";
import { EnumChartType } from '../../components/Common/AgChartsDataGraphic/EnumChartType';
import ChartsGraphic from '../../components/Common/AgChartsDataGraphic/ChartsGraphic';

const AGCharts = () => {

    function getDataBar() {
        return [
            {
                quarter: "Q1'18",
                iphone: 140,
                mac: 16,
                ipad: 14,
                wearables: 12,
                services: 20,
            },
            {
                quarter: "Q2'18",
                iphone: 124,
                mac: 20,
                ipad: 14,
                wearables: 12,
                services: 30,
            },
            {
                quarter: "Q3'18",
                iphone: 112,
                mac: 20,
                ipad: 18,
                wearables: 14,
                services: 36,
            },
            {
                quarter: "Q4'18",
                iphone: 118,
                mac: 24,
                ipad: 14,
                wearables: 14,
                services: 36,
            },
        ];
    }

    function getDataLine() {
        return [
            {
                quarter: "Q1",
                petrol: 200,
                diesel: 100,
            },
            {
                quarter: "Q2",
                petrol: 300,
                diesel: 130,
            },
            {
                quarter: "Q3",
                petrol: 350,
                diesel: 160,
            },
            {
                quarter: "Q4",
                petrol: 400,
                diesel: 200,
            },
        ];
    }

    function getDataArea() {
        return [
            { month: "Jan", subscriptions: 222, services: 250, products: 200 },
            { month: "Feb", subscriptions: 240, services: 255, products: 210 },
            { month: "Mar", subscriptions: 280, services: 245, products: 195 },
            { month: "Apr", subscriptions: 300, services: 260, products: 205 },
            { month: "May", subscriptions: 350, services: 235, products: 215 },
            { month: "Jun", subscriptions: 420, services: 270, products: 200 },
            { month: "Jul", subscriptions: 300, services: 255, products: 225 },
            { month: "Aug", subscriptions: 270, services: 305, products: 210 },
            { month: "Sep", subscriptions: 260, services: 280, products: 250 },
            { month: "Oct", subscriptions: 385, services: 250, products: 205 },
            { month: "Nov", subscriptions: 320, services: 265, products: 215 },
            { month: "Dec", subscriptions: 330, services: 255, products: 220 },
        ];
    }

    function getDataPie() {
        return [
            { asset: "Stocks", amount: 60000 },
            { asset: "Bonds", amount: 40000 },
            { asset: "Cash", amount: 7000 },
            { asset: "Real Estate", amount: 5000 },
            { asset: "Commodities", amount: 3000 },
        ];
    }

    const dataBar = getDataBar();
    const dataLine = getDataLine();
    const dataArea = getDataArea();
    const dataPieDonut = getDataPie(); // este grafico Pie no es compatible con otros getData

    return (
        <React.Fragment>
            <div className="page-content">
                <h1>Bar</h1>
                <div className="container-fluid" style={{ height: '400px' }}>
                    <ChartsGraphic enumChartType={EnumChartType.Bar} data={dataBar} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><hr />
                <div className="container-fluid" style={{ height: '400px' }}>
                    <ChartsGraphic enumChartType={EnumChartType.Donut} data={dataPieDonut} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><br />
                {/* <div className="container-fluid" style={{ height: '400px' }}>
                    <HorizontalBar ChartType={ChartType.Bar} data={dataBar} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><hr />
                <div className="container-fluid" style={{ height: '400px' }}>
                    <SimpleBar ChartType={ChartType.Bar} data={dataBar} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><br />
                <h1>Line</h1>
                <div className="container-fluid" style={{ height: '400px' }}>
                    <SimpleLine ChartType={ChartType.Line} data={dataLine} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><br />
                <h1>Area</h1>
                <div className="container-fluid" style={{ height: '400px' }}>
                    <SimpleArea ChartType={ChartType.Area} data={dataArea} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><br />
                <h1>Pie</h1>
                <div className="container-fluid" style={{ height: '400px' }}>
                    <SimplePie ChartType={ChartType.Pie} data={dataPieDonut} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><br />
                <h1>Donut</h1>
                <div className="container-fluid" style={{ height: '400px' }}>
                    <SimpleDonut ChartType={ChartType.Donut} data={dataPieDonut} title="Apple's Revenue by Product Category" subtitle="In Billion U.S. Dollars" />
                </div><br /> */}
            </div>
        </React.Fragment>
    );
};

export default AGCharts;
