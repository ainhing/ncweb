export interface ICustomer {
  Id: string;
  Name: string;
  gender:string;
  Image: string;
  
}

export interface ICustomerType {
  CustomerTypeId: number;
  CustomerTypeName: string;
  Customers: ICustomer[];
}
