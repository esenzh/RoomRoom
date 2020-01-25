import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import { AddIsLogin } from "../redux/type";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            alertMessage: false
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    })
                })
                const result = await response.json();
                if (result.response === 'success') {
                    this.props.cookies.set('isLogin', true);
                    this.props.addIsLogin(true);
                    this.setState({
                        isRedirect: true
                    })
                } else {
                    this.setState({
                        alertMessage: true
                    })
                }
            }
        })
    };

    render() {
        if (this.state.isRedirect) {
            return <Redirect to={'/'} />
        }
        const { getFieldDecorator } = this.props.form;
        return (<div className='loginForm'>
            {this.state.alertMessage && (<Alert
                description="Неверный логин и пароль, пожалуйста попробуйте еще раз!"
                type="error"
            />)}
            <br />
            <h2>Вход</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Пожалуйста, введите логин!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Логин"
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                    Или <Link to={"/signup"}>зарегистрируйтесь!</Link>
                </Form.Item>
            </Form>
        </div>);
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