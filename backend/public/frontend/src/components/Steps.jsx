import React, { Component } from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

class StepNumber extends Component {
    render() {
        return (
            <Steps current={this.props.stepNumber}>
                <Step title="Where" />
                <Step title="Who" />
                <Step title="You" />
            </Steps>
        );
    }
}

export default StepNumber;