import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <CircularProgress />
    </div>
  );
}

export default Loading;
