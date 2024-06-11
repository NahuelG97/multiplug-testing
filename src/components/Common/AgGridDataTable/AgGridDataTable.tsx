'use client'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState, useRef } from 'react';

type ColumnDef = {
  field: string;
  filter: boolean;
  checkboxSelection?: boolean;
};

const AgGridDataTable: React.FC<{ data: any[], rowsSelected: (selectedRows: any[]) => void, gridApiRef: React.MutableRefObject<any> }> = ({ data, rowsSelected, gridApiRef }) => {
  const [colDefs, setColDefs] = useState<ColumnDef[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridApi = useRef<any>(null);
  

  useEffect(() => {
    if (data && data.length > 0) {
      const firstObjKeys = Object.keys(data[0]);
      const columns: ColumnDef[] = firstObjKeys.map((key, index) => ({
        field: key,
        filter: true,
        checkboxSelection: index === 0 // Add checkbox selection to the first column only
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
    //gridApiRef.current = params.api;
    gridApiRef.current = params.api;
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        rowSelection="multiple"
        onGridReady={onGridReady}
        onSelectionChanged={handleSelectionChanged}
      />
      {/* <Button label="Eliminar seleccionados" icon="pi pi-trash" onClick={() => onDeleteSelectedRows(selectedRows)} /> */}
    </div>
  );
};

export default AgGridDataTable;
