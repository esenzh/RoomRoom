import React, { Component } from 'react';
import { Button, Icon, Radio, Form, Slider, Checkbox } from "antd";
import { withRouter } from "react-router-dom";


class FormWho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minAge: 18,
      maxAge: 100,
      children: 'Без детей',
      pets: 'Без животных',
      smoking: 'Не курящий'
    }
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {
          sexPreference,
          agePreference
        } = values;

        const userInput = {
          sexPreference,
          agePreference,
          childrenPreference: this.state.children,
          petPreference: this.state.pets,
          smokingPreference: this.state.smoking
        };
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Item>
          {getFieldDecorator('sexPreference', {
            rules: [{ required: true, message: 'С кем вы готовы жить в квартире?' }],
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
        <p className='question'>Какого возраста?</p>
        <Form.Item>
          {getFieldDecorator('agePreference')(
            <Slider range max={100} min={18} style={{width: 300}} marks={{ 18: '18', 100: '100' }} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('animalSmokeChild')(
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
      </Form>
    );
  }
}
const FormWher = Form.create({ name: 'normal_login' })(FormWho);
export default withRouter(FormWher);