import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { CpuUnit, RamUnit, VpcType } from "../../enums/enum";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";

const VirtualAddEdit = () => {
  const context = useContext(GlobalContext);
  const data = context?.modal?.data;
  console.log("🚀 ~ VirtualAddEdit ~ data:", data);
  const header = data ? "Сервер засах" : "Шинэ сервер нэмэх";
  const [hardList, setHardList] = useState([]);

  const serverList = (context?.resserverlist || [])?.map?.((item, index) => {
    return {
      value: item?._id,
      label: item?.ipaddress[0] + "-" + item?.name,
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    defaultValues: {
      name: data?.name || "",
      username: data?.username || "",
      password: data?.password || "",
      passwordAgain: data?.passwordAgain || "",
      server: data?.server?._id || serverList[0]?.value,
      dns: data?.dns || "",
      ipaddress: data?.ipaddress || [{ _id: null }],
      ram: data?.ram || 0,
      ramunit: data?.ramunit || RamUnit[0]?.value,
      cpu: data?.cpu || 0,
      cpuunit: data?.cpuunit || CpuUnit[0]?.value,
      hard: data?.hard?._id || { hardname: "", hardcap: 0, _id: null },
      usedhard: data?.usedhard || 0,
      _id: data?._id || null,
      os: data?.os || VpcType[0]?.value,
    },
  });

  const serverId = watch("server");
  useEffect(() => {
    const selectedServer = context?.resserverlist?.find(
      (item) => item._id === serverId
    );
    const mappedHardList =
      selectedServer?.hard?.map((hardItem) => ({
        value: hardItem._id,
        label: `${hardItem.hardname} - ${hardItem.hardcap}/${
          hardItem.hardcap - hardItem.hardusedcap
        } GB`,
      })) || [];
    setHardList(mappedHardList);
  }, [serverId, context?.resserverlist]);

  const {
    fields: fieldsIp,
    append: appendIp,
    remove: removeIp,
  } = useFieldArray({
    control,
    name: "ipaddress",
  });

  const handleSave = async (data) => {
    console.log("handleSave ~ data:", data);
    const res = await context?.request({
      method: "POST",
      url: "virtual/addVirtual",
      body: data,
    });

    if (res?.success) {
      toast.success(res?.message);
      reset();
      context?.setModal({ visible: false, data: null });

      await context?.request({
        url: `virtual/getAllVirtual`,
        model: "vpclist",
        method: "POST",
      });
      await context?.request({
        url: `server/getAllServer`,
        model: "serverlist",
        method: "POST",
      });
    } else {
      toast.error(res?.message);
    }
  };

  const handleAddIp = () => {
    appendIp({});
  };
  const handleRemoveIp = () => {
    removeIp(fieldsIp.length - 1);
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
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <InputText
            {...register("username", { required: "username оруулна уу." })}
            id="username"
            type="text"
            placeholder="Нэр"
            className={`w-full text-sm mb-1 ${
              errors.username ? "p-invalid" : ""
            }`}
          />
          {errors.username && (
            <small className="p-error">{errors.username.message}</small>
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
          <label htmlFor="server" className="block text-sm font-medium mb-2">
            Сервер
          </label>
          <Controller
            name="server"
            control={control}
            rules={{ required: "Server сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="server"
                options={serverList}
                placeholder="Сервер сонгох"
                className={`w-full text-sm ${errors.server ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.server && (
            <small className="p-error">{errors.server.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="dns" className="block text-sm font-medium mb-2">
            Домайн нэр
          </label>
          <InputText
            {...register("dns", { required: "Домайн нэр оруулна уу." })}
            id="dns"
            type="text"
            placeholder="Нэр"
            className={`w-full text-sm mb-1 ${errors.dns ? "p-invalid" : ""}`}
          />
          {errors.dns && (
            <small className="p-error">{errors.dns.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="ram" className="block text-sm font-medium mb-2">
            Рам
          </label>
          <Controller
            name="ram"
            control={control}
            rules={{ required: "Рам оруулна уу." }}
            render={({ field, fieldState }) => (
              <InputNumber
                {...field}
                id="ram"
                mode="decimal"
                value={field.value}
                min={0}
                onChange={(e) => field.onChange(e.value)}
                placeholder="Рам"
                className={`w-full text-sm ${
                  fieldState.error ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.ram && (
            <small className="p-error">{errors.ram.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="ramunit" className="block text-sm font-medium mb-2">
            Рам нэгж
          </label>
          <Controller
            name="ramunit"
            control={control}
            rules={{ required: "Рам нэгж сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="ramunit"
                options={RamUnit}
                placeholder="Рам нэгж сонгох"
                className={`w-full text-sm ${
                  errors.ramunit ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.ramunit && (
            <small className="p-error">{errors.ramunit.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="cpu" className="block text-sm font-medium mb-2">
            CPU
          </label>
          <Controller
            name="cpu"
            control={control}
            rules={{ required: "CPU оруулна уу." }}
            render={({ field, fieldState }) => (
              <InputNumber
                {...field}
                id="cpu"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                placeholder="CPU"
                className={`w-full text-sm ${
                  fieldState.error ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.cpu && (
            <small className="p-error">{errors.cpu.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="cpuunit" className="block text-sm font-medium mb-2">
            CPU нэгж
          </label>
          <Controller
            name="cpuunit"
            control={control}
            rules={{ required: "CPU нэгж сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="cpuunit"
                options={CpuUnit}
                placeholder="Рам нэгж сонгох"
                className={`w-full text-sm ${
                  errors.cpuunit ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.cpuunit && (
            <small className="p-error">{errors.cpuunit.message}</small>
          )}
        </div>
        <div className="flex flex-row gap-2 align-items-center">
          <div className="field">
            <label
              htmlFor={`hard`}
              className="block text-sm font-medium mb-2"
            >
              Hard нэр
            </label>
            <Controller
              name={`hard`}
              control={control}
              rules={{ required: "Hard нэр оруулна уу." }}
              render={({ field }) => {
                return (
                  <Dropdown
                    {...field}
                    value={field?.value}
                    id={`hard`}
                    options={hardList}
                    placeholder="Hard сонгох"
                    className={`w-full text-sm mb-1 ${
                      errors.hard ? "p-invalid" : ""
                    }`}
                  />
                );
              }}
            />
            {errors.hard && (
              <small className="p-error">{errors.hard.message}</small>
            )}
          </div>
          <div className="field">
            <label
              htmlFor="usedhard"
              className="block text-sm font-medium mb-1"
            >
              Hard эзлэх хэмжээ (GB)
            </label>
            <Controller
              name="usedhard"
              control={control}
              rules={{ required: "Hard хэмжээ оруулна уу." }}
              render={({ field, fieldState }) => (
                <InputNumber
                  {...field}
                  id="usedhard"
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  placeholder="Hard хэмжээ"
                  className={`w-full text-sm ${
                    fieldState.error ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            {errors.usedhard && (
              <small className="p-error">{errors.usedhard.message}</small>
            )}
          </div>
        </div>

        {fieldsIp.map((item, index) => (
          <div
            className="flex flex-row gap-2 align-items-center justify-content-between"
            key={item.id}
          >
            <div className="field">
              <label
                htmlFor={`ipaddress-${index}`}
                className="block text-sm font-medium mb-2"
              >
                IP address
              </label>
              <InputText
                {...register(`ipaddress.${index}`, {
                  required: "IP оруулна уу.",
                })}
                id={`ipaddress-${index}`}
                type="text"
                placeholder="Ip address"
                className={`w-full text-sm mb-1 ${
                  errors.ipaddress?.[index] ? "p-invalid" : ""
                }`}
              />
              {errors.ipaddress?.[index] && (
                <small className="p-error">
                  {errors.ipaddress[index].message}
                </small>
              )}
            </div>

            {fieldsIp.length === index + 1 && (
              <div className="flex gap-2">
                <div className="field">
                  <label
                    htmlFor="ipremove"
                    className="block text-sm font-medium"
                  >
                    IP хасах
                  </label>
                  <Button
                    icon="pi pi-minus"
                    className="w-full text-sm bg-red-500 border-none"
                    onClick={handleRemoveIp}
                  />
                </div>
                <div className="field">
                  <label htmlFor="ipadd" className="block text-sm font-medium">
                    IP нэмэх
                  </label>
                  <Button
                    icon="pi pi-plus"
                    className="w-full text-sm bg-green-500 border-none"
                    onClick={handleAddIp}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="field">
          <label htmlFor="os" className="block text-sm font-medium mb-2">
            Төрөл
          </label>
          <Controller
            name="os"
            control={control}
            rules={{ required: "OS сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="os"
                options={VpcType}
                placeholder="OS сонгох"
                className={`w-full text-sm ${errors.os ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.os && <small className="p-error">{errors.os.message}</small>}
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

export default VirtualAddEdit;
