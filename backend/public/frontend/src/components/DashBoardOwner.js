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
import {connect} from "react-redux";
import {colorMetro, provinceData, cityData} from '../dataMetro/station'
import {AddUsersDashBoard} from "../redux/action";

const {Option} = Select;
const {Panel} = Collapse;
const srcImg = 'https://alawarkey.at.ua/images/avatar.png';

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      userOwner: [],
      // modalUser: null,
      // redirectToAnket: false,
      // loading: false,
      // haveAnket: false,
      // showMan: true,
      // showWoman: true,
      // minPrice: 0,
      // maxPrice: 50,
      // minAge: 18,
      // maxAge: 100,
      // visible: false,
      // isRedirect: false,
      // usersLength: null,
      // cities: cityData[provinceData[0]],
      // secondCity: cityData[provinceData[0]][0],

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

  componentDidMount = async () => {
    const allOwner = await fetch("/api/getAllOwner");
    let usersOwner = await allOwner.json();
    this.setState({usersOwner: usersOwner});
    console.log(usersOwner)
  };

  onChangeSexMan = (checked) => {
    this.setState({showMan: checked})
  };

  onChangeSexWoman = (checked) => {
    this.setState({showWoman: checked})
  };

  handleCancel = e => {
    this.setState({visible: false});
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
    if (age === null) {
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


  render() {
    return (
      <div>
        {/*{this.state.usersOwner.map((user, i) => {*/}
        {/*  return (*/}
        {/*    <div key={i}>*/}
        {/*      <Card*/}
        {/*        onClick={() => this.showModal(user)}*/}
        {/*        className="userCard"*/}
        {/*        cover={*/}
        {/*          <img*/}
        {/*            style={{borderRadius: "10px 10px 0px 0px"}}*/}
        {/*            alt="example"*/}
        {/*            src={srcImg}*/}
        {/*          />*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <div>*/}
        {/*          <h3 style={{float: "left"}}>*/}
        {/*            {user.name} {user.age}*/}
        {/*          </h3>*/}
        {/*        </div>*/}
        {/*      </Card>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})*/}
        {/*}*/}

        {/*{this.props.users &&*/}

        {/*this.props.users.map((user, i) => {*/}
        {/*  if (this.filterPrise(user.prise) && this.filterSex(user.sex) && this.filterAge(user.age)) {*/}

        {/*    let srcImg;*/}
        {/*    if (user.photo[0]) {*/}
        {/*      srcImg = user.photo[0].thumbUrl;*/}
        {/*    } else {*/}
        {/*      srcImg = 'https://alawarkey.at.ua/images/avatar.png';*/}
        {/*    }*/}
        {/*    return (*/}

        {/*      <div key={i}>*/}
        {/*        <Card*/}
        {/*          onClick={() => this.showModal(user)}*/}
        {/*          className="userCard"*/}
        {/*          cover={*/}
        {/*            <img*/}
        {/*              style={{borderRadius: "10px 10px 0px 0px"}}*/}
        {/*              alt="example"*/}
        {/*              src={srcImg}*/}
        {/*            />*/}
        {/*          }*/}
        {/*        >*/}
        {/*          <div>*/}
        {/*            <h3 style={{float: "left"}}>*/}
        {/*              {user.first_name} {user.age}*/}
        {/*            </h3>*/}
        {/*          </div>*/}
        {/*        </Card>*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*  }*/}
        {/*})}*/}


        {/*{this.state.modalUser && (*/}
        {/*  <Modal*/}
        {/*    title="Детальная информация"*/}
        {/*    visible={this.state.visible}*/}
        {/*    onCancel={this.handleCancel}*/}
        {/*    footer={[*/}
        {/*      <div style={{height: 60}}>*/}
        {/*        <Icon*/}
        {/*          type="close-circle"*/}
        {/*          style={{fontSize: "62px", float: "left"}}*/}
        {/*          onClick={this.handleCancel}*/}
        {/*        />*/}
        {/*        <Icon*/}
        {/*          type="heart"*/}
        {/*          theme="twoTone"*/}
        {/*          twoToneColor="#eb2f96"*/}
        {/*          style={{fontSize: "62px", float: "right"}}*/}
        {/*          onClick={this.isLike}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    ]}*/}
        {/*  >*/}
        {/*    <div style={{textAlign: 'center'}}>*/}
        {/*      <Carousel autoplay>*/}
        {/*        {this.state.modalUser.foto.map((f, i) =>*/}
        {/*          <div key={i}>*/}
        {/*            <Avatar size={180} src={f}/>*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*      </Carousel>*/}
        {/*    </div>*/}
        {/*    <div style={{height: '40px'}}>*/}

        {/*    </div>*/}
        {/*    <p>*/}
        {/*      <div style={{color: 'black'}}>Ищу квартиру для совместной аренды рядом с метро:</div>*/}
        {/*      <div style={{fontSize: '20px'}}>{this.state.modalUser.location}</div>*/}
        {/*    </p>*/}

        {/*    <p>*/}
        {/*      <div style={{color: 'black'}}>Мои интересы:</div>*/}
        {/*      <div style={{fontSize: '20px'}}>{this.state.modalUser.interest.join(", ")}</div>*/}
        {/*    </p>*/}
        {/*    <p>*/}
        {/*      <div style={{color: 'black'}}>Совпавшие*/}
        {/*        интересы: {this.state.modalUser.сomparisonInterests.length} </div>*/}
        {/*      <div style={{fontSize: '20px'}}>{this.state.modalUser.сomparisonInterests.join(", ")}</div>*/}
        {/*    </p>*/}
        {/*    {this.state.modalUser.nativeLocation &&*/}
        {/*    <p>*/}
        {/*      <div style={{color: 'black'}}>Родной город:</div>*/}
        {/*      <div style={{fontSize: '20px'}}>{this.state.modalUser.nativeLocation}</div>*/}
        {/*    </p>*/}
        {/*    }*/}
        {/*    <p>*/}
        {/*      <div style={{color: 'black'}}>О себе:</div>*/}
        {/*      <div style={{fontSize: '20px'}}>{this.state.modalUser.about}</div>*/}
        {/*    </p>*/}
        {/*    <p>*/}
        {/*      <div style={{color: 'black'}}>Мой бюджет аренды:</div>*/}
        {/*      <div style={{fontSize: '20px'}}>{this.state.modalUser.prise} т.р.</div>*/}
        {/*    </p>*/}
        {/*  </Modal>*/}

        {/*)}*/}

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