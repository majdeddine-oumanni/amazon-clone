export const cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 3
},{
  productId: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
  quantity: 30
}];

function saveData(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(productId){
  let quantitySelected = document.querySelector(`.js-quantity-selector-${productId}`);
  let isExist;
  cart.forEach((element)=>{
    if(productId === element.productId){
      isExist = element
    }
  })
  if(isExist){
    isExist.quantity += 1;
  }else{
    cart.push({
      productId: productId,
      quantity: Number(quantitySelected.value)
    })
  }
  saveData();
}

export function removeItemFromCart(productId){
  cart.forEach((product, index)=>{
    if (product.productId === productId){
      cart.splice(index, 1)
    }
  })
  saveData();
}