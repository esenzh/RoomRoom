import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';

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
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        const result = await response.json();
        if (result.response === 'success') {
            this.setState({
                isRedirect: true
            })
        } else {
            this.setState({
                alertMessage: true
            })
        }
    };

    handleGlobalChange = (name) => (event) => {
        if (name === 'username') {
            this.setState({
                username: event.target.value
            })
        } else {
            this.setState({
                password: event.target.value
            })
        }
    }

    render() {
        return (<div className='loginForm'>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h2>Login</h2>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={() => this.handleGlobalChange('username')}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder="Password"
                        onChange={() => this.handleGlobalChange('password')}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to={"/signup"}>register now!</Link>
                </Form.Item>
            </Form>

        </div>);
    }
}

export default Login;