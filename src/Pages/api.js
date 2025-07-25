import axios from 'axios';
import { getBrowserId } from './browserId';

const API = axios.create({
  baseURL: 'https://btcbackend-e7yt.onrender.com',
  headers: { 'X-Browser-Id': getBrowserId() }
});

// fetch all drugs
export function fetchProducts() {
  return API.get('/drugs');
}

// add a product to the cart (or bump quantity)
export function addToCart(productId, qty = 1) {
  return API.post('/cart/add', { productId, quantity: qty });
}

// remove a product entirely from the cart
export function removeFromCart(productId) {
  return API.post('/cart/remove', { productId });
}

// explicitly set a product’s quantity in the cart
export function updateCartItem(productId, quantity) {
  return API.post('/cart/update', { productId, quantity });
}

// fetch the current cart (with product snapshots)
export function fetchCart() {
  return API.get('/cart');
}
export function placeOrder(orderData) {
  return API.post('/order/place', orderData);
}


// Pages/api.js
export function confirmOrder(orderId, pin) {
  return API.post(`/order/updatestatus/${orderId}`, { pin });
}



export function downloadReceipt(orderId) {
  return API.get(`/order/receipt/${orderId}`, { responseType: 'blob' }); // ✅ FIXED
}
