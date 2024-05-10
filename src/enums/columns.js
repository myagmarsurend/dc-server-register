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
    body: (value, record) => {
      return (
        <span>
          {record?.hard?.map((i, j) => {
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
    body: (value, record) => {
      return (
        <span>
          {record?.hard?.map((i, j) => {
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
    body: (value, record) => (record?.ram || 0) - (record?.usedram || 0),
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
    body: (value, record) => (record?.cpu || 0) - (record?.usedcpu || 0),
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
