import React, { Component } from 'react';
import { InputNumber, Form, Checkbox, Radio, Input, Button } from 'antd';
import { connect } from "react-redux";
import UploadPhoto from '../../UploadPhoto';

const { TextArea } = Input;

class FormYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            petsOfOnwer: [],
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
                    professionOfOwner,
                    childrenOfOwner,
                    isOwnerSmokes,
                    aboutOwner
                } = values;

                const userInputYou = {
                    peopleLivingNumber,
                    sexOfOwner,
                    ageOfOwner,
                    professionOfOwner,
                    childrenOfOwner,
                    petsOfOnwer: this.state.petsOfOnwer,
                    isOwnerSmokes,
                    aboutOwner,
                    photoOfOwner: this.props.photos
                }

                const response = await fetch('/api/signup/owner', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        userInputWhere: this.state.userInputWhere,
                        userInputWho: this.state.userInputWho,
                        userInputYou
                    })
                })
                const result = await response.json();
            }
        })
    }

    onChangePetsOfOwner = (value) => {
        this.setState({
            petsOfOnwer: value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                            <p className='question'>Какой ваш пол?</p>
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
                            <p className='question'>Какой ваш возраст?</p>
                            <InputNumber min={18} max={100} />
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
                    {getFieldDecorator('childrenOfOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите вы проживаете с детьми' }],
                    })(
                        <div>
                            <p className='question'>Вы проживаете с детьми?</p>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button className='customRadio' value={'Да'}>Да</Radio.Button>
                                <Radio.Button className='customRadio' value={'Нет'}>Нет</Radio.Button>
                            </Radio.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('petsOfOnwer', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите вы проживаете с животными' }],
                    })(
                        <div>
                            <p className='question'>Вы проживаете с животными?</p>
                            <Checkbox.Group onChange={this.onChangePetsOfOwner}>
                                <Checkbox className='customCheckbox' value={'Нет'}>Нет</Checkbox>
                                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'Кот'}>Кот</Checkbox>
                                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'Собака'}>Собака</Checkbox>
                                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'Другие'}>Другие</Checkbox>
                            </Checkbox.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('isOwnerSmokes', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите вы курите' }],
                    })(
                        <div>
                            <p className='question'>Вы курите?</p>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button className='customRadio' value={'Да'}>Да</Radio.Button>
                                <Radio.Button className='customRadio' value={'Нет'}>Нет</Radio.Button>
                            </Radio.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('aboutOwner', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите чем занимаетесь' }],
                    })(
                        <div>
                            <p className='question'>Расскажите про себя: чем занимаетесь и увлекаетесь?</p>
                            <TextArea rows={4} />
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