import { Pagenotfound } from './pagenotfound/pagenotfound';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listproduct1 } from './listproduct1/listproduct1';
import { Listproduct3 } from './listproduct3/listproduct3';
import { Listproduct2 } from './listproduct2/listproduct2';
import { Listcustomer } from './listcustomer/listcustomer';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomerservice } from './listcustomerservice/listcustomerservice';
import { CustomerHtte } from './customer-htte/customer-htte';
const routes: Routes = [
  {path:'gioi-thieu',component: About},
  {path:'sanpham1',component: Listproduct1},
  {path:'sanpham2',component: Listproduct2},
  {path:'sanpham3',component: Listproduct3},
  {path:'list-customer', component: Listcustomer},
  {path:'list-customer-service', component: Listcustomerservice},
  {path:'list-customer-http', component: CustomerHtte},
  {path:'list-customer-http/:id', component: Customerdetail},
  {path:'list-customer-service/:id', component: Customerdetail},
  
  {path:'**', component: Pagenotfound},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
