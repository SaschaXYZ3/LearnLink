import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem("role");

  // Überprüfen, ob der Benutzer eingeloggt ist und die richtige Rolle hat
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
