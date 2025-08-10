import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminRoute({ children }) {
  const userCookie = Cookies.get("User");

  if (!userCookie) {
    return <Navigate to="/Auth/Login" replace />;
  }

 try {
    const user = JSON.parse(userCookie);
    if (user.Role !== "admin") {
      return <Navigate to="/Page404" replace />;
    }
   
    return children;
  } catch {
    return <Navigate to="/Auth/Login" replace />;
  }
}
