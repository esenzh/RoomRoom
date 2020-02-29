import React, { Component } from 'react';
import { InputNumber, Form, Slider, Radio, Icon, Button, Checkbox } from 'antd';
import { withRouter } from "react-router-dom";

class FormWho extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: 'Без детей',
            pets: 'Без животных',
            smoking: 'Не курящий'
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {
                    peopleNumber,
                    sex,
                    agePreference,
                } = values;

                const userInput = {
                    peopleNumber,
                    sex,
                    agePreference,
                    children: this.state.children,
                    pets: this.state.pets,
                    smoking: this.state.smoking
                }
                localStorage.setItem('userInputWho', JSON.stringify(userInput))
                this.props.history.push('/signup/you')
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
        const { getFieldDecorator } = this.props.form;
        return (<Form onSubmit={this.handleSubmit}>
            <Form.Item>
                {getFieldDecorator('peopleNumber', {
                    rules: [{ required: true, message: 'Пожалуйста, введите сколько человек вы ищете' }],
                })(
                    <div>
                        <p className='question'>Сколько человек вы ищете?</p>
                        <InputNumber min={1} />
                    </div>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('sex', {
                    rules: [{ required: true, message: 'Пожалуйста, введите какого пола' }],
                })(
                    <div>
                        <p className='question'>Какого пола?</p>
                        <Radio.Group buttonStyle="outline">
                            <Radio.Button className='customRadio' value={'М'}>М</Radio.Button>
                            <Radio.Button className='customRadio' value={'Ж'}>Ж</Radio.Button>
                            <Radio.Button className='customRadio' value={'нет предпочтений'}>Нет предпочтений</Radio.Button>
                        </Radio.Group>
                    </div>
                )}
            </Form.Item>
            <p className='question'>Какого возраста?</p>
            <Form.Item>
                {getFieldDecorator('agePreference', {
                    rules: [{ required: true, message: 'Пожалуйста, введите какого возраста' }],
                })(
                    <Slider range min={18} max={100} style={{width: 300}}/>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('preference')(
                    <div>
                        <p className='question'>Ваши пожелания?</p>
                        <Checkbox.Group>
                            <Checkbox onChange={this.onChangePreference} className='customCheckbox' value={'С детьми'}>Можно с детьми</Checkbox>
                        </Checkbox.Group>
                        <Checkbox.Group>
                            <Checkbox onChange={this.onChangePreference} className='customCheckbox' value={'С животными'}>Можно с животными</Checkbox>
                        </Checkbox.Group>
                        <Checkbox.Group>
                            <Checkbox onChange={this.onChangePreference} className='customCheckbox' value={'Курящий'}>Можно курящего</Checkbox>
                        </Checkbox.Group>
                    </div>
                )}
            </Form.Item>
            <br />
            <Form.Item>
                <Button htmlType="submit" type='primary' size='large'>
                    Next
                        <Icon type="right" />
                </Button>
            </Form.Item>
        </Form>);
    }
}

const Form_Who = Form.create({ name: 'form_who' })(FormWho);
export default withRouter(Form_Who);