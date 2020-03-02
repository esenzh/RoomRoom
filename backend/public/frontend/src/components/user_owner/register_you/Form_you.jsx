import React, { Component } from 'react';
import { InputNumber, Form, Select, Radio, Input, Button, Checkbox } from 'antd';
import { connect } from "react-redux";
import UploadPhoto from '../../UploadPhoto';
import {Redirect} from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

class FormYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: 'Без детей',
            pets: 'Без животных',
            smoking: 'Не курящий',
            isRedirect: false,
            iconLoading: false
        }
    }

    componentDidMount() {
        const userInputWho = JSON.parse(localStorage.getItem('userInputWho'));
        const userInputWhere = JSON.parse(localStorage.getItem('userInputWhere'));
        this.setState({
            userInputWho,
            userInputWhere
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {
                    peopleLivingNumber,
                    sexOfOwner,
                    ageOfOwner,
                    prefix,
                    phone,
                    professionOfOwner,
                    aboutOwner
                } = values;

                const userInputYou = {
                    peopleLivingNumber,
                    sexOfOwner,
                    ageOfOwner,
                    phone: `${prefix}${phone}`,
                    professionOfOwner,
                    childrenOfOwner: this.state.children,
                    petsOfOnwer: this.state.pets,
                    isOwnerSmokes: this.state.smoking,
                    aboutOwner,
                    photoOfOwner: this.props.photos
                }

                const response = await fetch('/api/signup/owner', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userInputWhere: this.state.userInputWhere,
                        userInputWho: this.state.userInputWho,
                        userInputYou
                    })
                })
                const result = await response.json();
                if (result.response === 'success') {
                    this.setState({
                        isRedirect: true
                    })
                }
                console.log(result);
            }
        })
    }

    onChangePreference = (e) => {
        if (e.target.value === 'С детьми' && e.target.checked) {
            this.setState({
                children: e.target.value
            })
        } else if (e.target.value === 'С детьми' && !e.target.checked) {
            this.setState({
                children: 'Без детей'
            })
        } else if (e.target.value === 'С животными' && e.target.checked) {
            this.setState({
                pets: 'С животными'
            })
        } else if (e.target.value === 'С животными' && !e.target.checked) {
            this.setState({
                pets: 'Без животных'
            })
        } else if (e.target.value === 'Курящий' && e.target.checked) {
            this.setState({
                smoking: 'Курящий'
            })
        } else if (e.target.value === 'Курящий' && !e.target.checked) {
            this.setState({
                smoking: 'Не курящий'
            })
        }
    }

    render() {
        if (this.state.isRedirect) {
            return <Redirect to={'/'} />
        }
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+7',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+7</Option>
            </Select>,
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('peopleLivingNumber', {
                        rules: [{ required: true, message: 'Пожалуйста, введите сколько человек уже проживает в квартире' }],
                    })(
                        <div>
                            <p className='question'>Сколько человек уже проживает в квартире?</p>
                            <InputNumber min={1} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('sexOfOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите какой ваш пол' }],
                    })(
                        <div>
                            <p className='question'>Какой Ваш пол?</p>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button className='customRadio' value={'М'}>М</Radio.Button>
                                <Radio.Button className='customRadio' value={'Ж'}>Ж</Radio.Button>
                                <Radio.Button className='customRadio' value={'Не хочу указывать'}>Не хочу указывать</Radio.Button>
                            </Radio.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('ageOfOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, введите какой ваш возраст' }],
                    })(
                        <div>
                            <p className='question'>Какой Ваш возраст?</p>
                            <InputNumber min={18} max={100} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('phone', {
                    })(
                        <div>
                            <p className='question'>Номер телефона</p>
                            <Input addonBefore={prefixSelector} style={{ width: 300 }} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('professionOfOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите чем вы занимаетесь' }],
                    })(
                        <div>
                            <p className='question'>Чем вы занимаетесь?</p>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button className='customRadio' value={'Учусь'}>Учусь</Radio.Button>
                                <Radio.Button className='customRadio' value={'Работаю'}>Работаю</Radio.Button>
                                <Radio.Button className='customRadio' value={'На пенсии'}>На пенсии</Radio.Button>
                                <Radio.Button className='customRadio' value={'Отдыхаю'}>Отдыхаю</Radio.Button>
                                <Radio.Button className='customRadio' value={'Не хочу указывать'}>Не хочу указывать</Radio.Button>
                            </Radio.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('preference')(
                        <div>
                            <p className='question'>С кем Вы проживаете?</p>
                            <Checkbox.Group>
                                <Checkbox onChange={this.onChangePreference} className='customCheckbox' value={'С детьми'}>C детьми</Checkbox>
                            </Checkbox.Group>
                            <Checkbox.Group>
                                <Checkbox onChange={this.onChangePreference} className='customCheckbox' value={'С животными'}>C животными</Checkbox>
                            </Checkbox.Group>
                            <Checkbox.Group>
                                <Checkbox onChange={this.onChangePreference} className='customCheckbox' value={'Курящий'}>Курю</Checkbox>
                            </Checkbox.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('aboutOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите чем занимаетесь' }],
                    })(
                        <div>
                            <p className='question'>Расскажите про себя: чем занимаетесь и увлекаетесь?</p>
                            <TextArea className='signupTextArea' rows={4} />
                        </div>
                    )}
                </Form.Item>
                {/* TODO: social accounts */}
                <Form.Item>
                    {getFieldDecorator('photoOfOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, загрузите свою фотографию' }],
                    })(
                        <div>
                            <p className='question'>Загрузите свою фотографию</p>
                            <UploadPhoto />
                        </div>
                    )}
                </Form.Item>
                <br />
                <Form.Item>
                    <Button htmlType="submit" type='primary' icon='user-add' size='large'>
                        Зарегестрироваться
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

function mapStateToProps(store) {
    return {
        photos: store.photos
    };
}

const Form_You = Form.create({ name: 'form_you' })(FormYou)
export default connect(mapStateToProps)(Form_You);