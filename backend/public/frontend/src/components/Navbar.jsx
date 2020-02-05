// eslint не вижу, двойные кавычки соответственно повсюду.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Avatar } from 'antd';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import { AddUserAC, AddPhotoAC } from "../redux/type";


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.cookies.get('isLogin')) {
      this.fetchUserProfile();
    }
  }

  fetchUserProfile = async () => {
    const response = await fetch('/api/profile', {
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json();
    if (result.response !== 'fail') {
      const { first_name, last_name, email, phone, vk, nativeLocation, username, age } = result.response;
      await this.props.addPhotos(result.response.photo)
      await this.props.addUser({ first_name, last_name, email, phone, vk, nativeLocation, username, age });
    }
  }

  render() {
    return (
      <div>
        <Menu mode="horizontal" theme='dark' style={{backgroundColor: '#4A76A8', color: '#ffffff'}}>
          <Menu.Item key='profiles'>
            <Link to={'/profile'}>
              {/* Достаточно длинные строчки, читать не очень удобно. 
              Я бы поделил на несколько*/}
              <Avatar size="large" icon="user" src={this.props.photos.length !== 0 && this.props.photos[0].thumbUrl} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* Вы это не изучали, но появился новый синтаксис this.props.user?.first_name */}
              {/* Называется Null Propagation operator. Почитайте.
              Он пока считается экспериментальным, но скорее всего ненадолго */}
                <span className='navbarUserName'>{this.props.user && this.props.user.first_name}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='home' className='navbarText'>
            <Link to={'/'}>
              <Icon type="home" />
              ДОМОЙ
            </Link>
          </Menu.Item>
          <Menu.Item key='anketa' className='navbarText'>
            <Link to={'/anketa'}>
              <Icon type="form" />
              АНКЕТА
            </Link>
          </Menu.Item>
          <Menu.Item key='logout' className='navbarText' style={{float: 'right'}}>
            <Link to={'/logout'}>
              <Icon type="logout" />
              ВЫЙТИ
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    photos: store.photos,
    user: store.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => {
      dispatch(AddUserAC(user));
    },
    addPhotos: photos => {
      dispatch(AddPhotoAC(photos))
    }
  };
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Navigation));
