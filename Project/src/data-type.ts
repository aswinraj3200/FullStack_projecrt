export interface Product{
    title:string,
    price:number,
    desc:string,
    image:string,
    categories: string[],
    color: string,
    size:string,
    id:number,
    _id:string,
    quantity: undefined | number,
    productId: undefined | number
}
export interface signUp {
    username: string,
    email: string,
    password: string
}
export interface logIn {
    email: string,
    password: string
}
export interface cart{
    title:string,
    price:number,
    desc:string,
    image:string,
    categories: string[],
    color: string,
    size:string,
    _id:string,
    userId?: string;
    quantity?: number,
    productId:number,
    id: number | undefined,
}
export interface priceSummary {
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order { 
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId:string,
    _id:string,
    id: number | undefined,
}