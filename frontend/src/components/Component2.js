import React, {Component} from 'react';

class Component2 extends Component {
    constructor() {
        super();
        this.state={

        }
        this.findSimilarUsers = this.findSimilarUsers.bind(this)
    }
    async findSimilarUsers(){
        // const resp = await fetch('/api/findSimilarUsers');
        // const data = await resp.json();
        // console.log(data)
        let arr1= {
            idAuthor: '_idjlkjlkg8997867ghg',
            location: 'Академическая',
            interest: ["компьютерные игры", "автомобили"],
            data: 'Date',
            about: 'String',
            likes: [],
            prise: 20
        }
        const zapros_response = await fetch(
            '/api/findSimilarUsers',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify()
            });
        const resultFinish = await zapros_response.json(arr1);
        console.log(resultFinish)
    }


    render() {
        return (
            <div>
                <button onClick={this.findSimilarUsers}>показать подходящих пользователей</button>
            </div>
        );
    }
}

export default Component2;