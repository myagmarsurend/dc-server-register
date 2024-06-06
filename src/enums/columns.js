import Formatter from "../utils/data-formatter";

const InsYmdColumn = {
  title: "Бүртгэсэн огноо",
  dataIndex: "insymd",
  key: "insymd",
  width: 120,
  align: "center",
  body: (value) => <Formatter value={value} format="date" />,
};

/* Хэрэглэгчийн жагсаалтын хүснэгтийн баганууд */
export const UserListColumns = [
  {
    title: "Код",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Овог",
    dataIndex: "fname",
    key: "fname",
  },
  {
    title: "Нэр",
    dataIndex: "lname",
    key: "lname",
  },
  {
    title: "Төрөл",
    dataIndex: "role",
    key: "role",
    body: (value) => <Formatter value={value} format="role" />,
    filter: true,
    showFilterMenu: false,
  },
  {
    title: "Төлөв",
    dataIndex: "isenable",
    key: "isenable",
    width: 100,
    body: (value) => <Formatter value={value} format="isenable" />,
  },
];

export const ServerListColumns = [
  {
    title: "Нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ip Address",
    dataIndex: "ipaddress",
    key: "ipaddress",
    align: "center",
    body: (value) => {
      if (value?.length === 1)
        return <span className="white-space-nowrap">{value[0]}</span>;
      else return <span>{value?.map((i) => i + ", ")}</span>;
    },
  },
  {
    title: "Hostname",
    dataIndex: "hostname",
    key: "hostname",
    align: "center",
  },
  {
    title: "Location",
    dataIndex: "locationtype",
    key: "locationtype",
    align: "center",
    body: (value) => <Formatter value={value} format="locationtype" />,
  },
  {
    title: "Hard",
    dataIndex: "hard",
    key: "hard",
    align: "right",
    body: (value) => {
      if (value?.length === 1)
        return (
          <span className="white-space-nowrap">
            {value[0]?.hardname}-{value[0]?.hardcap}GB
          </span>
        );
      else
        return (
          <span className="white-space-nowrap">
            {value?.map((i, j) => {
              return (
                <span key={j}>
                  {i?.hardname}-{i?.hardcap}GB <br />
                </span>
              );
            })}
          </span>
        );
    },
  },
  {
    title: "Ашиглагдсан Hard",
    dataIndex: "usedhard",
    key: "usedhard",
    align: "right",
    body: (rowData) => {
      return (
        <span className="white-space-nowrap">
          {rowData?.map((i, j) => {
            return (
              <span key={j}>
                {i?.hardname}-{i?.hardusedcap}GB <br />
              </span>
            );
          })}
        </span>
      );
    },
  },
  {
    title: "Үлдсэн Hard",
    dataIndex: "currenthard",
    key: "currenthard",
    align: "right",
    body: (rowData) => {
      return (
        <span>
          {rowData?.map((i, j) => {
            return (
              <span key={j} className="white-space-nowrap">
                {i?.hardname}-{i?.hardcap - i?.hardusedcap}GB <br />
              </span>
            );
          })}
        </span>
      );
    },
  },
  {
    title: "Ram",
    dataIndex: "ram",
    key: "ram",
    align: "right",
  },
  {
    title: "Ашиглагдсан Ram",
    dataIndex: "usedram",
    key: "usedram",
    align: "right",
  },
  {
    title: "Үлдсэн Ram",
    dataIndex: "currentram",
    key: "currentram",
    align: "right",
  },
  {
    title: "Ram нэгж",
    dataIndex: "ramunit",
    key: "ramunit",
    width: 100,
    body: (value) => <Formatter value={value} format="ramunit" />,
  },
  {
    title: "CPU",
    dataIndex: "cpu",
    key: "cpu",
    width: 40,
    align: "right",
  },
  {
    title: "Ашиглагдсан Cpu",
    dataIndex: "usedcpu",
    key: "usedcpu",
    align: "right",
  },
  {
    title: "Үлдсэн Cpu",
    dataIndex: "currentcpu",
    key: "currentcpu",
    align: "right",
  },
  {
    title: "CPU нэгж",
    dataIndex: "cpuunit",
    key: "cpuunit",
    align: "center",
    width: 60,
    body: (value) => <Formatter value={value} format="cpuunit" />,
  },
  {
    title: "Тайлбар",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  InsYmdColumn,
];

export const VpcColumns = [
  {
    title: "Нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ip Address",
    dataIndex: "ipaddress",
    key: "ipaddress",
    align: "center",
    body: (value) => {
      if (value?.length === 1)
        return <span className="white-space-nowrap">{value[0]}</span>;
      else return <span>{value?.map((i) => i + ", ")}</span>;
    },
  },
  {
    title: "Домайн нэр",
    dataIndex: "dns",
    key: "dns",
  },
  {
    title: "Host name",
    dataIndex: "servername",
    key: "server",
    width: 150,
    align: "center",
    body: (value) => {
      return <span className="white-space-nowrap">{value?.name}</span>;
    },
  },
  {
    title: "Нэвтрэх нэр",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Үйлдлийн систем",
    dataIndex: "os",
    key: "os",
    width: 100,
    body: (value) => <Formatter value={value} format="os" />,
  },
  {
    title: "Ram",
    dataIndex: "ram",
    key: "ram",
    align: "right",
  },
  {
    title: "Ram нэгж",
    dataIndex: "ramunit",
    key: "ramunit",
    width: 50,
    body: (value) => <Formatter value={value} format="ramunit" />,
  },
  {
    title: "CPU",
    dataIndex: "cpu",
    key: "cpu",
    width: 100,
    align: "right",
  },
  {
    title: "CPU нэгж",
    dataIndex: "cpuunit",
    key: "cpuunit",
    width: 50,
    body: (value) => <Formatter value={value} format="cpuunit" />,
  },
  {
    title: "Host address",
    dataIndex: "server",
    key: "server",
    width: 150,
    align: "center",
    body: (value) => {
      if (value?.ipaddress?.length === 1)
        return (
          <span className="white-space-nowrap">{value?.ipaddress[0]}</span>
        );
      else return <span>{value?.ipaddress?.map((i) => i + ", ")}</span>;
    },
  },
  InsYmdColumn,
];

export const SystemListColumns = [
  {
    title: "Нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Төрөл",
    dataIndex: "type",
    key: "type",
    width: 100,
    body: (value, row, index) => (
      <Formatter value={value} format="systemtype" row={row} index={index} />
    ),
  },
  {
    title: "Real server",
    dataIndex: "virtual",
    key: "virtual",
    align: "center",
    body: (value, row) => {
      return <span className="white-space-nowrap">{value?.ipaddress[0]}</span>;
    },
  },
  {
    title: "Real domain",
    dataIndex: "domain",
    align: "center",
    key: "domain",
  },
  {
    title: "Test server",
    dataIndex: "virtual",
    key: "virtual",
    align: "center",
    body: (value, row) => {
      return <span className="white-space-nowrap">{value?.ipaddress[0]}</span>;
    },
  },
  {
    title: "Test domain",
    dataIndex: "testdomain",
    key: "testdomain",
  },
  {
    title: "Гарын авлага",
    dataIndex: "manual",
    key: "manual",
    width: 160,
    align: "center",
    body: (value, row, index) => {
      return (
        <Formatter value={value} format="seemanual" row={row} index={index} />
      );
    },
  },
  InsYmdColumn,
];

export const SettingsColumns = [
  {
    title: "Төрөл",
    dataIndex: "type",
    key: "type",
    body: (value) => <Formatter value={value} format="settingstype" />,
  },
  {
    title: "Зориулалт",
    dataIndex: "purpose",
    key: "purpose",
    body: (value) => <Formatter value={value} format="settingspurposetype" />,
  },
  {
    title: "Нэр",
    dataIndex: "label",
    key: "label",
  },
  // {
  //   title: "Утга",
  //   dataIndex: "value",
  //   key: "value",
  // },
  // {
  //   title: "Төлөв",
  //   dataIndex: "isenable",
  //   key: "isenable",
  //   width: 100,
  //   body: (value) => <Formatter value={value} format="isenable" />,
  // },
];
