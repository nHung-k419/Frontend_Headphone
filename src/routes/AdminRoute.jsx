import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminRoute({ children }) {
  const user = localStorage.getItem("User");
  
  // const { id: idUser,Email } = user ? JSON?.parse(user) : "";
  // const user = Cookies.get("User");

  if (!user) {
    return <Navigate to="/Auth/Login" replace />;
  }

 try {
    const userLocal = JSON.parse(user);
    
    if (userLocal.Role !== "admin") {
      return <Navigate to="/Page404" replace />;
    }
   
    return children;
  } catch {
    return <Navigate to="/Auth/Login" replace />;
  }
}
