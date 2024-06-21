import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Image } from "primereact/image";
import Logo from "../../assets/logo.png";

const Index = () => {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    document.title = "Нэвтрэх";
  }, []);

  useEffect(() => {
    register("remember");
  }, [register]);

  const handleLogin = async (data) => {
    const res = await context?.request({
      url: "user/login",
      method: "POST",
      body: data,
    });

    if (res?.success) {
      localStorage.setItem("access_token", res?.data?.accessToken);
      localStorage.setItem("auth", JSON.stringify(res?.data?.user));
      context?.setLogin(true);
      toast.success(res?.message);

      if (data.remember) {
        localStorage.setItem("code", data.code);
      } else {
        localStorage.removeItem("code");
      }

      navigate("/server");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="surface-card p-4 shadow-2 border-round w-full h-fit lg:w-2 ">
      <div className="card flex justify-content-center">
        <Image src={Logo} alt="Image" width="140" />
      </div>
      <div className="text-center mb-5 text-900 text-xl font-medium mb-3">
        DC Сервер бүртгэл
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="p-fluid">
        <div className="field">
          <label htmlFor="code" className="block text-900 font-medium mb-2">
            Ажилчны код
          </label>
          <InputText
            {...register("code", { required: "Ажилтны кодоо оруулна уу." })}
            id="code"
            type="text"
            placeholder="Ажилчны код"
            className={`w-full mb-3 ${errors.code ? "p-invalid" : ""}`}
          />
          {errors.code && (
            <small className="p-error">{errors.code.message}</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Нууц үг
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Нууц үгээ оруулна уу." }}
            render={({ field }) => (
              <Password
                id="password"
                value={field?.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Нууц үг"
                className={`w-full text-sm mb-1 ${
                  errors.password ? "p-invalid" : ""
                }`}
                toggleMask
              />
            )}
          />
          {errors.password && (
            <small className="p-error">{errors.password.message}</small>
          )}
        </div>
        <div className="flex align-items-center mb-4">
          <Checkbox
            id="remember"
            checked={watch("remember")}
            onChange={(e) => setValue("remember", e.checked)}
            className="mr-2"
          />
          <label htmlFor="remember">Сануулах</label>
        </div>
        <Button
          type="submit"
          label="Нэвтрэх"
          icon="pi pi-user"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default Index;
