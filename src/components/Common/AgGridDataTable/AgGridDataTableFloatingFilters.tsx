'use client';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ColDef, IDateFilterParams, ITextFilterParams } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type ColumnDef = {
  field: string;
  filter: boolean | string;
  checkboxSelection?: boolean;
  filterParams?: any;
};

const dateFilterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    if (!cellValue) return -1;
    const dateParts = cellValue.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    return cellDate < filterLocalDateAtMidnight ? -1 : 1;
  },
};

const AgGridDataTableFloatingFilters: React.FC<{ data: any[], rowsSelected: (selectedRows: any[]) => void, gridApiRef: React.MutableRefObject<any> }> = ({ data, rowsSelected, gridApiRef }) => {
  const [colDefs, setColDefs] = useState<ColumnDef[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridApi = useRef<any>(null);
  console.log("Datos a cargar en ag-grid", data);

  useEffect(() => {
    if (data && data.length > 0) {
      const firstObjKeys = Object.keys(data[0]);
      const columns: ColumnDef[] = firstObjKeys.map((key, index) => ({
        field: key,
        filter: determineFilterType(key),
        checkboxSelection: index === 0,
        filterParams: key === 'FECHA' ? dateFilterParams : undefined,
      }));
      setColDefs(columns);
      setRowData(data);
    } else {
      console.log('El array de EntityResponse está vacío.');
    }
  }, [data]);

  const handleSelectionChanged = () => {
    if (gridApi.current) {
      const selectedNodes = gridApi.current.getSelectedNodes();
      const selectedData = selectedNodes.map((node: any) => node.data);
      setSelectedRows(selectedData);
      console.log('Filas seleccionadas:', selectedData);
      rowsSelected(selectedData);
    }
  };

  const onGridReady = (params: any) => {
    gridApi.current = params.api;
    gridApiRef.current = params.api;
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      filterParams: {
        buttons: ["reset", "apply"],
      } as ITextFilterParams,
    };
  }, []);

  const determineFilterType = (columnName: string): string | boolean => {
    if (columnName.toLowerCase().includes('fecha') || columnName.toLowerCase().includes('desde') ||columnName.toLowerCase().includes('hasta')) {
      return 'agDateColumnFilter';
    } else {
      return true;
    }
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        rowSelection="multiple"
        onGridReady={onGridReady}
        onSelectionChanged={handleSelectionChanged}
      />
    </div>
  );
};

export default AgGridDataTableFloatingFilters;
