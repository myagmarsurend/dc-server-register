export const _request = ({ url, method, body, isfile, isservice }) => {
  const token = localStorage.getItem("access_token");
  const errorSms = {
    message: "Алдаа",
    success: false,
    data: [],
  };
  let Authorization = "Bearer " + token;

  if (method === "GET") {
    return fetch(url, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: Authorization,
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return res;
      })
      .catch((error) => {
        errorSms.message = error.message;
        return errorSms;
      });
  }

  if (isfile) {
    const request = new Request(url, {
      method,
      headers: new Headers({ Authorization: Authorization }),
      body,
    });
    return fetch(request)
      .then((res) => {
        if (res.status === 200) return res.json();
        else return res;
      })
      .catch((error) => {
        errorSms.message = error.message;
        return errorSms;
      });
  }

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: Authorization,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      else return res;
    })
    .catch((error) => {
      if (error.message.includes("Failed to fetch") && isservice)
        errorSms.message = "Service тэй холбогдож чадсангүй.";
      else errorSms.message = error.message;

      return errorSms;
    });
};

const fetchRequest = async ({
  body,
  url,
  method,
  model,
  dispatchEvent,
  notification,
  isfile,
  isservice,
}) => {
  try {
    if (model) dispatchEvent({ type: model.request });

    const res = await _request({ url, method, body, isfile, isservice });
    /* !res.success && notification({ type: "warning", message: res.message });

        if (res.success) {
          model.response.includes('update') && notification({ type: "success", message: res.message });
          model.response.includes("create") &&
            notification({ type: "success", message: res.message });
        } */

    if (model) dispatchEvent({ type: model.response, response: res });

    return res;
  } catch (error) {
    return dispatchEvent({
      type: model.error,
      error: error,
    });
  }
};

export { fetchRequest };
