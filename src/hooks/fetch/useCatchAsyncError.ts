import { useState } from "react";

const useCatchAsyncError = () => {
  const [_, _setError] = useState<Error | null>(null);
  const catchError = (err: Error) => {
    _setError(() => {
      throw err;
    });
  };

  return { catchError };
};

export default useCatchAsyncError;
