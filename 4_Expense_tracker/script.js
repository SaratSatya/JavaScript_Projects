document.addEventListener('DOMContentLoaded', ()=>{
  const addExpenseBtn = document.querySelector('#expense-form button');
  const expenseName=document.getElementById('expense-name');
  const expenseAmount=document.getElementById('expense-amount');
  const expenseList=document.getElementById('expense-list');
  const totalAmountDisplay=document.getElementById('total-amount');


  const cart=JSON.parse(localStorage.getItem('expenseCart')) || [];
  renderExpenseCart();

  addExpenseBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const expenseNameValue=expenseName.value;
    const expenseAmountValue=parseInt(expenseAmount.value);
    // console.log(typeof expenseAmountValue);
    // console.log(expenseNameValue);
    // console.log(typeof expenseNameValue);
    if(expenseNameValue && expenseAmountValue){
      const expense={
        id:Date.now(),
        name:expenseNameValue,
        amount:expenseAmountValue
      }
      addToExpenseCart(expense);
      expenseName.value='';
      expenseAmount.value='';
    }
  })
  function addToExpenseCart(expense){
    cart.push(expense);
    saveExpenseCart();
  }
  function saveExpenseCart(){
    localStorage.setItem('expenseCart', JSON.stringify(cart));
    renderExpenseCart();
  }

  function renderExpenseCart(){
    let totalAmount=0;
    expenseList.innerHTML='';
    cart.forEach(expense=>{
      totalAmount+=expense.amount;
      const li=document.createElement('li');
      li.innerHTML=`${expense.name} - $${expense.amount}<button data-id=${expense.id}>Remove</button>`;
      expenseList.appendChild(li);
    })  
    totalAmountDisplay.textContent=`Total: $${totalAmount}`;
  }
  expenseList.addEventListener('click', (e)=>{
    if(e.target.tagName==='BUTTON'){
      const id=parseInt(e.target.getAttribute('data-id'));
      const index=cart.findIndex(expense=>expense.id===id);
      if(index!==-1){
        cart.splice(index,1);
        saveExpenseCart();
        renderExpenseCart();
      }
      
    }
  })


})