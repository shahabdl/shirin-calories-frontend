const defaultOptions = { useToken: true, json: true, method: "get" };

const addDefaultOptions = (options) => {
  let newOptions = { ...options };
  if (!options) return defaultOptions;
  for (let key in defaultOptions) {
    if (!(key in options)) {
      newOptions[key] = defaultOptions[key];
    }
  }
  return newOptions;
};

const fetchAuth = async (config) => {
  let { method, url, options, body } = config;
  let headers = {}
  try {
    options = addDefaultOptions(options);

    let authToken;

    if (options.useToken) {
      authToken = window.localStorage.getItem("_access_token");
      if (authToken === null || authToken === "" || authToken === undefined) {
        throw new Error("Auth_Error");
      }

      headers["Authorization"] = "Bearer " + authToken;
    }

    if (options.json) {
      headers["Content-Type"] = "application/json";
    }

    if (options.formData) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    return fetch(
      url,
      {
        method: method,
        headers: headers,
        body: body,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
};

export { fetchAuth };
