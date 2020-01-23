import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
} from 'antd';
import { Redirect } from 'react-router-dom';

const { Option } = Select;

class Signup extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isRedirect: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const {
                    first_name,
                    last_name,
                    email,
                    phone,
                    prefix,
                    vk,
                    username,
                    password,
                    agreement
                } = values
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        phone: `${prefix}${phone}`,
                        vk,
                        username,
                        password
                    })
                })
                const result = await response.json();
                if (result.response === 'success') {
                    this.setState({
                        isRedirect: true
                    })
                } else if (result.response === 'usernameExist') {
                    this.setState({
                        warningMessage: result.response
                    })
                } else if (result.response === 'emailExist') {
                    this.setState({
                        warningMessage: result.response
                    })
                }
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        if (this.state.isRedirect) {
            return <Redirect to={'/component1'} />
        }
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+7',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+7</Option>
            </Select>,
        );
        return (
            <div className='registerForm'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="First Name">
                        {getFieldDecorator('first_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator('last_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Phone Number (optional)">
                        {getFieldDecorator('phone', {
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="VK">
                        {getFieldDecorator('vk', {
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Username">
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
            </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Register = Form.create({ name: 'register' })(Signup);

export default Register;