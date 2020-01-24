
let arr1= {
    idAuthor: '_idjlkjlkg8997867ghg',
    location: 'Академическая',
    interest: ["компьютерные игры", "автомобили"],
    data: 'Date',
    about: 'String',
    likes: [],
    prise: 20
}
let arr2 = []
let arr3 =  [
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
    location: 'Фрунзенская',
    interest: ['программирование', 'экономика', 'юриспруденция', "образование", "армия", "компьютерные игры", "автомобили" ],
        data: 'Date',
    about: 'String',
    likes: [],
    prise: 20
}]

for (let i = 0; i <arr3.length ; i++) {
    if(arr1.location === arr3[i].location){
        arr2.push(arr3[i])
    }
}
console.log(arr2)