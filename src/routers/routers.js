import SidebarLayout from "../layout/admin/sidebar-layout/SideBarLayout.js";
import HeadOnly from "../layout/headOnly/HeadOnly.js";
import LoginPage from "../page/Login/LoginPage.js";
import CardPage from "../page/cart/Cart.js";
import Card from "../page/cart/Cart.js";
import CategoryManage from "../page/categories_manage/CategoryManage.js";
import CategoryDetail from "../page/category-detail/CategoryDetail.js";
import AddProduct from "../page/product/add/AddProduct.js";
import ProductDetail from "../page/product/detail/ProductDetail.js";
import Home from "../page/user/home/Home.js";
import Product from "../page/user/product/Product.js";
import CategoryForm from "../part/category/category-add-form";
import VariationForm from "../part/product-item/variation-form-modal.js";
import ProductAddForm from "../part/product/product-add-form";
import ProductAdd from "../part/product/product-add-form";
import ProductItemForm from "../part/product/product-item-form";
export const publicRouter=[
    {'path':"/login",'component':LoginPage},
    {'path':"/add",'component':ProductAdd,'layout':SidebarLayout},
    {'path':"/items",'component':VariationForm,'layout':SidebarLayout},
    {'path':"/admin/product",'component':ProductDetail,'layout':SidebarLayout},
    {'path':"/admin/category",'component':CategoryManage,'layout':SidebarLayout},
    {'path':"/admin/category/:id",'component':CategoryDetail,'layout':SidebarLayout},
    {'path':"/",'component':Home,'layout':HeadOnly},
    {'path':"/cart",'component':CardPage,'layout':HeadOnly},
    {'path':"/product",'component':Product,'layout':HeadOnly}
]