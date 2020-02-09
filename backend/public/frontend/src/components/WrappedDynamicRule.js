import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Badge,
  Card
} from "antd";
import { Redirect } from "react-router-dom";
import {colorMetro, provinceData, cityData} from '../dataMetro/station'

const imgMetro = require("../images/metro.png");

const { Option } = Select;
const { TextArea } = Input;
const interest = [
  "программирование",
  "юриспруденция",
  "экономика",
  "музыка",
  "спорт",
  "путешествия",
  "медицина",
  "образование",
  "армия",
  "точные науки",
  "компьютерные игры",
  "автомобили",
  "косметология"
];
const children = [];
for (let i = 0; i < 13; i++) {
  children.push(<Option key={interest[i]}>{interest[i]}</Option>);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const formTailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
class DynamicRule extends Component {
  state = {
    checkNick: false,
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
    visible: false,
    redirectToHome: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
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

  check = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.form.validateFieldsAndScroll(async (err, value) => {
          await fetch("/api/newForm", {
            method: "POST",
            body: JSON.stringify({
              interest: value.interest,
              budget: value.budget,
              about: value.about,
              metro: this.state.secondCity
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
          this.setState({ redirectToHome: true });
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cities } = this.state;
    if (this.state.redirectToHome) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="registerForm">
        <Card className="anketaCard">

          <Form {...formItemLayout}>
            <div style={{textAlign: 'center'}}>
              <h2>Моя анкета</h2>
            </div>
            <br/>
            <Form.Item {...formItemLayout} label="Метро" hasFeedback>
              {getFieldDecorator("metro", {
                rules: [
                  {
                    required: false,
                    message: "Выберите метро!"
                  }
                ]
              })(
                <div>
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
                    value={this.state.secondCity}
                    onChange={this.onSecondCityChange}
                  >
                    {cities.map(city => (
                      <Option value={city} key={city}>
                        {city}
                      </Option>
                    ))}
                  </Select>
                </div>
              )}
              <a onClick={this.showModal}>Схема метро</a>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Интересы">
              {getFieldDecorator("interest", {
                rules: [
                  {
                    required: true,
                    message: "Пожалуйста, выберите интересы!"
                  }
                ]
              })(
                <Select mode="multiple" placeholder="Выберите...">
                  {children}
                </Select>,
                <Input placeholder="Пожалуйста, выберите интересы!" />
              )}
            </Form.Item>
            <Form.Item label="Бюджет +/-">
              {getFieldDecorator("budget", { initialValue: 15 })(
                <InputNumber min={1} max={150} />
              )}
              <span className="ant-form-text"> тыс. рублей</span>
            </Form.Item>

            <Form.Item label="О себе">
              {getFieldDecorator("about", {
                rules: [
                  {
                    required: true,
                    message: "Расскажите о себе"
                  }
                ]
              })(<TextArea rows={4} />)}
            </Form.Item>

            <Form.Item {...formTailLayout}>
              <Button type="primary" onClick={this.check} icon="file-add">
                Создать анкету
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {/* <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img style={{ width: 480, height: 600 }} src={imgMetro} alt="metro" />
        </Modal> */}
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: "dynamic_rule" })(DynamicRule);
export default WrappedDynamicRule;
