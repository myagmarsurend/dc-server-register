import React, { Fragment, useContext, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { CpuUnit, LocationUnit, RamUnit } from "../../enums/enum";
import { GlobalContext } from "../../context";
import toast from "react-hot-toast";
import { Password } from "primereact/password";
import decrypt from "../../utils/decrypt";
import { PASSWORD_SECRET } from "../../context/state";

const ServerAddEdit = () => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const context = useContext(GlobalContext);
  const data = context?.modal?.data;
  const header = data ? "Сервер засах" : "Шинэ сервер нэмэх";
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
      name: data?.name || "",
      ram: data?.ram || 0,
      ramunit: data?.ramunit || RamUnit[0]?.value,
      cpu: data?.cpu || 0,
      cpuunit: data?.cpuunit || CpuUnit[0]?.value,
      hard: data?.hard || [{ hardname: "", hardcap: 0, type: null, _id: null }],
      ipaddress: data?.ipaddress || ["10."],
      hostname: data?.hostname || "",
      locationtype: data?.locationtype || LocationUnit[0]?.value,
      description: data?.description || "",
      password: data?.password || "",
      passwordAgain: data?.passwordAgain || "",
      _id: data?._id || null,
      newtype: "",
    },
  });

  const newtype = watch("newtype");

  const hardList = [
    ...context?.resoptionhard,
    {
      value: newtype,
      label: (
        <Fragment>
          <InputText
            {...register("newtype")}
            id="newtype"
            type="text"
            placeholder="Hard төрөл нэмэх"
            className={`w-full text-sm mb-1`}
          />
        </Fragment>
      ),
    },
  ];

  const password = watch("password");

  useEffect(() => {
    if (data && password) {
      let decrypted = decrypt(password, PASSWORD_SECRET);
      setDecryptedPass(decrypted);
    }
    // eslint-disable-next-line
  }, [password]);

  const {
    fields: fieldsHard,
    append: appendHard,
    remove: removeHard,
  } = useFieldArray({
    control,
    name: "hard",
  });

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

    data?.hard?.map((h) => {
      if (h?.type === "newtype" && data?.newtype === "") {
        toast.error("Hard төрөл оруулна уу");
        return;
      }
    });

    const res = await context?.request({
      method: "POST",
      url: "server/addServer",
      body: data,
    });

    if (res?.success) {
      toast.success(res?.message);
      reset();
      context?.setModal({ visible: false, data: null });

      await context?.request({
        url: `server/getAllServer`,
        model: "serverlist",
        method: "POST",
      });
    } else {
      toast.error(res?.message);
    }
  };

  const handleAddHard = () => {
    appendHard({ hardname: "", hardcap: 0, type: null });
  };
  const handleRemoveHard = () => {
    removeHard(fieldsHard.length - 1);
  };

  const handleAddIp = () => {
    appendIp();
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
                optionValue="value"
                optionLabel="label"
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
                optionValue="value"
                optionLabel="label"
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

        {fieldsHard.map((item, index) => (
          <div className="flex flex-row gap-2 align-items-center" key={item.id}>
            <div className="field">
              <label
                htmlFor={`hardname-${index}`}
                className="block text-sm font-medium mb-2"
              >
                Hard нэр
              </label>
              <InputText
                {...register(`hard.${index}.hardname`, {
                  required: "Hard нэр оруулна уу.",
                })}
                id={`hardname-${index}`}
                type="text"
                placeholder="Hard нэр"
                className={`w-full text-sm mb-1 ${
                  errors.hard?.[index]?.hardname ? "p-invalid" : ""
                }`}
              />
              {errors.hard?.[index]?.hardname && (
                <small className="p-error">
                  {errors.hard[index].hardname.message}
                </small>
              )}
            </div>
            <div className="field">
              <label
                htmlFor={`hardcap-${index}`}
                className="block text-sm font-medium mb-1"
              >
                Hard хэмжээ (GB)
              </label>
              <Controller
                name={`hard.${index}.hardcap`}
                control={control}
                rules={{ required: "Hard хэмжээ оруулна уу." }}
                render={({ field, fieldState }) => (
                  <InputNumber
                    {...field}
                    id={`hardcap-${index}`}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    placeholder="Hard хэмжээ"
                    className={`w-full text-sm ${
                      fieldState.error ? "p-invalid" : ""
                    }`}
                  />
                )}
              />
              {errors.hard?.[index]?.hardcap && (
                <small className="p-error">
                  {errors.hard[index].hardcap.message}
                </small>
              )}
            </div>
            <div className="field">
              <label
                htmlFor={`type-${index}`}
                className="block text-sm font-medium mb-1"
              >
                Hard төрөл
              </label>
              <Controller
                name={`hard.${index}.type`}
                control={control}
                rules={{ required: "Hard төрөл оруулна уу." }}
                render={({ field, fieldState }) => {
                  return (
                    <Dropdown
                      {...field}
                      value={field?.value}
                      id={`type-${index}`}
                      optionValue="value"
                      optionLabel="label"
                      options={hardList}
                      placeholder="Hard төрөл"
                      className={`w-full text-sm mb-1 ${
                        fieldState.error ? "p-invalid" : ""
                      }`}
                    />
                  );
                }}
              />
              {errors.hard?.[index]?.type && (
                <small className="p-error">
                  {errors.hard[index].type.message}
                </small>
              )}
            </div>

            {fieldsHard.length === index + 1 && (
              <div className="flex gap-2">
                <div className="field">
                  <label
                    htmlFor="hardremove"
                    className="block text-sm font-medium"
                  >
                    Hard хасах
                  </label>
                  <Button
                    icon="pi pi-minus"
                    className="w-full text-sm bg-red-500 border-none"
                    onClick={handleRemoveHard}
                  />
                </div>
                <div className="field">
                  <label
                    htmlFor="hardadd"
                    className="block text-sm font-medium"
                  >
                    Hard нэмэх
                  </label>
                  <Button
                    icon="pi pi-plus"
                    className="w-full text-sm bg-green-500 border-none"
                    onClick={handleAddHard}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

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
          <label htmlFor="hostname" className="block text-sm font-medium mb-2">
            Hostname
          </label>
          <InputText
            {...register("hostname", { required: "Hostname оруулна уу." })}
            id="hostname"
            type="text"
            placeholder="Hostname"
            className={`w-full text-sm mb-1 ${
              errors.hostname ? "p-invalid" : ""
            }`}
          />
          {errors.hostname && (
            <small className="p-error">{errors.hostname.message}</small>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="locationtype"
            className="block text-sm font-medium mb-2"
          >
            Байрлал
          </label>
          <Controller
            name="locationtype"
            control={control}
            rules={{ required: "Байрлал сонгоно уу." }}
            render={({ field }) => (
              <Dropdown
                {...field}
                value={field?.value}
                id="locationtype"
                optionValue="value"
                optionLabel="label"
                options={LocationUnit}
                placeholder="Роль сонгох"
                className={`w-full text-sm ${
                  errors.locationtype ? "p-invalid" : ""
                }`}
              />
            )}
          />
          {errors.locationtype && (
            <small className="p-error">{errors.locationtype.message}</small>
          )}
        </div>

        {userData?.role === 1 && data && (
          <div className="field">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Нууц үг
            </label>
            <Password
              id="password"
              value={decryptedPass || undefined}
              placeholder="Нууц үг"
              className={`w-full text-sm mb-1 }`}
              disabled
              toggleMask
            />
          </div>
        )}

        {!data && (
          <>
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
                    value={field?.value}
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
                <small className="p-error">
                  {errors.passwordAgain.message}
                </small>
              )}
            </div>
          </>
        )}
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

export default ServerAddEdit;
