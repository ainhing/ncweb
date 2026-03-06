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
import { Books } from './books/books';
import { BookDetailCoConponentmponent } from './book-detail-co-conponentmponent/book-detail-co-conponentmponent';
import { BookNew } from './book-new/book-new';
import { BookUpdate } from './book-update/book-update';
import { BookDelete } from './book-delete/book-delete';
import { Fashion } from './fashion/fashion';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { Login } from './login/login';
import { BookList } from './book-list/book-list';
import { BookDetail } from './book-detail/book-detail';
import { BookEdit } from './book-edit/book-edit';
import { FashionNew } from './fashion-new/fashion-new';
import { FashionUpdate } from './fashion-update/fashion-update';
import { FashionDelete } from './fashion-delete/fashion-delete';
import { Fashionadmin } from './fashionadmin/fashionadmin';
import { FashionEdit } from './fashion-edit/fashion-edit';
import { Fashiondetail58 } from './fashiondetail58/fashiondetail58';
import { Ex64productlist } from './ex64productlist/ex64productlist';
import { Ex64cart } from './ex64cart/ex64cart';
const routes: Routes = [
  {path:'gioi-thieu',component: About},
  {path:'sanpham1',component: Listproduct1},
  {path:'sanpham2',component: Listproduct2},
  {path:'sanpham3',component: Listproduct3},
  {path:'form',component: Form},
  {path:'reac-form',component: ReactiveForm},
  {path:'ex26',component: FakeProductComponent},
  {path:'ex27',component: Ex27},
  {path:'ex39',component: Books},
  {path:'ex41',component: BookDetailCoConponentmponent},
  {path:'ex43',component: BookNew},
  { path: 'ex45/:id', component: BookUpdate },
  { path: 'ex45', component: BookUpdate },
  { path: 'ex47', component: BookDelete },
  {path:'ex41/:id',component: BookDetailCoConponentmponent},
  {path:'ex53',component: Fashion},
  {path:'ex54/:id',component: FashionDetail},
  {path:'ex54',component: FashionDetail},
  {path:'ex55',component: FashionNew},
  {path:'ex56',component: FashionUpdate},
  {path:'ex56/:id',component: FashionUpdate},
  {path:'ex57',component: FashionDelete},
  {path:'ex57/:id',component: FashionDelete},
  {path:'list-customer', component: Listcustomer},
  {path:'list-customer-service', component: Listcustomerservice},
  {path:'list-customer-http', component: CustomerHtte},
  {path:'list-customer-http/:id', component: Customerdetail},
  {path:'list-customer-service/:id', component: Customerdetail},
  {path:'book-list', component: BookList}, 
  {path:'book-new', component: BookNew}, 
  {path:'book-edit/:id', component: BookEdit}, 
  {path:'book-edit', component: BookEdit}, 
  {path:'book-detail/:id', component: BookDetail}, 
  {path:'book-detail', component: BookDetail}, 
  {path:'ex64product', component: Ex64productlist}, 
  {path:'ex64cart', component: Ex64cart}, 
  {path:'fashionadmin', component: Fashionadmin}, 
  {path:'fashionnew', component: FashionNew}, 
  {path:'fashionedit', component: FashionEdit}, 
  {path:'fashionedit/:id', component: FashionEdit}, 
  {path:'fashiondetail/', component: Fashiondetail58}, 
  {path:'fashiondetail/:id', component: Fashiondetail58}, 
  // {path:'ex13-service', component: Ex13},
  // {path:'ex13-service', component: Ex13},
  // {path:'ex13-service/:id', component: Ex13Detail},
  // { path: 'product', component: Ex19 },
  // { path: 'list-product', component: Ex19List },
  // { path: 'service-product', component: Ex19Service },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  
  {path:'**', component: Pagenotfound},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
