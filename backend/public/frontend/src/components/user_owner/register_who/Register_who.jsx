import React, { Component } from 'react';
import { Card } from 'antd';
import Steps from '../../Steps';

const { Step } = Steps;

class Register_who extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div style={{ padding: 10 }}>
            <Steps stepNumber={1} />
            <br /><br />
            <Card className='signUpForm'>
                
            </Card>
        </div>);
    }
}
 
export default Register_who;