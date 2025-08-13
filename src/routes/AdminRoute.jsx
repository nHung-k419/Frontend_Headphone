import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminRoute({ children }) {
 const user = localStorage.getItem("User");
  if (!user) {
    return <Navigate to="/Auth/Login" replace />;
  }

 try {
    const user = JSON.parse(user);
    if (user.Role !== "admin") {
      return <Navigate to="/Page404" replace />;
    }
   
    return children;
  } catch {
    return <Navigate to="/Auth/Login" replace />;
  }
}
