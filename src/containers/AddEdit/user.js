import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { UserType } from "../../enums/enum";
import { IsEnable } from "../../enums/enum";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";

const UserAddEdit = () => {
  const context = useContext(GlobalContext);
  const data = context?.modal?.data;
  const header = data ? "Хэрэглэгч засах" : "Шинэ хэрэглэгч нэмэх";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      code: data?.code || "",
      fname: data?.fname || "",
      lname: data?.lname || "",
      role: data?.role || UserType.User,
      password: data?.password || "",
      passwordAgain: data?.password || "",
      isenable: data?.isenable || 1,
      _id: data?._id || null,
    },
  });

  const handleSave = async (data) => {
    console.log("handleSave ~ data:", data);
    const res = await context?.request({
      method: "POST",
      url: "user/addUser",
      body: data,
    });

    if (res?.success) {
      toast.success(res?.message);
      reset();
      context?.setModal({ visible: false, data: null });

      await context?.request({
        url: `user/getAllUser`,
        model: "userlist",
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
          <label htmlFor="code" className="block text-sm font-medium mb-2">
            Ажилчны код
          </label>
          <Controller
            name="code"
            control={control}
            rules={{ required: "Ажилтны кодоо оруулна уу." }}
            render={({ field, fieldState }) => (
              <InputNumber
                {...field}
                id="code"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                placeholder="Ажилчны код"
                className={`w-full text-sm ${
                  fieldState.error ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.code && (
            <small className="p-error">{errors.code.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="fname" className="block text-sm font-medium mb-2">
            Овог
          </label>
          <InputText
            {...register("fname", { required: "Овог оруулна уу." })}
            id="fname"
            type="text"
            placeholder="Овог"
            className={`w-full text-sm mb-1 ${errors.fname ? "p-invalid" : ""}`}
          />
          {errors.fname && (
            <small className="p-error">{errors.fname.message}</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="lname" className="block text-sm font-medium mb-2">
            Нэр
          </label>
          <InputText
            {...register("lname", { required: "Нэр оруулна уу." })}
            id="lname"
            type="text"
            placeholder="Нэр"
            className={`w-full text-sm mb-1 ${errors.lname ? "p-invalid" : ""}`}
          />
          {errors.lname && (
            <small className="p-error">{errors.lname.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Роль
          </label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Ролийг сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="role"
                options={UserType}
                placeholder="Роль сонгох"
                className={`w-full text-sm ${errors.role ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.role && (
            <small className="p-error">{errors.role.message}</small>
          )}
        </div>
        {!data && (
          <>
            <div className="field">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Нууц үг
              </label>
              <InputText
                {...register("password", { required: "Нууц үгээ оруулна уу." })}
                id="password"
                type="password"
                placeholder="Нууц үг"
                className={`w-full text-sm mb-1 ${
                  errors.password ? "p-invalid" : ""
                }`}
              />
              {errors.password && (
                <small className="p-error">{errors.password.message}</small>
              )}
            </div>
            <div className="field">
              <label
                htmlFor="passwordAgain"
                className="block text-sm font-medium mb-2"
              >
                Нууц үг давтах
              </label>
              <InputText
                {...register("passwordAgain", {
                  required: "Нууц үгээ давтаж оруулна уу.",
                })}
                id="passwordAgain"
                type="password"
                placeholder="Нууц үг давтах"
                className={`w-full text-sm mb-1 ${
                  errors.password ? "p-invalid" : ""
                }`}
              />
              {errors.password && (
                <small className="p-error">{errors.password.message}</small>
              )}
            </div>
          </>
        )}
        <div className="field">
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
                options={IsEnable}
                placeholder="Төлөв сонгох"
                className={`w-full text-sm ${errors.role ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.isenable && (
            <small className="p-error">{errors.isenable.message}</small>
          )}
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

export default UserAddEdit;
