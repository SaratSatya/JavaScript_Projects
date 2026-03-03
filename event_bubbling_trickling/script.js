document.querySelector('#grandparent').addEventListener('click',()=>{
    console.log("grand parent div is clicked")
})

document.querySelector('#parent').addEventListener('click',(e)=>{
    console.log("parent div is clicked")
    e.stopPropagation();
})

document.querySelector('#child').addEventListener('click',(e)=>{
    e.stopPropagation();
    console.log("child div is clicked")
})