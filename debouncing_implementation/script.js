
function decouple(fetchSuggestion,delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer=setTimeout(()=>fetchSuggestion.apply(this,args),delay);
    }
}

async function fetchSuggestion(query){
    console.log(query);
    //fetch();
}

const decoupledFetchSuggestion=decouple(fetchSuggestion,400);



document.querySelector('#site-search').addEventListener('input',(e)=>decoupledFetchSuggestion(e.target.value));