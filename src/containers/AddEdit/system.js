import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { SystemType } from "../../enums/enum";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";
import { MultiSelect } from "primereact/multiselect";
import { Editor } from "primereact/editor";

const SystemAddEdit = () => {
  const context = useContext(GlobalContext);
  const data = context?.modal?.data;
  const header = data ? "Систем засах" : "Шинэ систем нэмэх";

  const serverList = (context?.resvirtuallist || [])?.map?.((item, index) => {
    return {
      value: item?._id,
      label: item?.ipaddress[0] + "-" + item?.name,
    };
  });

  const userList = (context?.resuserlist || [])?.map?.((item, index) => {
    return {
      value: item?._id,
      label: item?.lname,
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: data?.name || "",
      type: data?.type || SystemType[0]?.value,
      virtual: data?.virtual?._id || serverList[0]?.value,
      testvirtual: data?.testvirtual?._id || serverList[0]?.value,
      port: data?.port || undefined,
      testport: data?.testport || undefined,
      domain: data?.domain || undefined,
      testdomain: data?.testdomain || undefined,
      permission: data?.permission || undefined,
      manual: data?.manual || undefined,
      _id: data?._id || null,
    },
  });

  const handleSave = async (data) => {
    console.log("handleSave ~ data:", data);
    const res = await context?.request({
      method: "POST",
      url: "system/addSystem",
      body: data,
    });

    if (res?.success) {
      toast.success(res?.message);
      reset();
      context?.setModal({ visible: false, data: null });

      await context?.request({
        url: `system/getAllSystem`,
        model: "systemlist",
        method: "POST",
      });
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="card px-5">
      <h2>{header}</h2>

      <form onSubmit={handleSubmit(handleSave)} className="p-fluid">
        <div className="field">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Нэр
          </label>
          <InputText
            {...register("name", { required: "Нэр оруулна уу." })}
            id="name"
            type="text"
            placeholder="Нэр"
            className={`w-full text-sm mb-1 ${errors.name ? "p-invalid" : ""}`}
          />
          {errors.name && (
            <small className="p-error">{errors.name.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Системийн төрөл
          </label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Төрөл сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="type"
                optionValue="value"
                optionLabel="label"
                options={SystemType}
                placeholder="Төрөл сонгох"
                className={`w-full text-sm ${errors.type ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.type && (
            <small className="p-error">{errors.type.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="virtual" className="block text-sm font-medium mb-2">
            Real орчны Сервер
          </label>
          <Controller
            name="virtual"
            control={control}
            rules={{ required: "Server сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="virtual"
                optionValue="value"
                optionLabel="label"
                options={serverList}
                placeholder="Сервер сонгох"
                className={`w-full text-sm ${
                  errors.virtual ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.virtual && (
            <small className="p-error">{errors.virtual.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="port" className="block text-sm font-medium mb-2">
            Real орчны port
          </label>
          <Controller
            name="port"
            control={control}
            rules={{ required: "Real орчны port оруулна уу." }}
            render={({ field, fieldState }) => (
              <InputNumber
                {...field}
                id="port"
                mode="decimal"
                value={field.value}
                min={0}
                onChange={(e) => field.onChange(e.value)}
                placeholder="port"
                className={`w-full text-sm ${
                  fieldState.error ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.port && (
            <small className="p-error">{errors.port.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="domain" className="block text-sm font-medium mb-2">
            Real орчны Домайн нэр
          </label>
          <InputText
            {...register("domain", { required: "Домайн нэр оруулна уу." })}
            id="domain"
            type="text"
            placeholder="Нэр"
            className={`w-full text-sm mb-1 ${
              errors.domain ? "p-invalid" : ""
            }`}
          />
          {errors.domain && (
            <small className="p-error">{errors.domain.message}</small>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="testvirtual"
            className="block text-sm font-medium mb-2"
          >
            Test орчны Сервер
          </label>
          <Controller
            name="testvirtual"
            control={control}
            rules={{ required: "Server сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="testvirtual"
                optionValue="value"
                optionLabel="label"
                options={serverList}
                placeholder="Сервер сонгох"
                className={`w-full text-sm ${
                  errors.testvirtual ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.testvirtual && (
            <small className="p-error">{errors.testvirtual.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="testport" className="block text-sm font-medium mb-2">
            Test орчны port
          </label>
          <Controller
            name="testport"
            control={control}
            rules={{ required: "Test орчны port оруулна уу." }}
            render={({ field, fieldState }) => (
              <InputNumber
                {...field}
                id="testport"
                mode="decimal"
                value={field.value}
                min={0}
                onChange={(e) => field.onChange(e.value)}
                placeholder="testport"
                className={`w-full text-sm ${
                  fieldState.error ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.testport && (
            <small className="p-error">{errors.testport.message}</small>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="testdomain"
            className="block text-sm font-medium mb-2"
          >
            Test орчны Домайн нэр
          </label>
          <InputText
            {...register("testdomain", { required: "Домайн нэр оруулна уу." })}
            id="testdomain"
            type="text"
            placeholder="Нэр"
            className={`w-full text-sm mb-1 ${
              errors.testdomain ? "p-invalid" : ""
            }`}
          />
          {errors.testdomain && (
            <small className="p-error">{errors.testdomain.message}</small>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="permission"
            className="block text-sm font-medium mb-2"
          >
            Хэрэглэгчид
          </label>
          <Controller
            name="permission"
            control={control}
            rules={{ required: "Хэрэглэгч сонгоно уу." }}
            render={({ field }) => (
              <MultiSelect
                {...field}
                value={field?.value}
                id="permission"
                options={userList}
                optionLabel="label"
                optionValue="value"
                placeholder="Хэрэглэгч сонгох"
                className={`w-full text-sm ${
                  errors.permission ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.permission && (
            <small className="p-error">{errors.permission.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="manual" className="block text-sm font-medium mb-2">
            Гарын авлага
          </label>
          <Controller
            name="manual"
            control={control}
            render={({ field }) => (
              <Editor
                value={field?.value}
                onTextChange={(e) => field.onChange(e.htmlValue)}
                style={{ height: "320px" }}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          label="Хадгалах"
          icon="pi pi-save"
          className="w-full text-sm mt-2"
        />
      </form>
    </div>
  );
};

export default SystemAddEdit;
