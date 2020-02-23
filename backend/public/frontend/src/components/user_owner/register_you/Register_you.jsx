import React, { Component } from 'react';
import { Card } from 'antd';
import Steps from '../../Steps';
import Form from './Form_you';

const { Step } = Steps;

class Register_you extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div style={{ padding: 10 }}>
            <Steps stepNumber={2} />
            <br /><br />
            <Card>
                <Form />
            </Card>
        </div>);
    }
}
export default Register_you;