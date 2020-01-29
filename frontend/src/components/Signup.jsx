import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import {
    Form,
    Input,
    Select,
    Button,
    Alert
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import UploadPhoto from './UploadPhoto';

const { Option } = Select;

class Signup extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isRedirect: false,
        warningMessage: '',
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
                    age,
                    nativeLocation
                } = values
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        phone: `${prefix}${phone}`,
                        photo: this.props.photos,
                        vk,
                        username,
                        password,
                        age,
                        nativeLocation
                    })
                })
                const result = await response.json();
                if (result.response === 'success') {
                    this.props.cookies.set('isLogin', true);
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

    compareToFirstPassword = (value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Два пароля которые вы ввели не совпадают друг с другом!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (value, callback) => {
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
            return <Redirect to={'/anketa'} />
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
                {this.state.warningMessage === 'usernameExist' && (<Alert
                    description="Такой логин уже используется, пожалуйста выберите другой!"
                    type="error"
                />)}
                {this.state.warningMessage === 'emailExist' && (<Alert
                    description="Этот E-mail уже используется!"
                    type="error"
                />)}
                <br />
                <h2 className='registerHeader'>Регистрация</h2>
                <br />
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Имя">
                        {getFieldDecorator('first_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите имя!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Фамилия">
                        {getFieldDecorator('last_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите фамилию!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'Введите правильный E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Возраст">
                        {getFieldDecorator('age', {
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Место рождения">
                        {getFieldDecorator('nativeLocation', {
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Номер телефона">
                        {getFieldDecorator('phone', {
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label='Загрузите фото, пожалуйста'>
                        <UploadPhoto />
                    </Form.Item>
                    <Form.Item label="VK">
                        {getFieldDecorator('vk', {
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Логин">
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите логин!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Пароль" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите пароль!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Подвердите пароль" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, подвердите пароль!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Зарегестрироваться
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        Или <Link to={"/login"}>Войти!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        photos: store.photos
    };
}

const Register = Form.create({ name: 'register' })(Signup);
export default withCookies(connect(mapStateToProps)(Register));