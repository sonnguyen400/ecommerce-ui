import SidebarLayout from "../layout/admin/sidebar-layout/SideBarLayout.js";
import HeadOnly from "../layout/headOnly/HeadOnly.js";
import LoginPage from "../page/Login/LoginPage.js";
import Home from "../page/user/home/Home.js";
import Personal from "../page/user/personal/Personal.js";
import UserAddressPage from "../page/user/user-address-page/UserAddressPage.js";
import PaymentMethods from "../page/user/payment-methods/PaymentMethods.js";
import Register from "../page/user/register/Register.js";
import UserCartPage from "../page/user/user-cart/UserCartPage.js";
import ProductPage from "../page/user/product-page/ProductPage.js";
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
import SearchProductPage from "../page/user/search-product-page/SearchProductPage.js";
import UserOrderDetailPage from "../page/user/user-order-detail-page/UserOrderDetailsPage.js";
import UserResultPage from "../page/user/result/UserResultPage.js";
import UserOrderCheckOutPage from "../page/user/user-order-checkout-page/UserOrderCheckoutPage.js";
export const publicRouter = [
    { 'path': "/login", 'component': LoginPage },
    { 'path': "/register", 'component': Register },
    { 'path': "/product", 'component': ProductPage, 'layout': HeadOnly },
    { 'path': "/", 'component': Home, 'layout': HeadOnly },
    { 'path': "/product/search", 'component': SearchProductPage, 'layout': HeadOnly },
]
export const userRouter = [
    { 'path': "/result", 'component': UserResultPage, 'layout': HeadOnly },
    { 'path': "/user", 'component': Personal, 'layout': HeadOnly },
    { 'path': "/user/address", 'component': UserAddressPage, 'layout': HeadOnly },
    { 'path': "/cart", 'component': UserCartPage, 'layout': HeadOnly },
    { 'path': "/checkout", 'component': UserOrderCheckOutPage, 'layout': HeadOnly },
    { 'path': "/order", 'component': UserOrderDetailPage, 'layout': HeadOnly },
    { 'path': "/purchase", 'component': UserOrderPurchase, 'layout': HeadOnly },
]
export const adminRouter = [
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
    { 'path': "/admin/user", 'component': AdminUserDetailPage, 'layout': SidebarLayout }
]