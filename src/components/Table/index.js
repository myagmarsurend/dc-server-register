import React, {
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import * as xlsx from "xlsx";
import module from "file-saver";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { GlobalContext } from "../../context";

const Index = ({ columns, data }) => {
  const datas = data || [];
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const dt = useRef(null);
  const location = useLocation();
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const cols = useMemo(() => {
    return (
      columns?.map?.((item, index) => ({
        ...item,
        field: item?.key,
        header: item?.title,
        body: (rowData) =>
          item.body ? item.body(rowData[item.key]) : rowData[item.key],
      })) || [
        {
          field: "data",
          header: "Data",
          body: (value) => <span>{value}</span>,
        },
      ]
    );
  }, [columns]);

  const onGlobalFilterChange = useCallback((e) => {
    const value = e.target.value;

    setGlobalFilterValue(value);
  }, []);

  const exportExcel = async () => {
    try {
      const worksheet = xlsx.utils.json_to_sheet(datas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "datas");
    } catch (error) {
      console.error("Failed to export to Excel:", error);
    }
  };

  const saveAsExcelFile = async (buffer, fileName) => {
    try {
      if (module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], { type: EXCEL_TYPE });

        module.default.saveAs(
          data,
          `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
        );
      }
    } catch (error) {
      console.error("Failed to save Excel file:", error);
    }
  };

  const add = () => {
    context?.setModal({ visible: true, data: null });
  };

  const header = () => {
    return (
      <div className="flex align-items-center justify-content-between gap-2">
        <div className="flex justify-content-end">
          <IconField iconPosition="left" className="text-sm">
            <InputIcon className="pi pi-search" />
            <InputText
              className="text-sm"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Хайх"
            />
          </IconField>
        </div>
        <div className="flex gap-2">
          <Tooltip target=".export-buttons>button" position="bottom" />
          <Button
            type="button"
            icon="pi pi-plus"
            severity="info"
            rounded
            onClick={add}
            data-pr-tooltip="ADD"
          />
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
        </div>
      </div>
    );
  };

  const onRowClick = (e) => {
    context?.setModal({ visible: true, data: e.data });
  };

  return (
    <div className="card w-full">
      <DataTable
        value={datas}
        header={header}
        ref={dt}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        emptyMessage="Бүртгэл байхгүй байна."
        onRowDoubleClick={onRowClick}
        className="text-sm"
      >
        <Column
          header="№"
          body={(_, { rowIndex }) => rowIndex + 1}
          className="w-1rem"
        />
        {cols?.map((col, index) => (
          <Column
            key={index}
            field={col?.field}
            header={col?.header}
            body={col?.body}
            className={`w-${col?.width}rem`}
            // style={{ textAlign: col?.align, width: col?.width + "px" }}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default memo(
  Index,
  (prev, next) => prev.data === next.data && prev.columns === next.columns
);
