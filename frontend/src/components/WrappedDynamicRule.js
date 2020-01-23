import React, {Component} from 'react';
import {Form, Input, Button, Select, InputNumber} from 'antd';

const {Option} = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8},
};
const formTailLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8, offset: 4},
};

class DynamicRule extends Component {
  state = {
    checkNick: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  check =  () => {
    this.props.form.validateFields(err => {
      if (!err) {
         this.props.form.validateFieldsAndScroll(async (err,value)=>{
           console.log(value)
          const response = await fetch('/api/newForm', {
            method: 'POST',
            body: JSON.stringify({
              value: value
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          let result = await response.text();
          console.log(result)
        });
      }
    });
  };

  handleChange = e => {
    this.setState(
      {
        checkNick: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['nickname'], {force: true});
      },
    );
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h1>Новая анкета</h1>
          <Form.Item {...formItemLayout} label="Метро" hasFeedback>
            {getFieldDecorator('metro', {
              rules: [
                {
                  required: true,
                  message: 'Please select your country!'
                }
              ],
            })(
              <Select placeholder="Please select a country">
                <Option value="china">Автозаводская</Option>
                <Option value="us">Белорусская</Option>
                <Option value="u">ВДНХ</Option>
                <Option value="a">Динамо</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Интересы" hasFeedback>
            {getFieldDecorator('interest', {
              rules: [
                {
                  required: true,
                  message: 'Please input your interest',
                },
              ],
            })(
              <Select placeholder="Please select a country">
                <Option value="it">Програмирование</Option>
                <Option value="sport">Спорт</Option>
                <Option value="learn">Учеба</Option>

              </Select>,
              <Input placeholder="Please input your interest"/>)}
          </Form.Item>
          <Form.Item label="Бюджет +/-">
            {getFieldDecorator('budget', {initialValue: 15})(<InputNumber min={1} max={150}/>)}
            <span className="ant-form-text"> тыс. рублей</span>
          </Form.Item>

          <Form.Item label="О себе">
            {getFieldDecorator('about', {
              rules: [
                {
                  required: true,
                  message: 'Расскажите о себе'
                },
              ],})(
            <TextArea rows={4} />)}
          </Form.Item>

          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={this.check}>
              Создать анкету
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({name: 'dynamic_rule'})(DynamicRule);
export default WrappedDynamicRule;