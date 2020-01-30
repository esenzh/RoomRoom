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
        <Menu mode="horizontal">
          <Menu.Item key='profiles'>
            <Link to={'/profile'}>
              <Avatar size="large" icon="user" src={this.props.photos.length !== 0 && this.props.photos[0].thumbUrl} />
              &nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.user && this.props.user.first_name}
            </Link>
          </Menu.Item>
          <Menu.Item key='home'>
            <Link to={'/'}>
              <Icon type="home" />
              ДОМОЙ
            </Link>
          </Menu.Item>
          <Menu.Item key='anketa'>
            <Link to={'/anketa'}>
              <Icon type="form" />
              АНКЕТА
            </Link>
          </Menu.Item>
          <Menu.Item key='logout'>
            <Link to={'/logout'}>
              <Icon type="logout" />
              ВЫХОД
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
