import React, {Component} from 'react';
import {Form, Input, Button, Select, InputNumber,Modal} from 'antd';
const imgMetro = require('../images/metro.png');

const {Option} = Select;
const { TextArea } = Input;
const interest = ['программирование', 'юриспруденция', 'экономика', "музыка", "спорт", "путешествия", "медицина", "образование", "армия", "точные науки", "компьютерные игры", "автомобили", "косметология"]
const children = [];
for (let i = 0; i < 13; i++) {
  children.push(
    <Option key={interest[i]}>
      {interest[i]}
    </Option>);
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8},
};
const formTailLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8, offset: 4},
};
const provinceData = ['Сокольническая ветка', 'Замоскворецкая',"Арбатско-Покровская","Филевская",'Кольцевая',"Калужско-Рижская","Таганско-Краснопресненская",'Калининско-Солнцевская',"Серпуховско-Тимирязевская",'Люблинско-Дмитровская','Каховская','Бутовская'];
const cityData = {
  "Сокольническая ветка": ['Бульвар Рокоссовского', 'Черкизовская', 'Преображенская площадь', 'Сокольники', 'Красносельская', 'Комсомольская', 'Красные ворота', 'Чистые пруды', 'Лубянка', 'Охотныйряд', 'Библиотека Ленина', 'Кропоткинская', 'Парк Культуры', 'Фрунзенская', 'Спортивная', 'Воробьевы горы', 'Университет', 'Проспект Вернадского', 'Юго-Западная', 'Тропарёво', 'Румянцево', 'Саларьево'],
  "Замоскворецкая": ["Автозаводская", 'Алма-Атинская', 'Аэропорт', 'Водный стадион', 'Войковская', 'Динамо', 'Домодедовская', 'Кантемировская', 'Каширская', 'Коломенская', 'Красногвардейская', 'Новокузнецкая', 'Орехово', 'Павелецкая', 'Речной вокзал', 'Сокол', 'Тверская', 'Театральная', 'Царицыно'],
  "Арбатско-Покровская": ['Пятницкое шоссе', 'Митино', 'Волоколамская', 'Мякинино', 'Строгино', 'Крылатское', 'Молодежная', 'Кунцевская', 'Славянский бульвар', 'Парк Победы', 'Киевская', 'Смоленская', 'Арбатская', 'Площадь Революции', 'Курская', 'Бауманская', 'Электрозаводская', 'Семеновская', 'Партизанская', 'Измайловская', 'Первомайская'],
  "Филевская": ['Александровский сад', 'Арбатская', 'Смоленская', 'Киевская', 'Студенческая', 'Кутузовская', 'Фили', 'Багратионовская', 'Филевский парк', 'Пионерская', 'Кунцевская', 'Выставочная', 'Международная'],
  'Кольцевая': ['Киевская', 'Парк Культуры', 'Октябрьская', 'Добрынинская', 'Павелецкая', 'Таганская', 'Курская', 'Комсомольская', 'Проспект Мира', 'Новослободская', 'Белорусская', 'Краснопресненская'],
  "Калужско-Рижская": ['Новоясеневская', 'Ясенево', 'Теплый стан', 'Коньково', 'Беляево', 'Калужская', 'Новые Черёмушки', 'Профсоюзная', 'Академическая', 'Ленинский проспект', 'Шаболовская', 'Октябрьская', 'Третьяковская', 'Китай-город', 'Тургеневская', 'Сухаревская', 'Проспект Мира', 'Рижская', 'Алексеевская', 'ВДНХ', 'Ботанический сад', 'Свиблово', 'Бабушкинская', 'Медведково'],
  "Таганско-Краснопресненская": ['Котельники', 'Жулебино', 'Лермонтовский проспект', 'Выхино', 'Рязанский проспект', 'Кузьминки', 'Текстильщики', 'Волгоградский проспект', 'Пролетарская', 'Таганская', 'Китай-город', 'Кузнецкий мост', 'Пушкинская', 'Баррикадная', 'Улица 1905 года', 'Беговая', 'Полежаевская', 'Октябрьское Поле', 'Щукинская', 'Спартак', 'Тушинская', 'Сходненская', 'Планерная'],
  'Калининско-Солнцевская': ['Новокосино', 'Новогиреево', 'Перово', 'Шоссе Энтузиастов', 'Авиамоторная', 'Площадь Ильича', 'Марксистская', 'Третьяковская', 'Деловой центр'],
  "Серпуховско-Тимирязевская": ['Бульвар Дмитрия Донского', 'Аннино', 'Улица академика Янгеля', 'Пражская', 'Южная', 'Чертановская', 'Севастопольская', 'Нахимовский Проспект', 'Нагорная', 'Нагатинская', 'Тульская', 'Серпуховская', 'Полянка', 'Боровицкая', 'Чеховская', 'Цветной бульвар', 'Менделеевская', 'Савеловская', 'Дмитровская', 'Тимирязевская', 'Петровско-Разумовская', 'Владыкино', 'Отрадное', 'Бибирево', 'Алтуфьево'],
  'Люблинско-Дмитровская': ['Зябликово', 'Шипиловская', 'Борисово', 'Марьино', 'Братиславская', 'Люблино', 'Волжская', 'Печатники', 'Кожуховская', 'Дубровка', 'Крестьянская застава', 'Римская', 'Чкаловская', 'Сретенский бульвар', 'Трубная', 'Достоевская', 'Марьина роща'],
  'Каховская': ['Каховская', 'Варшавская', 'Каширская'],
  'Бутовская': ['Битцевский парк', 'Лесопарковая', 'Улица Старокачаловская', 'Улица Скобелевская', 'Бульвар адмирала Ушакова', 'Улица Горчакова']
}


class DynamicRule extends Component {
  state = {
    checkNick: false,
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
    visible: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };

  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
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
              interest: value.interest,
              budget: value.budget,
              about: value.about,
              metro: this.state.secondCity
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

  // handleChange = e => {
  //   this.setState(
  //     {
  //       checkNick: e.target.checked,
  //     },
  //     () => {
  //       this.props.form.validateFields(['nickname'], {force: true});
  //     },
  //   );
  // };
  handleChange = value => {
    console.log(`selected ${value}`);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const { cities } = this.state;
    return (
      <div className='registerForm'>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h1>Новая анкета</h1>
          <Form.Item {...formItemLayout} label="Метро" hasFeedback>
            {getFieldDecorator('metro', {
              rules: [
                {
                  required: false,
                  message: 'Please select your metro!'
                }
              ],
            })(
              <div>
                <Select
                  defaultValue={provinceData[0]}
                  // style={{ width: 120 }}
                  onChange={this.handleProvinceChange}
                >
                  {provinceData.map(province => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
                <Select
                  // style={{ width: 120 }}
                  value={this.state.secondCity}
                  onChange={this.onSecondCityChange}
                >
                  {cities.map(city => (
                    <Option value={city} key={city}>{city}</Option>
                  ))}
                </Select>
              </div>
            )}
            <a onClick={this.showModal}>Показать схему метро</a>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Интересы" >
            {getFieldDecorator('interest', {
              rules: [
                {
                  required: true,
                  message: 'Please input your interest',
                },
              ],
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={this.handleChange}
              >
                {children}
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
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
        >
          <img style={{width:480,height:600}} src={imgMetro}/>

        </Modal>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({name: 'dynamic_rule'})(DynamicRule);
export default WrappedDynamicRule;