import React, { Component } from "react";
import { Avatar, Tabs, Icon, Button, Card } from "antd";
import LikedByList from "./LikedByList";
import MutualLikeList from "./MutualLikeList";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const { TabPane } = Tabs;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isRedirect: false,
      edit: false
    };
  }

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div style={{ padding: "10px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            style={{
              borderRadius: "20px",
              display: "flex",
              width: "800px",
              marginTop: "20px",
              background:
                "linear-gradient(6deg, rgba(132,100,250,1) 0%, rgba(74,118,168,1) 100%)"
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                {/*{this.props.photos.length !== 0 && (*/}
                  <Avatar
                    size={150}
                    icon="user"
                    // src={this.props.photos[0].thumbUrl}
                    src={'https://lh3.googleusercontent.com/proxy/AA0OcB1ldc8u9pEdt_eJfnOvUTwASWBpjAD8HRv5YmiolWYsUvbk_rq0w51Q9qV1YVPRAwWCXDdeLKtlouggcx8-aaHi7PYuskq7Uv13-8xqmrppLnUn6aY0RFE1I-gWgg8APqc5oX2fadaHcTxQZa2x5mVL_YjGJlnXobdn7q3qRTppqKiFSw'}

                  />
                {/*)}*/}
              </div>
              <div>
                <Link to={"/profile/edit"}>
                  <Button ghost="default" icon="edit">
                    Редактировать
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              {this.props.user && (
                <div>
                  <h1
                    style={{ color: "#ffffff" }}
                  >{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>
                  <div>
                    <h3 style={{ color: "#ffffff" }}>
                      <span style={{ fontWeight: "bold" }}>
                        <Icon type="user" /> &nbsp; Логин:{" "}
                      </span>{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {this.props.user.username}
                      </span>
                    </h3>
                  </div>
                  <div>
                    <h3 style={{ color: "#ffffff" }}>
                      <span style={{ fontWeight: "bold" }}>
                        <Icon type="phone" /> &nbsp; Номер телефона:{" "}
                      </span>{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {this.props.user.phone}
                      </span>
                    </h3>
                  </div>
                  <div>
                    <h3 style={{ color: "#ffffff" }}>
                      <span style={{ fontWeight: "bold" }}>
                        <Icon type="mail" /> &nbsp; E-mail:{" "}
                      </span>{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {this.props.user.email}
                      </span>
                    </h3>
                  </div>
                  <div>
                    <h3 style={{ color: "#ffffff" }}>
                      <span style={{ fontWeight: "bold" }}>
                        <Icon type="calendar" /> &nbsp; Возраст:{" "}
                      </span>{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {this.props.user.age}
                      </span>
                    </h3>
                  </div>
                  {this.props.user.vk && (
                    <div>
                      <h3 style={{ color: "#ffffff" }}>
                        <span style={{ fontWeight: "bold" }}>
                          <Icon type="global" /> &nbsp; VK:{" "}
                        </span>{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {this.props.user.vk}
                        </span>
                      </h3>
                    </div>
                  )}
                  {this.props.user.nativeLocation && (
                    <div>
                      <h3 style={{ color: "#ffffff" }}>
                        <span style={{ fontWeight: "bold" }}>
                          <Icon type="compass" /> &nbsp; Родной город:{" "}
                        </span>{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {this.props.user.nativeLocation}
                        </span>
                      </h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card className="likeCard">
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
                <div style={{ display: "block", textAlign: "center" }}>
                  {this.props.photos &&
                    this.props.photos.map((url, i) => {
                      return (
                        <Avatar
                          size={150}
                          icon="user"
                          shape="square"
                          src={url.thumbUrl}
                          style={{ margin: "10px 10px 0 0" }}
                          onClick={this.showModal}
                          key={i}
                        />
                      );
                    })}
                </div>
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
                <div>
                  <div>
                    <h2>Совпадения:</h2>
                  </div>
                  <div>
                    <MutualLikeList />
                  </div>
                </div>
                <hr />
                <div>
                  <div>
                    <h2>Ваша анкета понравилась:</h2>
                  </div>
                  <div>
                    <LikedByList />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    edit: store.editProfile,
    photos: store.photos,
    user: store.user
  };
}

export default connect(mapStateToProps)(Profile);
