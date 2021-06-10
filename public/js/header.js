let headersnbbar = document.querySelector('#header_snb_bar') 

snbbaronFn = function(){
    console.log('snb')
    
    headersnbbar.setAttribute('class','snbbaron')
}

snbbaroutFn = function(){
    console.log(event.target)
    headersnbbar.setAttribute('class','snbbarout')
}


