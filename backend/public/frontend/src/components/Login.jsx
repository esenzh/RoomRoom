import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification, Card } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import { AddIsLogin } from "../redux/action";
import logo from '../images/logo.png';

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            iconLoading: false,
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ iconLoading: true })
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    })
                })
                const result = await response.json();
                if (result.response === 'success') {
                    this.props.cookies.set('isLogin', true);
                    this.props.addIsLogin(true);
                    this.setState({
                        isRedirect: true,
                        iconLoading: false
                    })
                } else {
                    openNotification('topRight', 'warning', 'Warning', 'Неверный email и пароль, пожалуйста попробуйте еще раз!')
                    this.setState({ iconLoading: false })
                }
            }
        })
    };

    render() {
        if (this.state.isRedirect) {
            return <Redirect to={'/profile'} />
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginForm">
                <Card style={{ borderRadius: '20px', marginTop: '120px', }}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '130px'}} src={logo} alt="" />
                        <h3 style={{color: '#4a76a8'}}>Добро пожаловать в RoomRoom!</h3>
                    </div>
                    <br/>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Пожалуйста, введите E-mail!' }],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='mail'
                                    placeholder="E-mail"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Пожалуйста, введите пароль!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Пароль"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ backgroundColor: '#4A76A8', color: '#ffffff' }} htmlType="submit" className="login-form-button" loading={this.state.iconLoading} icon='login'>
                                Войти
                            </Button>
                            Или <Link to={"/signupAll"}>зарегистрируйтесь!</Link><br/>
                            <Link to={"/signup"}>Не помню пароль!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addIsLogin: (toogle) => {
            dispatch(AddIsLogin(toogle));
        }
    };
}

const Signin = Form.create({ name: 'normal_login' })(Login);
export default withCookies(connect(null, mapDispatchToProps)(Signin));