const btnCart = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click",()=>{
    cart.classList.add("cart-active");
})

btnClose.addEventListener("click",()=>{
    cart.classList.remove("cart-active");
})   
// search product in text box
const btn = document.querySelectorAll(".btn");
const pics = document.querySelectorAll(".food-box");
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("keyup",(el)=>{
    searchText = el.target.value.toLowerCase().trim();
    pics.forEach((pic)=>{
        const data = pic.dataset.item;
        if(data.includes(searchText)){
            pic.style.display= "block";
        }else{
            pic.style.display = "none"
        }
    });
    // when search clicking the btn color change
    btn.forEach((btn)=>{
        btn.classList.remove("clicked")
    })
    btn[0].classList.add("clicked");
    
    
})
// btn clicking 
btn.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        e.preventDefault();
        setActiveBtn(e)
        // btn click and display food/pic
        const btnfilter = e.target.dataset.filter;
        pics.forEach((pic)=>{
            if(btnfilter=="all"){
                pic.style.display= "block"
            }else{
                const picfilter=pic.dataset.item;
                if(btnfilter==picfilter){
                    pic.style.display="block"
                }
                else{
                    pic.style.display="none"
                }
            }
        })
    })
})
// set active btn fn
function setActiveBtn(e){
    btn.forEach((button)=>{
        button.classList.remove("clicked")
    })
   e.target.classList.add("clicked")
}
document.addEventListener("DOMContentLoaded",loadFood);
function loadFood(){
    loadContent()
}

function loadContent(){
    //remove food item from cart
    let btnRemove = document.querySelectorAll(".cart-remove");
    btnRemove.forEach((btn)=>{
       btn.addEventListener("click",removeItem);
    });
    // product item change event
    let qtyElements = document.querySelectorAll(".cart-quantity");
    qtyElements.forEach((input)=>{
       input.addEventListener("change",ChangeQty);

    });
    // product cart
    let cartBtns = document.querySelectorAll(".add-cart");
    cartBtns.forEach((btn)=>{
        btn.addEventListener("click",addCart);
        
    })
    updateTotal()

}


// cart remove
function removeItem(){
    if(confirm("Are You Sure To Remove.")){
        let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
        itemlist=itemlist.filter((el)=>el.title!=title)
       this.parentElement.remove();
       loadContent();
    }
}
// change quantity
function ChangeQty(){ 
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    } 
    updateTotal();

}
let itemlist = [];
// add cart
function addCart(){
    let food = this.parentElement;
    let title = food.querySelector(".food-title").innerHTML;
    let price = food.querySelector(".food-price").innerHTML;
    let imgSrc = food.querySelector(".food-img").src;

 let newProduct ={title,price,imgSrc};
// check product in cart 
if(itemlist.find((el)=>el.title==newProduct.title)){
    alert("Product Already added in cart");
    return
}else{
    itemlist.push(newProduct)
}

    let newProductElement = createCartProduct(title,price,imgSrc);
    let cartContent = document.querySelector(".cart-content");
    let element = document.createElement("div");
    element.innerHTML = newProductElement;
    cartContent.append(element);
    loadContent();

}
function createCartProduct(title,price,imgSrc){
    return `
    <div class="cart-box">
     <img src="${imgSrc}" class="cart-img" alt="food-img">
     <div class="detail-box">
        <div class="cart-food-title">${title}</div>
         <div class="price-box">
           <div class="cart-price">${price}</div>
           <div class="cart-amt">${price}</div>
         </div>
         <input type="number" value="1" class="cart-quantity">
         </div>
         <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
</div>`
     
}
function updateTotal(){
    const cartItems = document.querySelectorAll(".cart-box");
    const totalValue = document.querySelector(".total-price");

    let total=0;
    cartItems.forEach(product=>{
        let priceElement = product.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty = product.querySelector(".cart-quantity").value;
        total+=(price*qty);
        product.querySelector(".cart-amt").innerHTML="Rs."+(price*qty)
        

    })
    totalValue.innerHTML = "Rs."+ total;

    //add product count in cartitems
    const cartCount = document.querySelector(".cart-count");
    let count = itemlist.length;
    cartCount.innerHTML=count;
    if(count==0){
        cartCount.style.display = "none";
    }
    else{
        cartCount.style.display = "block";
    }
}
