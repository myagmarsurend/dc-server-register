import React, { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import * as Context from "../";
import { fetchRequest } from "../fetch";

// export const API_URL = "http://10.0.0.36:3000/";
const API_URL = "http://10.150.10.73:3002/";
// const API_URL = "http://localhost:3002/";

const initialState = {
  islogin: !!JSON.parse(localStorage.getItem("auth")),
  _auth: JSON.parse(localStorage.getItem("auth")),
  notification: false,
  lang: "mn",
  filter: undefined,
  errorMsg: "",
  isOpenError: false,
  monitoring: {},
  // guideContent: [],
};

const models = {};

// API URL
const service = `${API_URL}api/`;

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(Context.appReducer, initialState);

  const addmodel = ({ model }) => {
    models[model] = {
      request: `request_${model}`,
      response: `response_${model}`,
      error: `error_${model}`,
    };
  };
  const navigate = useNavigate();
  const request = async ({
    url,
    model,
    body,
    method = "GET",
    isfile,
    isservice,
  }) => {
    try {
      if (isfile && body) {
        let formData = new FormData();
        Object.keys(body).map((keyname) => {
          if (!keyname.includes("prev"))
            formData.append(keyname, body[keyname] ? body[keyname] : null);

          return null;
        });
        body = formData;
      }

      if (model) {
        addmodel({ model: model });
      }

      const res = await fetchRequest({
        url: `${service}${url}`,
        method,
        body,
        isservice,
        model: model ? models[model] : null,
        dispatchEvent: dispatch,
        isfile: isfile,
      });
      if (res.status === 401) {
        localStorage.removeItem("auth");
        localStorage.removeItem("access_token");
        setLogin(false);
        navigate("/login");
      }
      /* notification: notification, */
      return res;
    } catch (error) {
      console.log("%c 🍬 error: ", error);
    }
  };

  const setLogin = (login) => dispatch({ type: "login", response: login });
  const setFilter = (data) => dispatch({ type: "filter", response: data });
  const setError = (data) => dispatch({ type: "setError", response: data });
  const setMonitoring = (data) =>
    dispatch({ type: "setMonitoring", response: data });
  // const setGuide = (data) => dispatch({ type: "setGuide", response: data });
  const setVpc = (data) => dispatch({ type: "setVPC", response: data });
  /*  const notification = ({ type, message, description }) => {
    Ant.notification[type]({
      message: message,
      description: description,
    });
  }; */
  return (
    <React.Fragment>
      <GlobalContext.Provider
        value={{
          ...state,
          request: request,
          setLogin,
          setFilter,
          setError,
          // setGuide,
          setVpc,
          setMonitoring,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </React.Fragment>
  );
};

export const SITE_NAME = "Сервер бүртгэл";
export const PASSWORD_VALIDATOR = [
  { required: true, message: "Нууц үг оруулна уу." },
];
