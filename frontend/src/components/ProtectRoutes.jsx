import { Outlet, Navigate } from "react-router-dom";
import userContext from "../context/UserContext";
import { useContext } from "react";

const ProtectedRoutes = () => {
  const user = useContext(userContext);
  return user ? <Outlet /> : <Navigate to="/"/>;
};
export default ProtectedRoutes;
