import Formatter from "../utils/data-formatter";

const StatusColumn = {
  title: "Төлөв",
  dataIndex: "isenable",
  key: "isenable",
  // align: "center",
  width: 100,
  body: (value) => <Formatter value={value} format="isenable" />,
};

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
  },
  StatusColumn,
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
      if (value?.length === 1) return <span>{value[0]}</span>;
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
          <span>
            {value[0]?.hardname}-{value[0]?.hardcap}
          </span>
        );
      else
        return (
          <span>
            {value?.map((i, j) => {
              return (
                <span key={j}>
                  {i?.hardname}-{i?.hardcap} <br />
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
        <span>
          {rowData?.map((i, j) => {
            return (
              <span key={j}>
                {i?.hardname}-{i?.hardusedcap} <br />
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
              <span key={j}>
                {i?.hardname}-{i?.hardcap - i?.hardusedcap} <br />
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
      if (value?.length === 1) return <span>{value[0]}</span>;
      else return <span>{value?.map((i) => i + ", ")}</span>;
    },
  },
  {
    title: "Домайн нэр",
    dataIndex: "dns",
    key: "dns",
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
    title: "Server address",
    dataIndex: "server",
    key: "server",
    width: 150,
    align: "center",
    body: (value) => {
      if (value?.ipaddress?.length === 1)
        return <span>{value?.ipaddress[0]}</span>;
      else return <span>{value?.ipaddress?.map((i) => i + ", ")}</span>;
    },
  },
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
      return <span>{value?.ipaddress[0]}</span>;
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
      return <span>{value?.ipaddress[0]}</span>;
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
];
