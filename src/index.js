let shop = document.getElementById('shop');


/*
 ! let basket = JSON.parse(localStorage.getItem(Ram));
*/
let basket = JSON.parse(localStorage.getItem("Ram")) || []

console.log("here i have change some code which you can't see ")

let generateShop = ()=>{
    return (shop.innerHTML= ShopItemsData
        .map((x)=>{
            let{id, name,prise,desc,img }= x;
            let search = basket.find((x)=> x.id===id) || []
            /** 
             *! yaha par hamne jo uper code likha he 39 line me usko mene x.name, x.prise etc ko na likhna pade 
             *! esliye likha line number 45 se le kar 60 tak ke bich me 
            **/
        return `
        <div id = product-id-${id} class="item">
        <img width="209" src="${img}" alt="t-shirt">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
        <div class="price-quantity">
            <h2>$${prise}</h2>
            <div class="buttons">
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                <div id = ${id} class="quantity">
                ${search.item === undefined? 0: search.item}
                </div>
                <i onclick ="decrement(${id})" class="bi bi-dash-lg"></i>
            </div>
        </div>
        </div>
        </div>
        `
        ;
    }) .join("") ); /* join us for remove space and invisibal comma */
}; /** it's ESX(es six arrow function) function */

generateShop(); 

let increment = (id) => {
    let SelectItem = id;
    let search = basket.find((x) => x.id === SelectItem.id);
    
     if(search === undefined){
        basket.push({
            id: SelectItem.id,
            item: 1,
        });
     }
     else{
        search.item += 1;
     }
 
 /*
  ! localStorage.setItem("Ram", JSON.stringify(basket)) ;
  ! the help of this we have save data in local storage 
  ! and then we have next task which is retrive the data 
  ! so this is done in bucket section in line number "34"
  */
 /*
 !  localStorage.setItem("Ram", basket); this statement is use for save a data in web brouser 
 !  jese ki yaha per ham basket me items ko add kar rahe the or refresh karne ke bad sare items remove ho gaye he to ye code line use save kar de ga 
 !  jab hame page refresh karte he or jo data pehle the vo hat jata he refresh karne se * to ye 
 !  code line ki help se se data hate ga ni refresh karne ke bad bhi 
  */
 //console.log(basket);
 update(SelectItem.id);
 localStorage.setItem("Ram", JSON.stringify(basket)) ;
};


let decrement = (id) => {
    let SelectItem = id;
    let search = basket.find((x) => x.id === SelectItem.id);
    
    if(search === undefined) return;
     else if(search.item === 0) return;
     else{
        search.item -= 1;
     }
     update(SelectItem.id);// it decrese the value of cart ammount
   
     basket = basket.filter((x)   => x.item !==0);
 //console.log(basket);
   
    localStorage.setItem("Ram", JSON.stringify(basket)) ;
};


let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculate();
};


let calculate = ()=>{
    let carticon = document.getElementById("cartAmount")
    carticon.innerHTML= (basket.map((x)=> x.item).reduce((x,y) => x + y , 0 ));
    /*
    ! reduce funtion ko hamne yaha per items ko add karne ke liye use kiya gaya he 
    */
}

calculate();//yaha per calculate likhe he khuki jise cart ka amount number update ho jaye jab ham page ko reloade kare 