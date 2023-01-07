let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("Ram")) || []

let calculate = ()=>{
    let carticon = document.getElementById("cartAmount")
    carticon.innerHTML= (basket.map((x)=> x.item).reduce((x,y) => x + y , 0 ));
    /*
    ! reduce funtion ko hamne yaha per items ko add karne ke liye use kiya gaya he 
    */
}
calculate();

let generateCartItems = ()=>{
    if(basket.length !==0){
       return ShoppingCart.innerHTML = basket.map((x)=>{
        console.log(x);
        let{ id , item } =x;
        let search = ShopItemsData.find((y)=>y.id === id) || []
        
        return `
        <div  class="cart-item">
        <img width="100" Class="img" src=${search.img} alt="" />
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.prise}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3>$ ${item * search.prise } </h3>
        </div>
      </div>
      `;
      })
       .join("")//it remove the coma after the items
    }
    else{
    
        ShoppingCart.innerHTML=``;
        label.innerHTML=`
        <h2 style="font-size: 2.5rem;" > Cart is Empty </h2>
        <a href = "index.html">
            <button class = "button"> Back To Home</button>
        </a>
        `;
    }
};
generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("Ram", JSON.stringify(basket));
  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("Ram", JSON.stringify(basket));
  };
  
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculate();
    TotalAmount();
  };
  
  let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("Ram", JSON.stringify(basket));
  };
  
  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("Ram", JSON.stringify(basket));
  };
  
  let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = ShopItemsData.find((y)=>y.id === id) || []
  
          return item * search.prise;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      label.innerHTML = `
      <h2 style="font-size: 1.5rem;" class="total"  >Total Bill : $ ${amount}</h2>
      <a href="./index.html">
      <button class="button"><span>Home Page</span></button>
        </a>
      <button onclick="clearCart()" class="button"><span>Clear Cart<span></button>
      `;
    } else return;
  };
  
  TotalAmount();
