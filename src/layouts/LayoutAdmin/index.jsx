import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import NavbarAdmin from "../NavbarAdmin";
const layoutAdmin = ({ children }) => {
  return (
    <div className="flex ">
      <SidebarAdmin />
      <div>
        <NavbarAdmin />
        {children}
      </div>
    </div>
  );
};

export default layoutAdmin;
