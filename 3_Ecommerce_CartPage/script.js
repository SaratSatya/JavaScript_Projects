document.addEventListener('DOMContentLoaded', ()=>{
    const products=[
        {id:1, name:"Product 1", price: 29.99},
        {id:2, name:"Product 2", price: 19.99},
        {id:3, name:"Product 3", price: 39.99},
    ];
    let cart=JSON.parse(localStorage.getItem('cart'))||[];


    const productList=document.getElementById('product-list');
    const cartItems=document.getElementById('cart-items');
    const emptyCartMessage=document.getElementById('empty-cart');
    const cartTotalMessage=document.getElementById('cart-total');
    const totalPriceDisplay=document.getElementById('total-price');
    const checkOutBtn=document.getElementById('checkout-btn');

    products.forEach(product=>{
        const productDiv=document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML=`<span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id=${product.id}>Add to Cart</button>`;
        productList.appendChild(productDiv);
    })
    renderCart();
    productList.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON'){
            const productId=parseInt(e.target.getAttribute('data-id'));
            const product=products.find(p=>p.id===productId);
            addToCart(product);
        }
    })
    function addToCart(product){
        cart.push(product);
        saveCart();
        renderCart();
    }
    function saveCart(){
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    function renderCart(){
        cartItems.innerHTML='';
        let totalPrice=0;
        cart.forEach(item=>{
            const li=document.createElement('li');
            li.classList.add('product2');
            li.innerHTML=`<span>${item.name} - $${item.price.toFixed(2)}</span><button data-id=${item.id}>Remove</button>`;
            cartItems.appendChild(li);
            totalPrice+=item.price;
        });
        if(cart.length===0){
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
            checkOutBtn.disabled=true;
        }else{
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            totalPriceDisplay.textContent=totalPrice.toFixed(2);
            checkOutBtn.disabled=false;
        }
    }
    checkOutBtn.addEventListener('click',()=>{
        alert('Thank you for your purchase!');
        cart.length=0;
        saveCart();
        renderCart();
    })
    cartItems.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON'){
            const productId=parseInt(e.target.getAttribute('data-id'));
            const productIndex=cart.findIndex(p=>p.id===productId);
            if(productIndex>-1){
                cart.splice(productIndex,1);
                console.log(cart);
                saveCart();
                renderCart();
            }
        }
    })
    
});