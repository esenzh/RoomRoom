import React, {Component} from 'react';

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    async sendLikeMail(){
        console.log("Запрос ушел")
        const resp = await fetch('/api/sendLikeMail');
        const data = await resp.json();
        console.log(data)
    }

    render() {
        return (
            <div>
                <button onClick={this.sendLikeMail}><img src="https://img.icons8.com/flat_round/48/000000/filled-like.png"/></button>
            </div>
        );
    }
}

export default Component1;
