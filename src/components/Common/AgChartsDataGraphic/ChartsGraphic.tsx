import React from "react";
import { AgChartsReact } from "ag-charts-react";
import { EnumChartType } from "./EnumChartType";
import { AgBarSeriesOptions, AgDonutSeriesOptions, AgLineSeriesOptions, AgPieSeriesOptions, AgAreaSeriesOptions } from "ag-charts-community";

const ChartsGraphic: React.FC<{ 
    enumChartType: EnumChartType; 
    data: any; 
    title: string; 
    subtitle: string; 
}> = ({ enumChartType, data, title, subtitle }) => {
    console.log("enumChartType:", enumChartType);
    if (data.length === 0) {
        return <div>No data available</div>;
    }

    const [xKey, ...yKeys] = Object.keys(data[0]);

    // Generar dinamicamente las series basadas en las claves de los datos
    const generateSeries = (chartType: EnumChartType, xKey: string, yKeys: string[]) => {
        switch (chartType) {
            case EnumChartType.Donut:
                return [{
                    type: enumChartType.toLowerCase(),
                    calloutLabelKey: "asset",
                    angleKey: "amount",
                    innerRadiusRatio: 0.7,
                }] as AgDonutSeriesOptions[];

            case EnumChartType.Pie:
                return [{
                    type: enumChartType.toLowerCase(),
                    angleKey: "amount",
                    legendItemKey: "asset"
                }] as AgPieSeriesOptions[];

            case EnumChartType.Bar:
            case EnumChartType.Line:
            case EnumChartType.Area:
                return yKeys.map(key => ({
                    type: enumChartType.toLowerCase(), // 'bar', 'line' o 'area'
                    xKey: xKey,
                    yKey: key,
                    yName: key.charAt(0).toUpperCase() + key.slice(1),
                })) as (AgBarSeriesOptions | AgLineSeriesOptions | AgAreaSeriesOptions)[];

            default:
                return [];
        }
    };

    const series = generateSeries(enumChartType, xKey, yKeys);

    const options: any = {
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        data: data,
        series: series,
    };

    return <AgChartsReact options={options} />;
};

export default ChartsGraphic;


