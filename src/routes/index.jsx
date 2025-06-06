import NavbarOnly from "../layouts/NavbarOnly/index.jsx";
import Home from "../pages/Home";
import Detail from "../pages/Detail.jsx";
import Brand from "../pages/Brand.jsx";
import FAQS from "../pages/FAQS.jsx";
import Product from "../pages/Product.jsx";
import Stories from "../pages/Stories.jsx";
import Cart from "../pages/Cart.jsx";
import Order_Confirmation from "../pages/Order_Confirmation.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import DefaultLayout from "../layouts/DefaultLayout/index.jsx";
const PublicRoutes = [
    {path : '/', component: Home},
    {path : '/Products/Detail/:id', component: Detail, layout : NavbarOnly},
    {path : '/Brand', component: Brand, layout : NavbarOnly},
    {path : '/FAQS', component: FAQS, layout : NavbarOnly},
    {path : '/Product', component: Product, layout : NavbarOnly},
    {path : '/Stories', component: Stories, layout : NavbarOnly},
    {path : '/Cart', component: Cart, layout : NavbarOnly},
    {path : '/OrderConfirmation', component: Order_Confirmation, layout : NavbarOnly},
    {path : '/Auth/Login', component: Login, layout : NavbarOnly},
    {path : '/Auth/Register', component: Register, layout : NavbarOnly},
]
const PrivateRoutes = []
export {PublicRoutes,PrivateRoutes}