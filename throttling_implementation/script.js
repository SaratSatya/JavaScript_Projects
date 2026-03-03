async function fetchDetails(){
    console.log('fetching details....');
    //fetch();
}

function throttle(fetchDetails,delay){
    let last=0;
    return function(...args){
        const now=Date.now();
        if(now-last>=delay){
            last=now;
            return fetchDetails.apply(this,args);
        }
    }
}

const throttlefetchDetails=throttle(fetchDetails,5000);
document.querySelector("#button1").addEventListener('click',(e)=>throttlefetchDetails())
