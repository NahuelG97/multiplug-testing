import React from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgAreaSeriesOptions, AgChartOptions } from "ag-charts-community";

const AgChartSimpleArea: React.FC<any> = ({ data, title, subtitle }) => {
    if (data.length === 0) {
        return <div>No data available</div>;
      }
    
      const [xKey, ...yKeys] = Object.keys(data[0]);
    
      // Generar dinamicamente las series basadas en las claves de los datos
      const series: AgAreaSeriesOptions[] = yKeys.map(key => ({
        type: "area",
        xKey: xKey,
        yKey: key,
        yName: key.charAt(0).toUpperCase() + key.slice(1), // Capitaliza la primera letra del yKey
      }));
    
      const options: AgChartOptions = {
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

export default AgChartSimpleArea;