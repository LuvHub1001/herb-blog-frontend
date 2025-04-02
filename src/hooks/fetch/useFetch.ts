import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import { useCatchAsyncError } from "../";

export type Nullable<T> = T | undefined | null;

// FOR JSON AUTO

const useFetch = <Params extends string, FetchResult>(
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<FetchResult>,
  params: Params,
  config?: AxiosRequestConfig,
): Nullable<FetchResult> => {
  const { catchError } = useCatchAsyncError();

  const [_promise, _setPromise] = useState<Promise<void>>();
  const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">(
    "pending",
  );
  const [_result, _setResult] = useState<Nullable<FetchResult>>(null);

  const resolve = useCallback((res: FetchResult) => {
    _setStatus("fulfilled");
    _setResult(res);
  }, []);

  useEffect(() => {
    _setStatus("pending");
    _setPromise(
      fetch(params, config)
        .then(resolve)
        .catch((err: Error) => catchError(err)),
    );
  }, [params]);

  if (_promise && _status === "pending") {
    throw _promise;
  }

  return _result;
};

export default useFetch;
