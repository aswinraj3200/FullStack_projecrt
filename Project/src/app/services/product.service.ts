import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product, cart, order } from 'src/data-type';

import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  addProduct(Data: Product) {
    const accessToken = this.authService.getAccessToken();
    console.log('accesstoken : ', accessToken);
    console.warn(accessToken);

    if (accessToken != null) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      }
      return this.http.post(`http://localhost:3000/api/products`, Data, httpOption)
    } else {
      return throwError('the user is not authorized')
    }
  };

  productList(): Observable<Product[] | undefined> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.get<Product[]>(`http://localhost:3000/api/products/adminId`, httpOption)
    } else {
      return throwError('not authenticated')
    }
  };

  deleteProduct(id: number) {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.delete(`http://localhost:3000/api/products/${id}`, httpOption);
    } else {
      return throwError('you are not authenticated');
    }
  };

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/api/products/find/${id}`);
  };

  updateProduct(product: Product) {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.put<Product>(`http://localhost:3000/api/products/${product.id}`, product, httpOption)
    } else {
      return throwError('you are not authenticted')
    }
  };

  popularProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/api/products?limit=3`);
  }

  trendyProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/api/products?limit=8`);
  }

  searchProduct(query: string): Observable<Product[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<Product[]>(`http://localhost:3000/api/products/search`, { params })
  }
  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData)
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items)
    }
  }
  addToCart(cartData: cart) {
    const accessToken = this.authService.getUserAccessToken();

    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.post(`http://localhost:3000/api/carts/`, cartData, httpOption);
    } else {
      return throwError('you are are not authenticated');
    }
  }

  getCartList(userId: string) {
    const accessToken = this.authService.getUserAccessToken();
    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.get<Product[]>(`http://localhost:3000/api/carts/?userID=` + userId,
        { observe: 'response', headers: httpOption.headers })
        .subscribe((result) => {
          if (result && result.body) {
            this.cartData.emit(result.body)
          }
        })
    } else {
      return throwError('you are are not authenticated');
    }
  }
  removeToCart(_id: string) {
    const accessToken = this.authService.getUserAccessToken()
    if (accessToken) {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      }
      return this.http.delete(`http://localhost:3000/api/carts/${_id}`,{ ...httpOptions, observe: 'response' })
    } else {
      return throwError('you are are not authenticated');
    }
  }


  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    const accessToken = this.authService.getUserAccessToken();
    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.get<cart[]>(`http://localhost:3000/api/carts/?userID=` + userData._id, httpOption);
    } else {
      return throwError('not Authenticated')
    }
  }

  orderNow(data: order) {
    return this.http.post(`http://localhost:3000/api/orders/`, data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    const accessToken = this.authService.getUserAccessToken();
    if (accessToken) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.get<order[]>(`http://localhost:3000/api/orders/find/?userId=` + userData._id, httpOption);
    } else {
      return throwError('not Authenticated')
    }
  }
  deleteCartItem(_id:string) {
    const accessToken = this.authService.getUserAccessToken();
    if (accessToken) {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'token': 'Bearer ' + accessToken,
        })
      };
      return this.http.delete<order[]>(`http://localhost:3000/api/carts/${_id}`, {...httpOptions, observe: 'response'})
        .subscribe((result) => {
          if (result) { 
            this.cartData.emit([]);
          }
        });
    } else {
      return throwError('You are not authenticated');
    }
  }
  cancelOrder(_id:string) {
    return this.http.delete(`http://localhost:3000/api/orders/${_id}`);
  }
}
