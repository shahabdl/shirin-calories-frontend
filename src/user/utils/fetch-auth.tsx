interface OptionsType {
  [key: string]: string | boolean
}

const defaultOptions = { useToken: true, json: true, formData: "" };

const addDefaultOptions = (options?: OptionsType) => {
  let newOptions: OptionsType = { ...options };
  if (!options) return defaultOptions;
  for (let key in defaultOptions) {
    if (!(key in options)) {
      newOptions[key] = defaultOptions[key as keyof typeof defaultOptions];
    }
  }
  return newOptions;
};

interface ConfigType {
  method: string,
  url: string,
  options?: OptionsType,
  body?: string
}

const fetchAuth = async (config: ConfigType) => {
  let { method, url, options, body } = config;
  let headers: Record<string, string> = {}
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
    throw new Error(error as string);
  }
};

export { fetchAuth };
