import React, {Component} from 'react';

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    async sendLikeMail(){
        console.log("Запрос ушел")
        // const zapros_response = await fetch(
        //     'http://localhost:5000/eee',
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         method: 'POST',
        //         body: JSON.stringify({ task: 33 })
        //     });
        // const data = await zapros_response.text();
        // console.log('супер дата21', data)
        // console.log(data)
        // this.props.Task(data)


        const resp = await fetch('http://localhost:5000/sendLikeMail');
        const data = await resp.json();
        console.log(data)
    }

    render() {
        return (
            <div>
                <button onClick={this.sendLikeMail}>Обновить статус поиска (+ три дня)</button>
            </div>
        );
    }
}

export default Component1;