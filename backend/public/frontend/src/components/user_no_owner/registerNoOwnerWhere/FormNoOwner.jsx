import React, { Component } from 'react';
import { InputNumber, Form, Button, Radio, Icon, DatePicker, Select, Badge } from 'antd';
import { withRouter } from "react-router-dom";
import { colorMetro, provinceData, cityData } from '../../../dataMetro/station'

const { Option } = Select;

class FormNoOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      furnitureAndTech: [],
      furnitureInRoom: [],
      nearBy: [],
      showShortDuration: false,
    }
  }

  showInputForDuration = () => {
    this.setState({
      showShortDuration: !this.state.showShortDuration
    })
  }

  hideInputForDuration = () => {
    if (this.state.showShortDuration) {
      this.setState({
        showShortDuration: !this.state.showShortDuration
      })
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {
          budget,
          timeInRoom,
          admissionDay
        } = values;

        const userInput = {
          metro: this.state.secondCity,
          budget,
          timeInRoom,
          admissionDay: admissionDay._d
        };
        localStorage.setItem('userInputWhere', JSON.stringify(userInput));
        this.props.history.push('/signup/who')
      }
    })
  };
  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0]
    });
  };
  onSecondCityChange = value => {
    this.setState({
      secondCity: value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cities } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>

          <div>
            <p className='question'>В каком районе? Выбрать метро</p>
            <Select
              defaultValue={provinceData[0]}
              onChange={this.handleProvinceChange}
            >
              {provinceData.map(province => (
                <Option key={province}>
                  <Badge color={colorMetro[province]} />
                  {province}
                </Option>
              ))}
            </Select>

            <Select
              mode="multiple"
              placeholder="Please select"
              onChange={this.onSecondCityChange}
              style={{ width: '100%' }}
            >
              {cities.map(city => (
                <Option value={city} key={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div>

        </Form.Item>
        <Form.Item>
          {getFieldDecorator('budget', {
            rules: [{ required: true, message: 'Пожалуйста, введите бюджет' }],
          })(
            <div>
              <p className='question'>Сколько бюджет ?</p>
              <InputNumber min={1} placeholder='₽' />
            </div>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('timeInRoom', {
            rules: [{ required: true, message: 'Пожалуйста, укажите на какой срок' }],
          })(
            <div>
              <p className='question'>На какой срок?</p>
              <Radio.Group buttonStyle="solid">
                <Radio.Button className='customRadio' onClick={this.hideInputForDuration} value={'Длительный'}>Длительный</Radio.Button>
                <Radio.Button className='customRadio' onClick={this.showInputForDuration} value={'Не длительный'}>на (от 1 до 12) недель</Radio.Button>
              </Radio.Group>
              {this.state.showShortDuration && (<InputNumber min={1} max={12} placeholder='введите срок' />)}
            </div>
          )}
        </Form.Item>
        <p className='question'>Когда хотите заселиться? </p>
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

const FormWher = Form.create({ name: 'normal_login' })(FormNoOwner);
export default withRouter(FormWher);