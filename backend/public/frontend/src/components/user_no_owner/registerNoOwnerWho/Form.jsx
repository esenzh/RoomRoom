import React, {Component} from 'react';
import {Button, DatePicker, Icon, InputNumber, Radio, Form, Slider} from "antd";


class FormWho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minAge: 18,
      maxAge: 100
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {
          people,
          sex,
          children,
          animal,
          smoke
        } = values;

        const userInput = {
          people,
          sex,
          age:[this.state.minAge,this.state.maxAge],
          children,
          animal,
          smoke
        };
        console.log(userInput)
        localStorage.setItem('userInputWhere', JSON.stringify(userInput));
        // const response = await fetch()
      }
    })
  };
  onChangeAge = value => {
    this.setState({
      minAge: value[0],
      maxAge: value[1],
    });
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Item>
          {getFieldDecorator('people', {
            rules: [{required: true, message: 'Сколько человек вы ищите в комнату?'}],
          })(
            <div>
              <p className='question'>Сколько человек вы ищите в комнату?</p>
              <Radio.Group buttonStyle="people">
                <Radio.Button value={1}>1</Radio.Button>
                <Radio.Button value={2}>2</Radio.Button>
                <Radio.Button value={"нет предпочтений"}>нет предпочтений</Radio.Button>
              </Radio.Group>
            </div>
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('sex', {
            rules: [{required: true, message: 'Сколько человек вы ищите в комнату?'}],
          })(
            <div>
              <p className='question'>Какого пола?</p>
              <Radio.Group buttonStyle="sex">
                <Radio.Button value={"М"}>М</Radio.Button>
                <Radio.Button value={"Ж"}>Ж</Radio.Button>
                <Radio.Button value={"нет предпочтений"}>нет предпочтений</Radio.Button>
              </Radio.Group>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('age')(
            <div>
              <p className='question'>Какого возраста?</p>
              <div style={{width: '250px'}}>
                <Slider range max={100} min={18} value={[this.state.minAge, this.state.maxAge]} onChange={this.onChangeAge}
                        defaultValue={[this.state.minAge, this.state.maxAge]} marks={{18: '18 лет', 100: '100 лет'}}/>
                        Диапозон возраста {this.state.minAge} - {this.state.maxAge}
              </div>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('children', {
            rules: [{required: true, message: 'С детьми?'}],
          })(
            <div>
              <p className='question'>С детьми?</p>
              <Radio.Group buttonStyle="children">
                <Radio.Button value={"С детьми"}>С детьми</Radio.Button>
                <Radio.Button value={"без детей"}>без детей</Radio.Button>
              </Radio.Group>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('animal', {
            rules: [{required: true, message: 'С животными?'}],
          })(
            <div>
              <p className='question'>С животными?</p>
              <Radio.Group buttonStyle="animal">
                <Radio.Button value={"c животными"}>С животными</Radio.Button>
                <Radio.Button value={"без животных"}>без животных</Radio.Button>
              </Radio.Group>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('smoke')(
            <div>
              <p className='question'>Курящего ?</p>
              <Radio.Group buttonStyle="smoke">
                <Radio.Button value={"курящего"}>Курящего</Radio.Button>
                <Radio.Button value={"не курящего"}>не курящего</Radio.Button>
                <Radio.Button value={"нет предпочтений"}>нет предпочтений</Radio.Button>
              </Radio.Group>
            </div>
          )}
        </Form.Item>

        <br/>
        <Form.Item>
          <Button htmlType="submit" type='primary' size='large'>
            Next
            <Icon type="right"/>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const FormWher = Form.create({name: 'normal_login'})(FormWho);
export default FormWher;