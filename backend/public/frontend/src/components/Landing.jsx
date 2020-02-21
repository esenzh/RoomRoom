import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div className='choice_question'>
            <div>
                <h2>What do you want?</h2>
                <Link to={'/signup/where'}><button className='have_btn'>I have a room</button> &nbsp;</Link>
                <Link to={'/signup'}><button className='need_btn'>I need a room</button></Link>
            </div>
        </div>);
    }
}

export default Landing;