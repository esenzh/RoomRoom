import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import {
    Form,
    Input,
    Button,
    Radio,
    Card,
    notification,
    Icon
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import logo from "../images/logo.png";

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
        isRedirect: false,
        iconLoading: false,
        role: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.setState({ iconLoading: true })
                const {
                    first_name,
                    last_name,
                    email,
                    password,
                    role,
                } = values
                console.log('Запрос ушел');
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        password,
                        role,
                    })
                })
                const result = await response.text();
                alert(result);
                if (result.response === 'success') {
                    this.props.cookies.set('isLogin', true);
                    this.setState({
                        role: role,
                        isRedirect: true,
                        iconLoading: false
                    })
                } else
                    if (result.response === 'emailExist') {
                    openNotification('topRight', 'warning', 'Warning', 'Этот E-mail уже используется!')
                    this.setState({ iconLoading: false })
                }
            } else {
                openNotification('topRight', 'warning', 'Warning', 'Выберите поле "Сдаю комнату" или поле "Ищу комнату"!')
            }
        });
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        if (this.state.isRedirect) {
            if (this.state.role === 'Сдаю комнату') {
                return <Redirect to={'/signup/where_owner'} />
            } else if (this.state.role === 'Ищу комнату') {
                return <Redirect to={'/signup/where'} />
            }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='registerForm'>
                <Card style={{ borderRadius: '10px', marginTop: '10px', backgroundColor: 'white' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '130px' }} src={logo} alt="" />
                        <h3 style={{color: '#4a76a8'}}>
                            Зарегистрируйся сейчас и найди<br/> классного соседа!</h3>
                    </div>
                    <br />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('first_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите имя!',
                                    },
                                ],
                            })(<Input placeholder="Имя" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('last_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите фамилию!',
                                    },
                                ],
                            })(<Input placeholder="Фамилия" />)}
                        </Form.Item>
                        <Form.Item>
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
                            })(<Input placeholder="E-mail" />)}
                        </Form.Item>
                        <Form.Item hasFeedback>
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
                            })(<Input.Password placeholder="Пароль" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('role', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите пароль!',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ]
                            })(
                                <Radio.Group>
                                    <Radio value={'Сдаю комнату'}>Сдаю комнату</Radio>
                                    <Radio value={'Ищу комнату'}>Ищу комнату</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        < Form.Item>
                            <Button style={{backgroundColor: '#4A76A8', width: '100%', align: "center"}} htmlType="submit" loading={this.state.iconLoading} icon='solution'>
                                Start!
                            </Button>
                        </Form.Item>
                    </Form>
                    <p align={'center'}>Ты уже в RoomRoom?<br/><Link to={"/login"}>Войти</Link></p>
                </Card>
            </div>
        );
    }
}

const Register = Form.create({ name: 'register' })(Signup);
export default withCookies(Register);
