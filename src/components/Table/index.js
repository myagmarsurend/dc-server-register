import React, { memo, useContext, useMemo, useRef, useState } from "react";
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { GlobalContext } from "../../context";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Index = ({ columns, data }) => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const datas = data || [];
  const context = useContext(GlobalContext);
  const dt = useRef(null);
  const location = useLocation();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    setGlobalFilterValue(value);
  };

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
      const EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(
        data,
        `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
      );
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

  const handleDelete = async (e) => {
    const res = await context?.request({
      method: "DELETE",
      url: `${location.pathname.substring(1)}/delete/${deleteId}`,
    });

    if (res?.success) {
      context?.setModal({ visible: false, data: null });
      setVisibleDelete(false);
      toast.success(res?.message);

      let path = location.pathname.substring(1);
      let capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
      console.log("🚀 ~ handleDelete ~ capitalizedPath:", capitalizedPath);

      await context?.request({
        url: `${location.pathname.substring(1)}/getAll${capitalizedPath}`,
        model: `${location.pathname.substring(1)}list`,
        method: "POST",
      });

      if (path === "virtual" || path === "user") {
        await context?.request({
          url: `server/getAllServer`,
          model: "serverlist",
          method: "POST",
        });
      }

      if (path === "server") {
        await context?.request({
          url: `virtual/getAllVirtual`,
          model: "virtuallist",
          method: "POST",
        });
      }
    } else {
      toast.error(res?.message);
    }
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
        globalFilter={globalFilterValue}
        selectionMode="single"
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
            sortable
            className={`w-${col?.width}rem`}
            filter={col?.filter}
            filterField={col?.filterField}
            showFilterMenu={col?.showFilterMenu}
            // style={{ textAlign: col?.align, width: col?.width + "px" }}
          />
        ))}
        {userData?.role === 1 && (
          <Column
            header="Үйлдэл"
            body={(_, { rowIndex }) => {
              return (
                <Button
                  className="p-button p-component p-button-icon-only p-button-rounded p-button-warning text-xs"
                  icon="pi pi-trash"
                  onClick={() => {
                    setDeleteId(_._id);
                    setVisibleDelete(true);
                  }}
                  tooltip="Устгах"
                  tooltipOptions={{ position: "left", className: "text-xs" }}
                />
              );
            }}
            className="w-1rem"
          />
        )}
      </DataTable>
      <ConfirmDialog
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="Та устгахдаа итгэлтэй байна уу?"
        header="Устгах эсэх"
        accept={handleDelete}
        acceptLabel="Тийм"
        reject={() => setVisibleDelete(false)}
        rejectLabel="Үгүй"
        // className="text-xs"
        acceptClassName="text-xs bg-red-500 border-none"
        rejectClassName="text-xs bg-green-500 border-none"
        headerClassName="text-xs"
        icon="pi pi-exclamation-triangle"
      />
    </div>
  );
};

export default memo(
  Index,
  (prev, next) => prev.data === next.data && prev.columns === next.columns
);
