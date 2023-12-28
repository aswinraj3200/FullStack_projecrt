import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthClassGuard } from './auth-class.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateComponentComponent } from './seller-update-component/seller-update-component.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


const routes: Routes = [
  {path:'',component:HomeComponent,},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[AuthClassGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[AuthClassGuard]},
  {path:'seller-update-component/:id',component:SellerUpdateComponentComponent,canActivate:[AuthClassGuard]},
  {path:'search/:query',component:SearchComponent,canActivate:[AuthClassGuard]},
  {path:'details/:id',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-order',component:MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
