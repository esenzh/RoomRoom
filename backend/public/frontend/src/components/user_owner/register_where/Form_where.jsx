import React, { Component } from 'react';
import { InputNumber, Form, Button, Checkbox, Radio, Icon, DatePicker } from 'antd';
import { withRouter } from "react-router-dom";

class FormWhere extends Component {
    constructor(props) {
        super(props);
        this.state = {
            furnitureAndTech: [],
            furnitureInRoom: [],
            nearBy: []
        }
    }

    onChangeFurnitureAndTech = value => {
        this.setState({
            furnitureAndTech: value
        })
    }

    onChangeFurnitureInRoom = value => {
        this.setState({
            furnitureInRoom: value
        })
    }

    onChangeNearBy = value => {
        this.setState({
            nearBy: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {
                    distance,
                    totalFloor,
                    floorNumber,
                    totalRooms,
                    roomsToRent,
                    typeOfRoom,
                    internet,
                    fee,
                    bills,
                    deposit,
                    rentalDuration,
                    admissionDay
                } = values;

                const userInput = {
                    distance,
                    totalFloor,
                    floorNumber,
                    totalRooms,
                    roomsToRent,
                    typeOfRoom,
                    furnitureAndTech: this.state.furnitureAndTech,
                    furnitureInRoom: this.state.furnitureInRoom,
                    internet,
                    nearBy: this.state.nearBy,
                    fee,
                    bills,
                    deposit,
                    rentalDuration,
                    admissionDay
                }
                localStorage.setItem('userInputWhere', JSON.stringify(userInput));
                this.props.history.push('/signup/who')
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('distance', {
                        rules: [{ required: true, message: 'Пожалуйста, введите сколько пешком идти от ближайшего метро' }],
                    })(
                        <div>
                            <p className='question'>Сколько пешком идти от ближайшего метро?</p>
                            <InputNumber min={1} />
                            &nbsp;
                           <label>( от 0 до 60 мин)</label>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('totalFloor', {
                        rules: [{ required: true, message: 'Пожалуйста, введите сколько этажей в доме' }],
                    })(
                        <div>
                            <p className='question'>Сколько этажей в доме?</p>
                            <InputNumber min={1} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('floorNumber', {
                        rules: [{ required: true, message: 'Пожалуйста, введите на каком этаже' }],
                    })(
                        <div>
                            <p className='question'>На каком этаже?</p>
                            <InputNumber min={1} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('totalRooms', {
                        rules: [{ required: true, message: 'Пожалуйста, введите сколько комнат в квартире' }],
                    })(
                        <div>
                            <p className='question'>Сколько комнат в квартире?</p>
                            <InputNumber min={1} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('roomsToRent', {
                        rules: [{ required: true, message: 'Пожалуйста, введите сколько комнат сдаётся' }],
                    })(
                        <div>
                            <p className='question'>Сколько комнат сдаётся?</p>
                            <InputNumber min={1} />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('typeOfRoom', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите комната смежные или изолированная' }],
                    })(
                        <div>
                            <p className='question'>Комната смежные или изолированная?</p>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button className='customRadio' value={'смежная'}>смежная</Radio.Button>
                                <Radio.Button className='customRadio' value={'изолированная'}>изолированная</Radio.Button>
                            </Radio.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('typeOfFurnitureAndTech', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите какая мебель и техника есть в квартире' }],
                    })(
                        <div>
                            <p className='question'>Какая мебель и техника есть в квартире?</p>
                            <Checkbox.Group onChange={this.onChangeFurnitureAndTech}>
                                <Checkbox className='customCheckbox' value={'Мебель на кухне'}>Мебель на кухне</Checkbox>
                                <Checkbox className='customCheckbox' value={'Холодильник'}>Холодильник</Checkbox>
                                <Checkbox className='customCheckbox' value={'Стиральная машинка'}>Стиральная машинка</Checkbox>
                                <Checkbox className='customCheckbox' value={'Микроволновка'}>Микроволновка</Checkbox>
                            </Checkbox.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('typeOfFurnitureInRoom', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите какая мебель есть в комнате' }],
                    })(
                        <div>
                            <p className='question'>Какая мебель есть в комнате?</p>
                            <Checkbox.Group onChange={this.onChangeFurnitureInRoom}>
                                <Checkbox className='customCheckbox' value={'Кровать'}>Кровать</Checkbox>
                                <Checkbox className='customCheckbox' value={'Диван'}>Диван</Checkbox>
                                <Checkbox className='customCheckbox' value={'Стол'}>Стол</Checkbox>
                                <Checkbox className='customCheckbox' value={'Шкаф'}>Шкаф</Checkbox>
                                <Checkbox className='customCheckbox' value={'Полки'}>Полки</Checkbox>
                                <Checkbox className='customCheckbox' value={'Кондиционер'}>Кондиционер</Checkbox>
                            </Checkbox.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('internet', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите есть ли Интернет' }],
                    })(
                        <div>
                            <p className='question'>Есть ли Интернет?</p>
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button className='customRadio' value={'да'}>да</Radio.Button>
                                <Radio.Button className='customRadio' value={'нет'}>нет</Radio.Button>
                            </Radio.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('nearHouse', {
                        rules: [{ required: true, message: 'Пожалуйста, укажите что есть рядом с домом' }],
                    })(
                        <div>
                            <p className='question'>Что есть рядом с домом?</p>
                            <Checkbox.Group onChange={this.onChangeNearBy}>
                                <Checkbox className='customCheckbox' value={'Остановки метро и общественного транспорта'}>Остановки метро и общественного транспорта</Checkbox>
                                <Checkbox className='customCheckbox' value={'Продуктовые магазины'}>Продуктовые магазины</Checkbox>
                                <Checkbox className='customCheckbox' value={'Парк или сквер'}>Парк или сквер</Checkbox>
                                <Checkbox className='customCheckbox' value={'Кафе и рестораны'}>Кафе и рестораны</Checkbox>
                                <Checkbox className='customCheckbox' value={'Бары и ночные клубы'}>Бары и ночные клубы</Checkbox>
                                <Checkbox className='customCheckbox' value={'Детские садики и школы'}>Детские садики и школы</Checkbox>
                            </Checkbox.Group>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('fee', {
                        rules: [{ required: true, message: 'Пожалуйста, введите cколько оплата' }],
                    })(
                        <div>
                            <p className='question'>Сколько оплата?</p>
                            <InputNumber
                                min={0}
                                formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\₽\s?|(,*)/g, '')}
                            />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('bills', {
                        rules: [{ required: true, message: 'Пожалуйста, введите коммунальные платежи' }],
                    })(
                        <div>
                            <p className='question'>Коммунальные платежи:</p>
                            <InputNumber
                                min={0}
                                formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\₽\s?|(,*)/g, '')}
                            />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('deposit', {
                        rules: [{ required: true, message: 'Пожалуйста, введите залог' }],
                    })(
                        <div>
                            <p className='question'>Залог:</p>
                            <InputNumber
                                min={0}
                                formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\₽\s?|(,*)/g, '')}
                            />
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('rentalDuration', {
                        rules: [{ required: true, message: 'Пожалуйста, введите на какой срок' }],
                    })(
                        <div>
                            <p className='question'>На какой срок?</p>
                            <InputNumber min={1} max={12} />
                            &nbsp;
                            <label>на (от 1 до 12) недель</label>
                        </div>
                    )}
                </Form.Item>
                <p className='question'>Когда возможно заехать?</p>
                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                    {getFieldDecorator('admissionDay', {
                        rules: [{ required: true, message: 'Пожалуйста, введите когда возможно заехать' }],
                    })(
                        <DatePicker size='large' placeholder="Выберите дату" />
                    )}
                </Form.Item>
                <br />
                <Form.Item>
                    <Button htmlType="submit" type='primary' size='large'>
                        Next
                        <Icon type="right" />
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const Form_Where = Form.create({ name: 'form_where' })(FormWhere);
export default withRouter(Form_Where);