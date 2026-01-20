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
import { Ex13Detail } from './ex13-detail/ex13-detail';
import { Ex13 } from './ex13/ex13';
import { Ex19Service } from './ex19-service/ex19-service';
import { Ex19List } from './ex19-list/ex19-list';
import { Ex19 } from './ex19/ex19';
import { Form } from './form/form';
import { ReactiveForm } from './reactive-form/reactive-form';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { Ex27 } from './ex27/ex27';
const routes: Routes = [
  {path:'gioi-thieu',component: About},
  {path:'sanpham1',component: Listproduct1},
  {path:'sanpham2',component: Listproduct2},
  {path:'sanpham3',component: Listproduct3},
  {path:'form',component: Form},
  {path:'reac-form',component: ReactiveForm},
  {path:'ex26',component: FakeProductComponent},
  {path:'ex27',component: Ex27},
  {path:'list-customer', component: Listcustomer},
  {path:'list-customer-service', component: Listcustomerservice},
  {path:'list-customer-http', component: CustomerHtte},
  {path:'list-customer-http/:id', component: Customerdetail},
  {path:'list-customer-service/:id', component: Customerdetail},
  // {path:'ex13-service', component: Ex13},
  // {path:'ex13-service/:id', component: Ex13Detail},
  // { path: 'product', component: Ex19 },
  // { path: 'list-product', component: Ex19List },
  // { path: 'service-product', component: Ex19Service },
  { path: '', redirectTo: '/list-product', pathMatch: 'full' },
  {path:'**', component: Pagenotfound},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
