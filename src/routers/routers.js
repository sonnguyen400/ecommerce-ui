import SidebarLayout from "../layout/admin/sidebar-layout/SideBarLayout.js";
import HeadOnly from "../layout/headOnly/HeadOnly.js";
import LoginPage from "../page/Login/LoginPage.js";
import CardPage from "../page/user/cart/Cart.js";
import Card from "../page/user/cart/Cart.js";
import CategoryManage from "../page/categories_manage/CategoryManage.js";
import CategoryDetail from "../page/category-detail/CategoryDetail.js";
import AddProduct from "../page/product/add/AddProduct.js";
import ProductDetail from "../page/product/detail/ProductDetail.js";
import Home from "../page/user/home/Home.js";
import Order from "../page/user/order/Order.js";
import Product from "../page/user/product/Product.js";
import WarehouseDetail from "../page/warehouse/warehouse-detail/WarehouseDetail.js";
import WarehouseManage from "../page/warehouse/warehouse-manage/WarehouseManage.js";
import CategoryForm from "../part/category/category-add-form";
import VariationForm from "../part/product-item/variation-form-modal.js";
import ProductAddForm from "../part/product/product-add-form";
import ProductAdd from "../part/product/product-add-form";
import ProductItemForm from "../part/product/product-item-form";
import Personal from "../page/user/personal/Personal.js";
import Address from "../page/user/address/Address.js";
import AddressAdd from "../page/user/address-add/AddressAdd.js";
import Payment from "../page/user/payment-methods/PaymentMethods.js";
import PaymentMethods from "../page/user/payment-methods/PaymentMethods.js";
import Register from "../page/register/Register.js";
import OrderManage from "../page/order_manage/index.js";
export const publicRouter = [
    { 'path': "/login", 'component': LoginPage },
    { 'path': "/register", 'component': Register },
    { 'path': "/add", 'component': ProductAdd, 'layout': SidebarLayout },
    { 'path': "/items", 'component': VariationForm, 'layout': SidebarLayout },
    { 'path': "/", 'component': Home, 'layout': HeadOnly },
    { 'path': "/user", 'component': Personal, 'layout': HeadOnly },
    { 'path': "/user/address", 'component': Address, 'layout': HeadOnly },
    { 'path': "/user/address/add", 'component': AddressAdd, 'layout': HeadOnly },
    { 'path': "/user/payment", 'component': PaymentMethods, 'layout': HeadOnly },
    { 'path': "/user/payment/add", 'component': AddressAdd, 'layout': HeadOnly },
    { 'path': "/cart", 'component': CardPage, 'layout': HeadOnly },
    { 'path': "/order", 'component': Order, 'layout': HeadOnly },
    { 'path': "/product", 'component': Product, 'layout': HeadOnly },
    { 'path': "/admin/product", 'component': ProductDetail, 'layout': SidebarLayout },
    { 'path': "/admin/category", 'component': CategoryManage, 'layout': SidebarLayout },
    { 'path': "/admin/category/:id", 'component': CategoryDetail, 'layout': SidebarLayout },
    { 'path': "/admin/warehouse", 'component': WarehouseManage, 'layout': SidebarLayout },
    { 'path': "/admin/warehouse/:id", 'component': WarehouseDetail, 'layout': SidebarLayout },
    { 'path': "/admin/order-manage", 'component': OrderManage, 'layout': SidebarLayout }


]