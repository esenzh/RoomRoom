import React, { Component } from 'react';
import { InputNumber, Form, Slider, Radio, Icon, Button } from 'antd';

class FormYou extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) { }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('peopleLivingNumber', {
                        rules: [{required: true, message: 'Пожалуйста, введите сколько человек уже проживает в квартире'}],
                    })(
                        <div>
                            <p className='question'>Сколько человек уже проживает в квартире?</p>
                        </div>
                    )}
                </Form.Item>
            </Form>
        );
    }
}

const Form_You = Form.create({name: 'form_you'})(FormYou)
export default Form_You;