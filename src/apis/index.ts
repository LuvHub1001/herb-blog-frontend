import axios, {
  HttpStatusCode,
  isAxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const AXIOS_TIMEOUT = 5000;
const RETRY_TIMEOUT = 10000;
const RETRY_MAX_COUNT = 3;
let RETRY_COUNT = 0;

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: AXIOS_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    return req;
  },
  (err: Error) => {
    if (isAxiosError(err)) {
      switch (err.status) {
        case HttpStatusCode.NotFound: {
          console.log(
            `CANNOT FOUND ENDPOINT <REQ> :: ${err.config?.baseURL} ${err.config?.url}`,
          );
          break;
        }

        case HttpStatusCode.BadRequest: {
          console.log(`BAD REQUEST <REQ> :: ${err.config?.headers}`);
          break;
        }

        default: {
          console.log(`AXIOS ERROR <REQ> :: ${err.message} ${err.status}`);
          break;
        }
      }
    } else throw err;
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    RETRY_COUNT = 3;
    return res;
  },
  (err: Error) => {
    if (isAxiosError(err)) {
      switch (err.status) {
        case HttpStatusCode.NotFound: {
          console.log(
            `CANNOT FOUND ENDPOINT <RES> :: ${err.config?.baseURL} ${err.config?.url}`,
          );
          break;
        }

        case HttpStatusCode.Unauthorized: {
          console.log(`UNAUTHORIZED <RES> :: ${err.config?.headers}`);
          break;
        }

        case HttpStatusCode.Forbidden: {
          console.log(`FORBIDDEN <RES> :: ${err.config?.headers}`);
          break;
        }

        case HttpStatusCode.BadGateway: {
          while (RETRY_COUNT++ <= RETRY_MAX_COUNT) {
            backoffRequest(
              RETRY_TIMEOUT * RETRY_COUNT,
              err.config as InternalAxiosRequestConfig,
            );
          }

          console.log(`BAD GATEWAY <RES> :: ${err.config}`);
          break;
        }

        default: {
          console.log(`AXIOS ERROR <RES> :: ${err.message} ${err.status}`);
          break;
        }
      }
    } else throw err;
  },
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.get(url, config);
};

export const post = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.post(url, data, config);
};

export const patch = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.patch(url, data, config);
};

export const remove = async (url: string, config?: AxiosRequestConfig) => {
  return await axiosInstance.delete(url, config);
};

const backoffRequest = async (
  times: number,
  config: InternalAxiosRequestConfig,
) => {
  setTimeout(async () => {
    axiosInstance.request(config);
  }, times);
};
