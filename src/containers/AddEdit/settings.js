/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { SettingsType, SettingsPurposeType } from "../../enums/enum";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";

const UserAddEdit = () => {
  const context = useContext(GlobalContext);
  const data = context?.modal?.data;
  const header = data ? "Тохиргоо засах" : "Тохиргоо нэмэх";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      type: data?.type || SettingsType[0].value,
      purpose: data?.purpose || SettingsPurposeType[0].value,
      label: data?.label || "",
      _id: data?._id || null,
    },
  });

  const handleSave = async (data) => {
    console.log("handleSave ~ data:", data);
    const res = await context?.request({
      method: "POST",
      url: "settings/addSettings",
      body: data,
    });

    if (res?.success) {
      toast.success(res?.message);
      reset();
      context?.setModal({ visible: false, data: null });

      await context?.request({
        url: `settings/getAllSettings`,
        model: "settingslist",
        method: "POST",
      });

      await context?.request({
        url: `settings/getAllSettings/${data?.purpose}`,
        model: `settings${data?.purpose}list`,
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
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Төрөл
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
                options={SettingsType}
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
          <label htmlFor="purpose" className="block text-sm font-medium mb-2">
            Зориулалт
          </label>
          <Controller
            name="purpose"
            control={control}
            rules={{ required: "Зориулалт сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="purpose"
                optionValue="value"
                optionLabel="label"
                options={SettingsPurposeType}
                placeholder="Зориулалт сонгох"
                className={`w-full text-sm ${
                  errors.purpose ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.purpose && (
            <small className="p-error">{errors.purpose.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="label" className="block text-sm font-medium mb-2">
            Утга
          </label>
          <InputText
            {...register("label", { required: "Утгаа оруулна уу." })}
            id="label"
            type="text"
            placeholder="Утга"
            className={`w-full text-sm mb-1 ${errors.label ? "p-invalid" : ""}`}
          />
          {errors.label && (
            <small className="p-error">{errors.label.message}</small>
          )}
        </div>
        {/* <div className="field">
          <label htmlFor="isenable" className="block text-sm font-medium mb-2">
            Идэвхтэй эсэх
          </label>
          <Controller
            name="isenable"
            control={control}
            rules={{ required: "Төлөв сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="isenable"
                optionValue="value"
                optionLabel="label"
                options={IsEnable}
                placeholder="Төлөв сонгох"
                className={`w-full text-sm ${
                  errors.isenable ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.isenable && (
            <small className="p-error">{errors.isenable.message}</small>
          )}
        </div> */}
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

export default UserAddEdit;
