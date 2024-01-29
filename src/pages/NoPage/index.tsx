import { getPageError } from "@/lib/utils";
import { useRouteError } from "react-router-dom";

export default function NoPage() {
  const error = useRouteError();

  return (
    <div className=" absolute left-[50%] top-[20%] transform translate-x-[-50%] rounded-lg border border-red-400 bg-red-50 p-4 w-[50%] flex flex-col items-center justify-center gap-5">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-red-400">{getPageError(error)}</i>
      </p>
    </div>
  );
}
