import SidebarLayout from "../layout/admin/sidebar-layout/SideBarLayout.js";
import HeadOnly from "../layout/headOnly/HeadOnly.js";
import LoginPage from "../page/Login/LoginPage.js";
import CategoryManage from "../page/categories_manage/CategoryManage.js";
import CategoryDetail from "../page/category-detail/CategoryDetail.js";
import ProductDetail from "../page/product/detail/ProductDetail.js";
import Home from "../page/user/home/Home.js";
import Product from "../page/user/product/Product.js";
import WarehouseDetail from "../page/warehouse/warehouse-detail/WarehouseDetail.js";
import WarehouseManage from "../page/warehouse/warehouse-manage/WarehouseManage.js";
import VariationForm from "../part/product-item/variation-form-modal.js";
import ProductAdd from "../part/product/product-add-form";
import Personal from "../page/user/personal/Personal.js";
import UserAddressPage from "../page/user/user-address-page/UserAddressPage.js";
import PaymentMethods from "../page/user/payment-methods/PaymentMethods.js";
import Register from "../page/register/Register.js";
import OrderManage from "../page/order_manage/index.js";
import DashboardPage from "../page/dashboard/DashboardPage.js";
import UserAddAddress from "../page/user/user-add-address/UserAddAddressPage.js";
import UserCartPage from "../page/user/user-cart/UserCartPage.js";
import UserOrderPage from "../page/user/user-order-page/UserOrderPage.js";
export const publicRouter = [
    { 'path': "/login", 'component': LoginPage },
    { 'path': "/register", 'component': Register },
    { 'path': "/", 'component': Home, 'layout': HeadOnly },
    { 'path': "/items", 'component': VariationForm, 'layout': SidebarLayout },
    { 'path': "/user", 'component': Personal, 'layout': HeadOnly },
    { 'path': "/user/address", 'component': UserAddressPage, 'layout': HeadOnly },
    { 'path': "/user/address/add", 'component': UserAddAddress, 'layout': HeadOnly },
    { 'path': "/user/payment", 'component': PaymentMethods, 'layout': HeadOnly },
    { 'path': "/user/payment/add", 'component': UserAddAddress, 'layout': HeadOnly },
    { 'path': "/cart", 'component': UserCartPage, 'layout': HeadOnly },
    { 'path': "/order", 'component': UserOrderPage, 'layout': HeadOnly },
    { 'path': "/product", 'component': Product, 'layout': HeadOnly },
    { 'path': "/add", 'component': ProductAdd, 'layout': SidebarLayout },
    { 'path': "/admin", 'component': DashboardPage, 'layout': SidebarLayout },
    { 'path': "/admin/product", 'component': ProductDetail, 'layout': SidebarLayout },
    { 'path': "/admin/category", 'component': CategoryManage, 'layout': SidebarLayout },
    { 'path': "/admin/category/:id", 'component': CategoryDetail, 'layout': SidebarLayout },
    { 'path': "/admin/warehouse", 'component': WarehouseManage, 'layout': SidebarLayout },
    { 'path': "/admin/warehouse/:id", 'component': WarehouseDetail, 'layout': SidebarLayout },
    { 'path': "/admin/order-manage", 'component': OrderManage, 'layout': SidebarLayout }


]