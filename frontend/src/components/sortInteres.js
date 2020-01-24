
let arr1= {
    idAuthor: '_idjlkjlkg8997867ghg',
    location: 'Академическая',
    interest: ["компьютерные игры", "автомобили"],
    data: 'Date',
    about: 'String',
    likes: [],
    prise: 20
}

let arr2 =  [
    {idAuthor: '_idjlkjlkg8997867ghg111',
    location: 'Академическая',
    interest: ['программирование', "компьютерные игры", "автомобили"],
    data: 'Date',
    about: 'String',
    likes: [],
    prise: 21},
    {
    idAuthor: '_idjlkjlkg8997867ghg222',
    location: 'Академическая',
    interest: ["компьютерные игры", "автомобили", ],
    data: 'Date',
    about: 'String',
    likes: [],
    prise: 20
}, {
    idAuthor: '_idjlkjlkg8997867ghg333',
    location: 'Академическая',
    interest: ['программирование', 'экономика', 'юриспруденция', "образование", "армия", "компьютерные игры", "автомобили" ],
        data: 'Date',
    about: 'String',
    likes: [],
    prise: 20
}]

let allComparison = [];

arr2.map(function(e) {
    let сomparison = [];
    let userId = {idAuthor: e.idAuthor}
    let location = {location: e.location}
    let data = {data: e.data}
    let about = {about: e.about}
let likes = {likes: e.likes}
let prise = {prise: e.prise}

    сomparison.push(userId)
    сomparison.push(location)
        сomparison.push(data)
        сomparison.push(about)
        сomparison.push(likes)
        сomparison.push(prise)

        let arrInterests = []
        for (let i = 0; i < arr1.interest.length; i++) {
            for (let k = 0; k < e.interest.length; k++) {
                if (arr1.interest[i] === e.interest[k]) {
                    arrInterests.push(arr1.interest[i])
                }
            }
        }
    сomparison.push(arrInterests)
    allComparison.push(сomparison)
    }
)
// console.log(allComparison)

let lengthAllComparison = []
for (let i = 20; i>=0; i--) {
    for (let j = 0; j < allComparison.length; j++) {

        if (allComparison[j][6].length === i) {
            lengthAllComparison.push(allComparison[j])
        }
    }
}

let finishREsult = [];

for (let i = 0; i < lengthAllComparison.length; i++) {
    if(lengthAllComparison[i][6].length !== 0){
        finishREsult.push(lengthAllComparison[i])
    }
}

// console.log(finishREsult)

sortUserPrise = [];

for (let i = 0; i < finishREsult.length; i++) {
    if(finishREsult[i][5].prise <= arr1.prise ){
        sortUserPrise.push(finishREsult[i])
    }
}

console.log(sortUserPrise)

let arrSortUserId = [];

for (let i = 0; i < sortUserPrise.length; i++) {
    arrSortUserId.push(sortUserPrise[i][0].idAuthor)
}

console.log(arrSortUserId)