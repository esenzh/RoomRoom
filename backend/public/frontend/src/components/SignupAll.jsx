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
    Icon
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import logo from "../images/logo.png";

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
                const {
                    first_name,
                    last_name,
                    email,
                    phone,
                    prefix,
                    username,
                    password,
                } = values

                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        phone: `${prefix}${phone}`,
                        username,
                        password,
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
            if (this.state.value === 'Сдаю комнату'){
                return <Redirect to={'/signupOwnerUser' } />
            }else if(this.state.value === 'Ищу комнату'){
                return <Redirect to={'/signupEasyUser'} />
            }

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
                <Card style={{ borderRadius: '30px', marginTop: '10px', backgroundColor: 'white'}}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '130px'}} src={logo} alt="" />
                        <h3 style={{color: '#4a76a8'}}>Добро пожаловать в RoomRoom!<br />
                            Форма регистрации</h3>
                    </div>
                    <br/>

                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <div style={{ display: 'flex',
                            marginTop: '-5px'}}>
                            <div>
                                <Form.Item label='Имя'>
                                    {getFieldDecorator('first_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Пожалуйста, введите имя!',
                                            },
                                        ],
                                    })(<Input placeholder="Имя"/>)}
                                </Form.Item>
                                <Form.Item label="Фамилия" >
                                    {getFieldDecorator('last_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Пожалуйста, введите фамилию!',
                                            },
                                        ],
                                    })(<Input placeholder="Фамилия" />)}
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
                                    })(<Input placeholder="E-mail"/>)}
                                </Form.Item>
                                <Form.Item label="Телефон">
                                    {getFieldDecorator('phone', {
                                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                                </Form.Item>
                            </div>
<div>
    <Form.Item label="Логин">
        {getFieldDecorator('username', {
            rules: [
                {
                    required: true,
                    message: 'Пожалуйста, введите логин!',
                },
            ],
        })(<Input placeholder="Логин"/>)}
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
        })(<Input.Password placeholder="Пароль"/>)}
    </Form.Item>
    <Form.Item label="Снова пароль" style={{marginLeft: "20px"}} hasFeedback>
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
        })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Снова пароль" />)}
    </Form.Item>

    {/*    <input type="radio" id={"Сокольническая"} name={'line'} value={'Сокольническая ветка'} />Сдаю комнату*/}

    {/*    <input type="radio" id={"Замоскворецкая"} name={'line'} style={{marginLeft: "20px"}} value={'Замоскворецкая'} />Ищу комнату*/}
    {/*</Form.Item>*/}
    <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio style={{marginLeft: "20px"}} value={'Сдаю комнату'}>Сдаю комнату</Radio>
        <Radio value={'Ищу комнату'}>Ищу комнату</Radio>
    </Radio.Group>
</div>
                        </div>

                        <Form.Item {...tailFormItemLayout}>
                            <Button style={{backgroundColor: '#4A76A8', width: '50%'}} htmlType="submit" loading={this.state.iconLoading} icon='solution'>
                                Get started!
                        </Button>
                            <br/>
                            &nbsp;&nbsp;&nbsp;
                        Или <Link to={"/login"}>Войти!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(store) {
}

const Register = Form.create({ name: 'register' })(Signup);
export default withCookies(connect(mapStateToProps)(Register));