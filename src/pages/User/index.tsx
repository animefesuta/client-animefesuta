import { useLocation } from "react-router-dom";

export default function User() {
  const location = useLocation();
  const routerName = location.pathname;

  return <div>${routerName}</div>;
}
