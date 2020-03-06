import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import {
    Form,
    Input,
    Select,
    Button,
    Radio,
    Card,
    notification,
    Icon,
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import UploadPhoto from './UploadPhoto';

const { Option } = Select;

const openNotification = (placement, icon, title, message) => {
    notification.open({
        message: title,
        description:
            message,
        placement,
        icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
        duration: 3
    });
};

class Signup extends Component {
    state = {
        confirmDirty: false,
        isRedirect: false,
        iconLoading: false,
        value: 1,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({ iconLoading: true })
                const sex = this.state.value;
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
                        nativeLocation,
                        sex
                    })
                })
                const result = await response.json();
                if (result.response === 'success') {
                    this.props.cookies.set('isLogin', true);
                    this.setState({
                        isRedirect: true,
                        iconLoading: false
                    })
                } else if (result.response === 'usernameExist') {
                    openNotification('topRight', 'warning', 'Warning', 'Такой логин уже используется!')
                    this.setState({ iconLoading: false })
                } else if (result.response === 'emailExist') {
                    openNotification('topRight', 'warning', 'Warning', 'Этот E-mail уже используется!')
                    this.setState({ iconLoading: false })
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
            callback('Два пароля которые вы ввели не совпадают друг с другом!');
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

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
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
                <Card style={{ borderRadius: '20px', marginTop: '50px' }}>
                    <br />
                    <h2 className='registerHeader'>Регистрация</h2>
                    <br />
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <div style={{ display: 'flex' }}>
                            <div>
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
                                <Form.Item label="Родной город">
                                    {getFieldDecorator('nativeLocation', {
                                    })(<Input />)}
                                </Form.Item>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    Ваш пол:
                                    <Radio style={{marginLeft: "20px"}} value={'male'}>Мужчина</Radio>
                                    <Radio value={'female'}>Женщина</Radio>
                                </Radio.Group>
                            </div>
                            <div style={{ marginLeft: '30px' }}>
                                <Form.Item label="Номер телефона">
                                    {getFieldDecorator('phone', {
                                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                                </Form.Item>
                                <Form.Item label='Загрузите фото'>
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
                                <Form.Item label="Еще раз пароль" hasFeedback>
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
                            </div>
                        </div>
                        <Form.Item {...tailFormItemLayout}>
                            <Button style={{backgroundColor: '#4A76A8', color: '#ffffff'}} htmlType="submit" loading={this.state.iconLoading} icon='solution'>
                                Зарегестрироваться
                        </Button>
                            &nbsp;&nbsp;&nbsp;
                        Или <Link to={"/login"}>Войти!</Link><br/>
                          <Link to={"/aboutproject"}>О проекте!</Link>
                        </Form.Item>
                    </Form>
                </Card>
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