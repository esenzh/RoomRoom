import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Avatar } from 'antd';
import { withCookies } from 'react-cookie';


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount = () => {
    if (this.props.cookies.get('isLogin')) {
      this.fetchUserProfile();
    }
  }

  fetchUserProfile = async () => {
    const response = await fetch('/api/user', {
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json();
    if (result.response !== 'fail') {
      this.setState({
        photoUrl: result.response.photo[0].thumbUrl,
        first_name: result.response.first_name,
        isLogin: true,
      })
    } else {
      console.log('Fail to get profile')
    }
  }

  render() {
    return (
      <div>
        {this.state.isLogin && (
          <Menu mode="horizontal">
            {/* TODO: Put user profile photo */}
            <Menu.Item key='profiles'>
              <Link to={'/profile'}>
                <Avatar size="large" icon="user" src={this.state.photoUrl} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {this.state.first_name}
              </Link>
            </Menu.Item>
            <Menu.Item key='home'>
              <Link to={'/home'}>
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
        )}
      </div>
    );
  }
}

export default withCookies(Navigation);
