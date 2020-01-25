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

        let arr1FromSession= {
            idAuthor: '_idjlkjlkg8997867ghg',
            location: 'Бульвар Рокоссовского',
            interest: [],
            data: 'Date',
            about: 'String',
            likes: [],
            prise: 25
        }
        const reqComparison = await fetch(
            '/api/findSimilarUsers',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(arr1FromSession)
            });
        const arrSortUserId = await reqComparison.json();
        console.log(arrSortUserId)
    }


    render() {
        return (
            <div>
                <button onClick={this.findSimilarUsers}>Показать подходящих пользователей</button>
            </div>
        );
    }
}

export default Component2;