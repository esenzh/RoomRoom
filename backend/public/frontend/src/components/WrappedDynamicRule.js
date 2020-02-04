import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Modal,
  Badge,
  Card
} from "antd";
import { Redirect } from "react-router-dom";

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

const colorMetro = {
  "Сокольническая ветка": "red",
  Замоскворецкая: "green",
  "Арбатско-Покровская": "blue",
  Филевская: "cyan",
  Кольцевая: "#85502f",
  "Калужско-Рижская": "orange",
  "Таганско-Краснопресненская": "purple",
  "Калининско-Солнцевская": "yellow",
  "Серпуховско-Тимирязевская": "grey",
  "Люблинско-Дмитровская": "lime",
  Каховская: "teal",
  Бутовская: "#acbddc"
};
const provinceData = [
  "Сокольническая ветка",
  "Замоскворецкая",
  "Арбатско-Покровская",
  "Филевская",
  "Кольцевая",
  "Калужско-Рижская",
  "Таганско-Краснопресненская",
  "Калининско-Солнцевская",
  "Серпуховско-Тимирязевская",
  "Люблинско-Дмитровская",
  "Каховская",
  "Бутовская"
];
const cityData = {
  "Сокольническая ветка": [
    "Бульвар Рокоссовского",
    "Черкизовская",
    "Преображенская площадь",
    "Сокольники",
    "Красносельская",
    "Комсомольская",
    "Красные ворота",
    "Чистые пруды",
    "Лубянка",
    "Охотныйряд",
    "Библиотека Ленина",
    "Кропоткинская",
    "Парк Культуры",
    "Фрунзенская",
    "Спортивная",
    "Воробьевы горы",
    "Университет",
    "Проспект Вернадского",
    "Юго-Западная",
    "Тропарёво",
    "Румянцево",
    "Саларьево"
  ],
  Замоскворецкая: [
    "Автозаводская",
    "Алма-Атинская",
    "Аэропорт",
    "Водный стадион",
    "Войковская",
    "Динамо",
    "Домодедовская",
    "Кантемировская",
    "Каширская",
    "Коломенская",
    "Красногвардейская",
    "Новокузнецкая",
    "Орехово",
    "Павелецкая",
    "Речной вокзал",
    "Сокол",
    "Тверская",
    "Театральная",
    "Царицыно"
  ],
  "Арбатско-Покровская": [
    "Пятницкое шоссе",
    "Митино",
    "Волоколамская",
    "Мякинино",
    "Строгино",
    "Крылатское",
    "Молодежная",
    "Кунцевская",
    "Славянский бульвар",
    "Парк Победы",
    "Киевская",
    "Смоленская",
    "Арбатская",
    "Площадь Революции",
    "Курская",
    "Бауманская",
    "Электрозаводская",
    "Семеновская",
    "Партизанская",
    "Измайловская",
    "Первомайская",
    "Щелкавская"
  ],
  Филевская: [
    "Александровский сад",
    "Арбатская",
    "Смоленская",
    "Киевская",
    "Студенческая",
    "Кутузовская",
    "Фили",
    "Багратионовская",
    "Филевский парк",
    "Пионерская",
    "Кунцевская",
    "Выставочная",
    "Международная"
  ],
  Кольцевая: [
    "Киевская",
    "Парк Культуры",
    "Октябрьская",
    "Добрынинская",
    "Павелецкая",
    "Таганская",
    "Курская",
    "Комсомольская",
    "Проспект Мира",
    "Новослободская",
    "Белорусская",
    "Краснопресненская"
  ],
  "Калужско-Рижская": [
    "Новоясеневская",
    "Ясенево",
    "Теплый стан",
    "Коньково",
    "Беляево",
    "Калужская",
    "Новые Черёмушки",
    "Профсоюзная",
    "Академическая",
    "Ленинский проспект",
    "Шаболовская",
    "Октябрьская",
    "Третьяковская",
    "Китай-город",
    "Тургеневская",
    "Сухаревская",
    "Проспект Мира",
    "Рижская",
    "Алексеевская",
    "ВДНХ",
    "Ботанический сад",
    "Свиблово",
    "Бабушкинская",
    "Медведково"
  ],
  "Таганско-Краснопресненская": [
    "Котельники",
    "Жулебино",
    "Лермонтовский проспект",
    "Выхино",
    "Рязанский проспект",
    "Кузьминки",
    "Текстильщики",
    "Волгоградский проспект",
    "Пролетарская",
    "Таганская",
    "Китай-город",
    "Кузнецкий мост",
    "Пушкинская",
    "Баррикадная",
    "Улица 1905 года",
    "Беговая",
    "Полежаевская",
    "Октябрьское Поле",
    "Щукинская",
    "Спартак",
    "Тушинская",
    "Сходненская",
    "Планерная"
  ],
  "Калининско-Солнцевская": [
    "Новокосино",
    "Новогиреево",
    "Перово",
    "Шоссе Энтузиастов",
    "Авиамоторная",
    "Площадь Ильича",
    "Марксистская",
    "Третьяковская",
    "Деловой центр"
  ],
  "Серпуховско-Тимирязевская": [
    "Бульвар Дмитрия Донского",
    "Аннино",
    "Улица академика Янгеля",
    "Пражская",
    "Южная",
    "Чертановская",
    "Севастопольская",
    "Нахимовский Проспект",
    "Нагорная",
    "Нагатинская",
    "Тульская",
    "Серпуховская",
    "Полянка",
    "Боровицкая",
    "Чеховская",
    "Цветной бульвар",
    "Менделеевская",
    "Савеловская",
    "Дмитровская",
    "Тимирязевская",
    "Петровско-Разумовская",
    "Владыкино",
    "Отрадное",
    "Бибирево",
    "Алтуфьево"
  ],
  "Люблинско-Дмитровская": [
    "Зябликово",
    "Шипиловская",
    "Борисово",
    "Марьино",
    "Братиславская",
    "Люблино",
    "Волжская",
    "Печатники",
    "Кожуховская",
    "Дубровка",
    "Крестьянская застава",
    "Римская",
    "Чкаловская",
    "Сретенский бульвар",
    "Трубная",
    "Достоевская",
    "Марьина роща"
  ],
  Каховская: ["Каховская", "Варшавская", "Каширская"],
  Бутовская: [
    "Битцевский парк",
    "Лесопарковая",
    "Улица Старокачаловская",
    "Улица Скобелевская",
    "Бульвар адмирала Ушакова",
    "Улица Горчакова"
  ]
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
