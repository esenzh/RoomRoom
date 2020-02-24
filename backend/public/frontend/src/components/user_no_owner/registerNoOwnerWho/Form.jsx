import React, {Component} from 'react';
import {Button, Icon, Radio, Form, Slider, Checkbox} from "antd";
import { withRouter } from "react-router-dom";


class FormWho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minAge: 18,
      maxAge: 100,
      aboutOwner: []
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {
          sex,
        } = values;

        const userInput = {
          sex,
          age:[this.state.minAge,this.state.maxAge],
          aboutOwner: this.state.aboutOwner,

        };
        console.log(userInput);
        localStorage.setItem('userInputWho', JSON.stringify(userInput));
        this.props.history.push('/signup/you')

      }
    })
  };
  onChangeAboutOwner = (value) => {
    this.setState({
      aboutOwner: value
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
          {getFieldDecorator('sex', {
            rules: [{required: true, message: 'С кем вы готовы жить в квартире?'}],
          })(
            <div>
              <p className='question'>С кем вы готовы жить в квартире?</p>
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

              </div>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('animalSmokeChild')(
            <div>
              <p className='question'>Доп информация?</p>
              <Checkbox.Group onChange={this.onChangeAboutOwner}>
                <Checkbox className='customCheckbox' value={'С животным'}>С животным</Checkbox>
                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'С ребенком'}>С ребенком</Checkbox>
                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'Курящего'}>Курящего</Checkbox>
              </Checkbox.Group>
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
export default withRouter(FormWher);