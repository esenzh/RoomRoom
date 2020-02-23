import React, {Component} from "react";
import {
  Card,
  Modal,
  Avatar,
  Icon,
  message,
  Spin,
  Empty,
  Switch,
  Button,
  Carousel, Slider, Select, Badge, Form, Collapse
} from "antd";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {colorMetro, provinceData, cityData} from '../dataMetro/station'
import {AddUsersDashBoard} from "../redux/action";
const {Option} = Select;
const { Panel } = Collapse;

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      modalUser: null,
      redirectToAnket: false,
      loading: false,
      haveAnket: false,
      showMan: true,
      showWoman: true,
      minPrice: 0,
      maxPrice: 50,
      minAge: 18,
      maxAge: 100,
      visible: false,
      isRedirect: false,
      usersLength: null,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],

    };
  }

  isLike = async () => {
    this.setState({visible: false});
    const reqComparison = await fetch("/api/sendLikeMail", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: this.state.modalUser.id
      })
    });
    let users = await reqComparison.json();
    message.success(users.text);
  };

  showModal = user => {
    let photos = user.photo.map(photo => photo.thumbUrl);
    this.setState({
      modalUser: {
        id: user.id,
        location: user.location,
        about: user.about,
        prise: user.prise,
        first_name: user.first_name,
        interest: user.interest,
        foto: photos,
        сomparisonInterests: user.сomparisonInterests,
        nativeLocation: user.nativeLocation
      },
      visible: true
    });
  };

  async componentDidMount() {
    const reqUsersLength = await fetch("/api/usersLength", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    let usersLength = await reqUsersLength.json();

    this.setState({usersLength: usersLength.usersLength});


    if (this.props.users.length === 0) {
      this.setState({loading: true});
    }
    const reqComparison = await fetch("/api/findSimilarUsers", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    let users = await reqComparison.json();

    this.setState({loading: false});
    if (users.response === "unauthenticated") {
      this.setState({
        isRedirect: true
      });
    } else {
      if (users.error === "Анкета отсутствует, создайте анкету!") {
        this.setState({haveAnket: true});
      } else {
        this.props.AddUsersDashBoard(users);
      }
    }
  }

  onChangeSexMan = (checked) => {
    this.setState({showMan: checked})
  };

  onChangeSexWoman = (checked) => {
    this.setState({showWoman: checked})
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  redir = () => {
    this.setState({redirectToAnket: true});
  };

  onChangePrice = value => {
    this.setState({
      minPrice: value[0],
      maxPrice: value[1],
    });
  };
  onChangeAge = value => {
    this.setState({
      minAge: value[0],
      maxAge: value[1],
    });
  };

  filterPrise = (price) => {
    return this.state.minPrice <= price && price <= this.state.maxPrice;
  };
  filterAge = (age) => {
    if (age === null){
     return true
    }
    return this.state.minAge <= age && age <= this.state.maxAge;
  };

  filterSex = (sex) => {
    return (sex === 'male' && this.state.showMan) || (sex === 'female' && this.state.showWoman);
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

  searchMetro = async () => {
    this.setState({loading: true});
    const reqComparison = await fetch("/api/findSimilarUsers", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        newStation: this.state.secondCity,

      })
    });
    let users = await reqComparison.json();
    this.setState({loading: false});
    this.props.AddUsersDashBoard(users);
  };

  ym = () => {
    return (
      "<script src='https://mc.yandex.ru/metrika/watch.js' type='text/javascript'></script>\
      <script type='text/javascript'>\
            try {\
                  var yaCounter57428827 = new Ya.Metrika({\
                  id:57428827,\
                  clickmap:true,\
                  trackLinks:true,\
                  accurateTrackBounce:true,\
                  webvisor:true,\
                  trackHash:true\
                  });\
            } catch(e) {console.log('error') }\
      </script>"
    );
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={"/login"}/>;
    }
    if (this.state.redirectToAnket) {
      return <Redirect to={"/anketa"}/>;
    }
    if (this.state.haveAnket) {
      return (
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 280
          }}
          description={<span>Создайте анкету</span>}
        >
          <Button onClick={this.redir} type="primary">
            Cоздать анкету
          </Button>
        </Empty>
      );
    }

    const {cities} = this.state;
    return (
      <div>
        <br/>
        {this.state.loading && (
          <div style={{textAlign: "center"}}>
            <Spin size="large" tip="Загрузка..."/>
          </div>
        )}
        {this.props.users && (
          <p style={{fontSize: "25px"}} align={"center"}>
            Подходящие для Вас пользователи!
          </p>
        )}

        <Collapse >
          <Panel header="Дополнительные фильтры" key="1">

            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '55%'}}>

              <section style={{ display: "flex", flexFlow: "column raw", aligItems: "center", justifyContent: "space-around", backgroundColor: '#F5F5F6', color: '#4A76A8' }}>
                <div>
                  <div style={{textAlign: "center"}}>
                    <Switch defaultChecked onChange={this.onChangeSexMan}/> &nbsp;&nbsp;&nbsp; <img width={"40px"} src="https://img.icons8.com/ultraviolet/100/000000/farmer-male.png" alt={"Мужчины"}/>
                  </div>
                  <div style={{textAlign: "center"}}>
                    <Switch defaultChecked onChange={this.onChangeSexWoman}/> &nbsp;&nbsp;&nbsp; <img  width={"40px"} src="https://img.icons8.com/ultraviolet/100/000000/farmer-female.png" alt={"Женщины"}/>
                  </div>
                </div>

                <div style={{marginLeft: 'auto', marginRight: 'auto', width: '250px'}}>
                  <Slider range value={[this.state.minPrice, this.state.maxPrice]} max={150} onChange={this.onChangePrice}
                          defaultValue={[this.state.minPrice, this.state.maxPrice]} marks={{0: '0 т.р.', 150: '150 т.р.'}}/>Бюджет
                </div>
                <div style={{marginLeft: 'auto', marginRight: 'auto', width: '250px'}}>
                  <Slider range max={100} min={18} value={[this.state.minAge, this.state.maxAge]} onChange={this.onChangeAge}
                          defaultValue={[this.state.minAge, this.state.maxAge]} marks={{18: '18 лет', 100: '100 лет'}}/>Возраст
                </div>
              </section>
              <div>
                <Form>
                  <Form.Item label="Метро" hasFeedback>
                    <div>
                      <Select
                          defaultValue={provinceData[0]}
                          onChange={this.handleProvinceChange}
                      >
                        {provinceData.map(province => (
                            <Option key={province}>
                              <Badge color={colorMetro[province]}/>
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
                </Form>
                <Button onClick={this.searchMetro} type="primary" icon="search">Поиск</Button>
              </div>
            </div>
          </Panel>
        </Collapse>

        <div className="dashBoardContainer">
          <div className="dashBoardContent">
            {this.props.users &&

            this.props.users.map((user, i) => {
              if (this.filterPrise(user.prise) && this.filterSex(user.sex) && this.filterAge(user.age)) {

                let srcImg;
                if (user.photo[0]) {
                  srcImg = user.photo[0].thumbUrl;
                } else {
                  srcImg = 'https://alawarkey.at.ua/images/avatar.png';
                }
                return (

                  <div key={i}>
                    <Card
                      onClick={() => this.showModal(user)}
                      className="userCard"
                      cover={
                        <img
                          style={{borderRadius: "10px 10px 0px 0px"}}
                          alt="example"
                          src={srcImg}
                        />
                      }
                    >
                      <div>
                        <h3 style={{float: "left"}}>
                          {user.first_name} {user.age}
                        </h3>
                      </div>
                    </Card>
                  </div>
                );
              }
            })}
          </div>

          {this.state.modalUser && (
            <Modal
              title="Детальная информация"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={[
                <div style={{height: 60}}>
                  <Icon
                    type="close-circle"
                    style={{fontSize: "62px", float: "left"}}
                    onClick={this.handleCancel}
                  />
                  <Icon
                    type="heart"
                    theme="twoTone"
                    twoToneColor="#eb2f96"
                    style={{fontSize: "62px", float: "right"}}
                    onClick={this.isLike}
                  />
                </div>
              ]}
            >
              <div style={{textAlign: 'center'}}>
                <Carousel autoplay>
                  {this.state.modalUser.foto.map((f, i) =>
                    <div key={i}>
                      <Avatar size={180} src={f}/>
                    </div>
                  )}
                </Carousel>
              </div>
              <div style={{height: '40px'}}>

              </div>
              <p>
                <div style={{color: 'black'}}>Ищу квартиру для совместной аренды рядом с метро:</div>
                <div style={{fontSize: '20px'}}>{this.state.modalUser.location}</div>
              </p>

              <p>
                <div style={{color: 'black'}}>Мои интересы:</div>
                <div style={{fontSize: '20px'}}>{this.state.modalUser.interest.join(", ")}</div>
              </p>
              <p>
                <div style={{color: 'black'}}>Совпавшие
                  интересы: {this.state.modalUser.сomparisonInterests.length} </div>
                <div style={{fontSize: '20px'}}>{this.state.modalUser.сomparisonInterests.join(", ")}</div>
              </p>
              {this.state.modalUser.nativeLocation &&
              <p>
                <div style={{color: 'black'}}>Родной город:</div>
                <div style={{fontSize: '20px'}}>{this.state.modalUser.nativeLocation}</div>
              </p>
              }
              <p>
                <div style={{color: 'black'}}>О себе:</div>
                <div style={{fontSize: '20px'}}>{this.state.modalUser.about}</div>
              </p>
              <p>
                <div style={{color: 'black'}}>Мой бюджет аренды:</div>
                <div style={{fontSize: '20px'}}>{this.state.modalUser.prise} т.р.</div>
              </p>
            </Modal>

          )}
        </div>
        <footer style={{backgroundColor: '#4A76A8', color: '#ffffff', margin: '0 auto', width: "80%"}} align={"center"}>
          <p>Всего пользователей в RoomRoom: {this.state.usersLength}</p>

          <div dangerouslySetInnerHTML={{__html: this.ym()}}/>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    users: store.usersDashBoard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AddUsersDashBoard: users => {
      dispatch(AddUsersDashBoard(users));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);