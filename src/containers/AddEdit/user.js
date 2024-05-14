import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { UserType } from "../../enums/enum";
import { IsEnable } from "../../enums/enum";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import { PASSWORD_SECRET } from "../../context/state";
import decryptWithAES from "../../utils/decrypt";

const UserAddEdit = () => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const context = useContext(GlobalContext);
  const data = context?.modal?.data;
  const header = data ? "Хэрэглэгч засах" : "Шинэ хэрэглэгч нэмэх";
  const [decryptedPass, setDecryptedPass] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
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

  const password = watch("password");

  useEffect(() => {
    if (data && password) {
      // console.log(
      //   "🚀 ~ useEffect ~ decrypted:",
      //   CryptoJS.enc.Utf8.parse(PASSWORD_SECRET)
      // );
      // let decrypted = CryptoJS.AES.decrypt(
      //   password,
      //   PASSWORD_SECRET.toString()
      // );

      let decrypted = decryptWithAES(password, PASSWORD_SECRET);
      console.log("🚀 ~ useEffect ~ decrypted:", decrypted);

      setDecryptedPass(decrypted);
    }
  }, [password]);

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
          <InputText
            {...register("code", { required: "Ажилтны кодоо оруулна уу." })}
            id="code"
            type="text"
            placeholder="Ажилчны код"
            className={`w-full text-sm mb-1 ${errors.code ? "p-invalid" : ""}`}
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

        {userData?.role === 1 && (
          <div className="field">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Нууц үг
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Нууц үгээ оруулна уу." }}
              render={({ field }) => (
                <Password
                  id="password"
                  // value={field?.value}
                  value={decryptedPass}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Нууц үг"
                  className={`w-full text-sm mb-1 ${
                    errors.password ? "p-invalid" : ""
                  }`}
                  disabled={data}
                  toggleMask
                />
              )}
            />
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>
        )}

        {!data && (
          <div className="field">
            <label
              htmlFor="passwordAgain"
              className="block text-sm font-medium mb-2"
            >
              Нууц үг давтах
            </label>
            <Controller
              name="passwordAgain"
              control={control}
              rules={{
                validate: (value) =>
                  value === password || "Нууц үг таарахгүй байна.",
              }}
              render={({ field }) => (
                <Password
                  id="passwordAgain"
                  value={field?.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Нууц үг давтах"
                  className={`w-full text-sm mb-1 ${
                    errors.passwordAgain ? "p-invalid" : ""
                  }`}
                  toggleMask
                />
              )}
            />
            {errors.passwordAgain && (
              <small className="p-error">{errors.passwordAgain.message}</small>
            )}
          </div>
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
