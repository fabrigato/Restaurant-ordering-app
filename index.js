import {menuArray} from "/data.js"

const main = document.getElementById("main")

const paymentForm = document.getElementById("payment-form")
let targetMenuObj = []
document.addEventListener("click", function(e) {
    if(e.target.dataset.add) {
        handleAddBtn(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }else if(e.target.dataset.complete){
        handleCompleteBtn(e.target.dataset.complete)
    }
})

document.addEventListener("submit",function(e){
    e.preventDefault()
    document.getElementById("payment").style.display = "none"
    document.getElementById("container").style.background = "#FFFFFF"
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get("fullName")
    const message = `<div class="bottom-message">
    <p class="message">Thanks, ${name}! Your order is on its way!</p>
    </div>`
    
    targetMenuObj =[]
    
    renderItems()
    main.innerHTML += message
}
)

function handleAddBtn(btnId) {
    targetMenuObj.push(menuArray.filter(function(menu){
       return menu.id == btnId
   })[0]
   )
   renderItems()
   main.innerHTML += renderMeals() 
}
   
function renderMeals(){
    let renderCheckout = ""
    const total = targetMenuObj.reduce((total, currentPrice) => 
        total + currentPrice.price, 0)
        
    const MealAndPrice = targetMenuObj.map(menu => {
        return `
        <div class="cart" id="cart">
            <p class="checkout-meal">${menu.name}<button class="remove-btn" data-remove="${menu.id}">REMOVE</button></p>
            <p class="checkout-price">$${menu.price}</p>
        </div>
        `
    }).join("")
        
        renderCheckout += `
                   <section id="checkout-section">
                        <div class="checkout" id="checkout">
                        <p class="checkout-title">Your order</p>
                        ${MealAndPrice}
                        <div class="checkout-border"></div>
                        <div class="total-price">
                        <p>Total price:</p>
                        <p class="total-amount">$${total}</p>
                        </div>
                        <button class="complete-btn" data-complete="${targetMenuObj.id}">Complete order</button>
                    </div>
                </section> `
        return renderCheckout           
}

function handleRemoveBtn(itemId){
    targetMenuObj = targetMenuObj = targetMenuObj.filter(menu => targetMenuObj.splice(targetMenuObj.indexOf(menu), 1
    ) 
    )
    
    if(targetMenuObj.length === 0) {
        document.getElementById("checkout-section").innerHTML = ""
    }else{
    document.getElementById("checkout-section").innerHTML = renderMeals()
    }
}

function handleCompleteBtn(btnId){
    document.getElementById("container").style.background = "whitesmoke"
    document.getElementById("payment").style.display = "block" 
}

function renderItems() {
    let items = ""
     menuArray.map((item) => {
          return items += `
                <section>
                    <div class="menu-option">
                        <div>
                            <h1 class="emoji">${item.emoji}</h1>
                        </div>
                        <div class="meal">
                        <h1 class="meal-name">${item.name}</h1>
                        <p class="ingredients">${item.ingredients}</p>
                        <p class="price">$${item.price}</p>
                        </div>
                        <button class="add-to-card-btn" data-add="${item.id}">+</button>
                    </div>
                    <div class="border">
                    </div>  
                </section>
            `
     })
 main.innerHTML = items
}
renderItems()
