import React, { Component } from 'react';
import { Card } from 'antd';
import Steps from '../../Steps';
import Form from './Form';

class RegisterWhere extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div style={{ padding: 10 }}>
            <Steps stepNumber={0} />
            <br /><br />
            <Card className='signUpWhereForm'>
                <Form />
            </Card>
        </div>);
    }
}

export default RegisterWhere;