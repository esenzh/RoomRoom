import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Avatar } from 'antd';
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import { AddUserAC, AddPhotoAC } from "../redux/action";


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
              {/*<Avatar size="large" icon="user" src={this.props.photos.length !== 0 && this.props.photos[0].thumbUrl} />*/}
              <Avatar size="large" icon="user" src={'https://lh3.googleusercontent.com/proxy/AA0OcB1ldc8u9pEdt_eJfnOvUTwASWBpjAD8HRv5YmiolWYsUvbk_rq0w51Q9qV1YVPRAwWCXDdeLKtlouggcx8-aaHi7PYuskq7Uv13-8xqmrppLnUn6aY0RFE1I-gWgg8APqc5oX2fadaHcTxQZa2x5mVL_YjGJlnXobdn7q3qRTppqKiFSw'} />

              &nbsp;&nbsp;&nbsp;&nbsp;
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
          <Menu.Item key='helpProject' className='navbarText' style={{float: 'right'}}>
            <Link to={'/helpProject'}>
              <Icon type="helpProject" />
              ПОДДЕРЖАТЬ ПРОЕКТ
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
