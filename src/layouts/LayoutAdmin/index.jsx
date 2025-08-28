import SidebarAdmin from "../../components/Sidebar/SidebarAdmin";
import NavbarAdmin from "../NavbarAdmin";
const layoutAdmin = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />

      <div className="">
        <NavbarAdmin />
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default layoutAdmin;
// flex-1 flex flex-col