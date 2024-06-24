import SidebarLayout from "../layout/admin/sidebar-layout/SideBarLayout.js";
import HeadOnly from "../layout/headOnly/HeadOnly.js";
import LoginPage from "../page/Login/LoginPage.js";
import Home from "../page/user/home/Home.js";
import VariationForm from "../part/product-item/variation-form-modal.js";
import ProductAdd from "../part/product/product-add-form";
import Personal from "../page/user/personal/Personal.js";
import UserAddressPage from "../page/user/user-address-page/UserAddressPage.js";
import PaymentMethods from "../page/user/payment-methods/PaymentMethods.js";
import Register from "../page/register/Register.js";
import UserCartPage from "../page/user/user-cart/UserCartPage.js";
import UserOrderPage from "../page/user/user-order-page/UserOrderPage.js";
import ProductPage from "../page/user/product-page/ProductPage.js";
import UserOrderSuccessPage from "../page/user/order-success/UserOrderSuccessPage.js";
import UserOrderPurchase from "../page/user/order-purchase/UserOrderPurchase.js";
import AdminCategoryManagePage from "../page/admin/category_manage-page/AdminCategoryManagePage.js";
import AdminCategoryDetailPage from "../page/admin/category-detail-page/AdminCategoryDetailPage.js";
import AdminOrderManagePage from "../page/admin/order_manage-page/AdminOrderManagePage.js";
import AdminUserDetailPage from "../page/admin/user-details-page/AdminUserDetailsPage.js";
import AdminUserManagePage from "../page/admin/user-manage-page/AdminUserManagePage.js";
import AdminDashboardPage from "../page/admin/dashboard-page/DashboardPage.js";
import AdminProductManagePage from "../page/admin/product_manage-page/AdminProductManagePage.js";
import ProductDetailPage from "../page/admin/product-detail-page/ProductDetail.js";
import AdminOrderDetailPage from "../page/admin/order-detail-page/AdminOrderDetailPage.js";
import AdminWarehouseManagePage from "../page/admin/warehouse-manage/AdminWarehouseManagePage.js";
import AdminWareHouseDetailPage from "../page/admin/warehouse-detail-page/AdminWareHouseDetailPage.js";
export const publicRouter = [
    { 'path': "/login", 'component': LoginPage },
    { 'path': "/register", 'component': Register },
    { 'path': "/", 'component': Home, 'layout': HeadOnly },
    { 'path': "/items", 'component': VariationForm, 'layout': SidebarLayout },
    { 'path': "/user", 'component': Personal, 'layout': HeadOnly },
    { 'path': "/user/address", 'component': UserAddressPage, 'layout': HeadOnly },
    { 'path': "/user/payment", 'component': PaymentMethods, 'layout': HeadOnly },
    { 'path': "/user/payment/add", 'component': <></>, 'layout': HeadOnly },
    { 'path': "/cart", 'component': UserCartPage, 'layout': HeadOnly },
    { 'path': "/order", 'component': UserOrderPage, 'layout': HeadOnly },
    { 'path': "/order/success", 'component': UserOrderSuccessPage, 'layout': HeadOnly },
    { 'path': "/purchase", 'component': UserOrderPurchase, 'layout': HeadOnly },
    { 'path': "/product", 'component': ProductPage, 'layout': HeadOnly },
    { 'path': "/add", 'component': ProductAdd, 'layout': SidebarLayout },
    { 'path': "/admin", 'component': AdminDashboardPage, 'layout': SidebarLayout },
    { 'path': "/admin/product", 'component': ProductDetailPage, 'layout': SidebarLayout },
    { 'path': "/admin/product-manage", 'component': AdminProductManagePage, 'layout': SidebarLayout },
    { 'path': "/admin/category", 'component': AdminCategoryManagePage, 'layout': SidebarLayout },
    { 'path': "/admin/category/:id", 'component': AdminCategoryDetailPage, 'layout': SidebarLayout },
    { 'path': "/admin/warehouse", 'component': AdminWarehouseManagePage, 'layout': SidebarLayout },
    { 'path': "/admin/warehouse/detail", 'component': AdminWareHouseDetailPage, 'layout': SidebarLayout },
    { 'path': "/admin/order-manage", 'component': AdminOrderManagePage, 'layout': SidebarLayout },
    { 'path': "/admin/order", 'component': AdminOrderDetailPage, 'layout': SidebarLayout },
    { 'path': "/admin/user/manage", 'component': AdminUserManagePage, 'layout': SidebarLayout },
    { 'path': "/admin/user", 'component': AdminUserDetailPage, 'layout': SidebarLayout },
]