import {cart, removeItemFromCart} from "../data/cart.js";
import {products} from "../data/products.js";
let productsSummary = "";
updateCartQuantity();
cart.forEach((product)=>{

  let productId = product.productId;

  let matchingProduct;
  products.forEach((product)=>{
    if (productId === product.id){
      matchingProduct = product;
    }
  })
  productsSummary += `
  <div class="cart-item-container js-cart-container-${product.productId}">
     <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${((matchingProduct.priceCents) / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${product.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <div class="js-update js-update-link-${matchingProduct.id}">
              <input class="quantity-input">
              <span class="save-quantity-link link-primary">Save</span>
            </div>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
            name="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>

          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>        
  `;

})

export function updateCartQuantity(){
  let totalQuantity = 0;
  cart.forEach((item)=>{
    totalQuantity += item.quantity;
  })
  document.querySelector('.return-to-home-link').innerHTML= `${totalQuantity} items`;
}

document.querySelector('.js-order-summary').innerHTML = productsSummary;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    let productId = link.dataset.productId;
    let cartItem = document.querySelector(`.js-cart-container-${productId}`);
    removeItemFromCart(productId)
    cartItem.remove();
    updateCartQuantity();
  })
})

document.querySelectorAll('.js-update-quantity').forEach((updateLink)=>{
  updateLink.addEventListener('click', ()=>{
    let productId = updateLink.dataset.productId;
    let updateHTML = document.querySelector(`.js-update-link-${productId}`).classList
    updateHTML.remove('js-update');
    
    document.querySelectorAll('.save-quantity-link').forEach((saveButton)=>{
      saveButton.addEventListener('click', ()=>{
        let quantityValue = document.querySelector('.quantity-input');

        console.log(quantityValue.value);
        quantityValue.value = "";
      })
    })
  })
})