let user1 ={
    id: 555,
    likes: []
};

let user2 ={
    id: 777,
    likes: []
};


function oneToTwo (){
    if(user2.likes.includes(user1.id)){
        user1.likes.push(user2.id);
        console.log(user1, user2)
        document.getElementById('divView').innerHTML = "Совпадение найдено!"
    }else{
        user1.likes.push(user2.id);


    }
}

function twoToOne (){
    if(user1.likes.includes(user2.id)){
        user2.likes.push(user1.id);
        console.log(user1, user2)
        document.getElementById('divView').innerHTML = "Совпадение найдено!"
    }else{
        user2.likes.push(user1.id);
    }
}


document.getElementById('one').onclick = ()=> {

    oneToTwo()
}

document.getElementById('two').onclick = ()=> {
    twoToOne()
}