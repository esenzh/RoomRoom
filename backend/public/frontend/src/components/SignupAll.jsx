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
            if (!err && this.state.value !== 1) {
                this.setState({ iconLoading: true })
                const {
                    first_name,
                    last_name,
                    email,
                    password,
                } = values

                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
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
                } else if (result.response === 'emailExist') {
                    openNotification('topRight', 'warning', 'Warning', 'Этот E-mail уже используется!')
                    this.setState({ iconLoading: false })
                }
            }else{
                openNotification('topRight', 'warning', 'Warning', 'Выберите поле "Сдаю комнату" или поле "Ищу комнату"!')
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    // compareToFirstPassword = (rule, value, callback) => {
    //     const { form } = this.props;
    //     if (value && value !== form.getFieldValue('password')) {
    //         callback('Два пароля которые вы ввели не совпадают друг с другом!');
    //     } else {
    //         callback();
    //     }
    // };

    // validateToNextPassword = (rule, value, callback) => {
    //     const { form } = this.props;
    //     if (value && this.state.confirmDirty) {
    //         form.validateFields(['confirm'], { force: true });
    //     }
    //     callback();
    // };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        if (this.state.isRedirect) {
            if (this.state.value === 'Сдаю комнату'){
                return <Redirect to={'/anketa' } />
            }else if(this.state.value === 'Ищу комнату'){
                return <Redirect to={'/anketa'} />
            }

        }
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {

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
        // const prefixSelector = getFieldDecorator('prefix', {
        //     initialValue: '+7',
        // })(
        //     <Select style={{ width: 70 }}>
        //         <Option value="86">+7</Option>
        //     </Select>,
        // );
        return (
            <div className='registerForm'>
                <Card style={{ borderRadius: '30px', marginTop: '10px', backgroundColor: 'white'}}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '130px'}} src={logo} alt="" />
                        <h3 style={{color: '#4a76a8'}}>
                            Зарегистрируйся сейчас и найди<br/> классного соседа!</h3>
                    </div>
                    <br/>

                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <div style={{ display: '',
                            marginTop: '-5px'}}>
                            <div>
                                <Form.Item >
                                    {getFieldDecorator('first_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Пожалуйста, введите имя!',
                                            },
                                        ],
                                    })(<Input placeholder="Имя"/>)}
                                </Form.Item>
                                <Form.Item  >
                                    {getFieldDecorator('last_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Пожалуйста, введите фамилию!',
                                            },
                                        ],
                                    })(<Input placeholder="Фамилия" />)}
                                </Form.Item>
                                <Form.Item >
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


                                <Form.Item  hasFeedback>
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

                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    <Radio style={{marginLeft: "20px"}} value={'Сдаю комнату'}>Сдаю комнату</Radio>
                                    <Radio value={'Ищу комнату'}>Ищу комнату</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <Form.Item {...tailFormItemLayout}>
                            <Button style={{backgroundColor: '#4A76A8', width: '50%'}} htmlType="submit" loading={this.state.iconLoading} icon='solution'>
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

function mapStateToProps(store) {
}

const Register = Form.create({ name: 'register' })(Signup);
export default withCookies(connect(mapStateToProps)(Register));