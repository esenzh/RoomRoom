import React, { Component } from 'react';
import { InputNumber, Form, Checkbox, Radio, Input, Button } from 'antd';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import UploadPhoto from '../../UploadPhoto';

const { TextArea } = Input;

class FormYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      petsOfUser: [],
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
          sexOfUser,
          ageOfUser,
          aboutUser,
          professionOfUser
        } = values;

        const userInputYou = {
          sexOfUser,
          ageOfUser,
          petsOfUser: this.state.petsOfUser,
          aboutUser,
          professionOfUser,
          photoOfUser: this.props.photos
        };
        console.log(userInputYou)

        // const response = await fetch('/api/signup/owner', {
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify({
        //     userInputWhere: this.state.userInputWhere,
        //     userInputWho: this.state.userInputWho,
        //     userInputYou
        //   })
        // });
        // const result = await response.json();
      }
    })
  };

  onChangePetsOfOwner = (value) => {
    this.setState({
      petsOfUser: value
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('sexOfUser', {
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
          {getFieldDecorator('ageOfUser', {
            rules: [{ required: true, message: 'Пожалуйста, введите какой ваш возраст' }],
          })(
            <div>
              <p className='question'>Какой ваш возраст?</p>
              <InputNumber min={18} max={100} />
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('professionOfUser', {
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
          {getFieldDecorator('animalSmokeChild')(
            <div>
              <p className='question'>Вы проживаете с?</p>
              <Checkbox.Group onChange={this.onChangePetsOfOwner}>
                <Checkbox className='customCheckbox' value={'С животным'}>С животным</Checkbox>
                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'С ребенком'}>С ребенком</Checkbox>
                <Checkbox className='customCheckbox' disabled={this.state.disabled} value={'Курите'}>Курите</Checkbox>
              </Checkbox.Group>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('aboutUser', {
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
          {getFieldDecorator('photoOfUser', {
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
            Зарегистрироваться
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
export default withCookies(connect(mapStateToProps)(Form_You));