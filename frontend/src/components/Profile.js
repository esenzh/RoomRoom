import React, { Component } from "react";
import { Avatar, Descriptions, Row, Col, Tabs, Icon, Button } from "antd";
import LikedByList from "./LikedByList";
import MutualLikeList from "./MutualLikeList";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { EditProfileAC } from "../redux/type";

const { TabPane } = Tabs;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isRedirect: false,
      edit: false
    };
  }

  handleEdit = () => {
    this.props.editProfile(true);
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={"/login"} />;
    }
    if (this.props.edit) {
      return <Redirect to={"/profile/edit"} />;
    }
    return (
      <div className="profileContainer">
        <Row>
          <Col span={6}>
            {this.props.photos.length !== 0 && (
              <Avatar
                size={200}
                icon="user"
                src={this.props.photos[0].thumbUrl}
              />
            )}
          </Col>

          <Col span={18}>
            <Button
              type="primary"
              icon="edit"
              style={{ float: "right" }}
              onClick={this.handleEdit}
            >
              Редактировать
            </Button>
            {this.props.user && (
              <div>
                <h1>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>
                <Descriptions title=" ">
                  <Descriptions.Item label="Логин">
                    {this.props.user.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Номер телефона">
                    {this.props.user.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="E-mail">
                    {this.props.user.email}
                  </Descriptions.Item>
                  {this.props.user.age && (
                    <Descriptions.Item label="Возраст">
                      {this.props.user.age}
                    </Descriptions.Item>
                  )}
                  {this.props.user.vk && (
                    <Descriptions.Item label="VK">
                      {this.props.user.vk}
                    </Descriptions.Item>
                  )}
                  {this.props.user.nativeLocation && (
                    <Descriptions.Item label="Родной город">
                      {this.props.user.nativeLocation}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </div>
            )}
          </Col>
        </Row>
        <br />
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <span>
                <Icon type="picture" />
                Мои фотографии
              </span>
            }
            key="1"
          >
            <Row>
              <Col span={6}>
                <h2>Мои фотографии:</h2>
              </Col>
              <Col span={18}>
                {this.props.photos &&
                  this.props.photos.map((url, i) => {
                    return (
                      <Avatar
                        size={200}
                        icon="user"
                        shape="square"
                        src={url.thumbUrl}
                        style={{ margin: "10px" }}
                        key={i}
                      />
                    );
                  })}
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                Лайк
              </span>
            }
            key="2"
          >
            <Row>
              <Col span={6}>
                <h2>Совпадения:</h2>
              </Col>
              <Col span={18}>
                <MutualLikeList />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col span={6}>
                <h2>Ваша анкета понравилась:</h2>
              </Col>
              <Col span={18}>
                <LikedByList />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editProfile: flag => {
      dispatch(EditProfileAC(flag));
    }
  };
}

function mapStateToProps(store) {
  return {
    edit: store.editProfile,
    photos: store.photos,
    user: store.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
