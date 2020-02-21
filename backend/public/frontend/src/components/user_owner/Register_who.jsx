import React, { Component } from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

class Register_who extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div style={{padding: '30px 300px 0 300px'}}>
            <Steps current={1}>
                <Step title="Where" />
                <Step title="Who" />
                <Step title="You" />
            </Steps>
        </div> );
    }
}
 
export default Register_who;