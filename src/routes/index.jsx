// Page Client
import NavbarOnly from "../layouts/NavbarOnly/index.jsx";
import Home from "../pages/Client/Home.jsx";
import Detail from "../pages/Client/Detail.jsx";
import Brand from "../pages/Client/Brand.jsx";
import FAQS from "../pages/Client/FAQS.jsx";
import Product from "../pages/Client/Product.jsx";
import About from "../pages/Client/About.jsx";
import Cart from "../pages/Client/Cart.jsx";
import Order_Confirmation from "../pages/Client/Order_Confirmation.jsx";
import Login from "../pages/Client/Login.jsx";
import Register from "../pages/Client/Register.jsx";
import DefaultLayout from "../layouts/DefaultLayout/index.jsx";
import Order_Items from "../pages/Client/Order_Items.jsx";
// Page Admin
import Admin from "../pages/Admin/Admin.jsx";
import layoutAdmin from "../layouts/LayoutAdmin/index.jsx";
import Categories from "../pages/Admin/Categories.jsx";
import DashBoard from "../pages/Admin/DashBoard.jsx";
import Products from "../pages/Admin/Products.jsx";
import Order from "../pages/Admin/Order.jsx";
import Reviews from "../pages/Admin/Reviews.jsx";
import Users from "../pages/Admin/Users.jsx";
import ProductVariants from "../pages/Admin/ProductVariants.jsx";
import BrandAdmin from "../pages/Admin/Brand.jsx";
const PublicRoutes = [
    {path : '/', component: Home},
    {path : '/Products/Detail/:id', component: Detail, layout : NavbarOnly},
    {path : '/Brand', component: Brand, layout : NavbarOnly},
    {path : '/FAQS', component: FAQS, layout : NavbarOnly},
    {path : '/Product', component: Product, layout : NavbarOnly},
    {path : '/About', component: About, layout : NavbarOnly},
    {path : '/Cart', component: Cart, layout : NavbarOnly},
    {path : '/OrderConfirmation', component: Order_Confirmation, layout : NavbarOnly},
    {path : '/OrderItems', component: Order_Items, layout : NavbarOnly},
    {path : '/Auth/Login', component: Login, layout : NavbarOnly},
    {path : '/Auth/Register', component: Register, layout : NavbarOnly},
    // Amin
    {path : '/Admin', component: Admin,layout : layoutAdmin},
    {path : '/Admin/Categories', component: Categories,layout : layoutAdmin},
    {path : '/Admin/DashBoard', component: DashBoard,layout : layoutAdmin},
    {path : '/Admin/Products', component: Products,layout : layoutAdmin},
    {path : '/Admin/Orders', component: Order,layout : layoutAdmin},
    {path : '/Admin/Reviews', component: Reviews,layout : layoutAdmin},
    {path : '/Admin/ProductVariants', component: ProductVariants,layout : layoutAdmin},
    {path : '/Admin/Users', component: Users,layout : layoutAdmin},
    {path : '/Admin/Brand', component: BrandAdmin,layout : layoutAdmin},

]
const PrivateRoutes = []
export {PublicRoutes,PrivateRoutes}