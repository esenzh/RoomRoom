import React, { Component } from "react";
import { Avatar, Descriptions, Row, Col, Tabs, Icon, Badge } from "antd";
import LikedByList from './LikedByList';
import MutualLikeList from './MutualLikeList';

const { TabPane } = Tabs;

class Profile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.fetchUserProfile();
    }

    fetchUserProfile = async () => {
        const response = await fetch("/api/profile", {
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        if (result.response !== "fail") {
            this.setState({
                photoUrl: result.response.photo,
                profileInfo: {
                    first_name: result.response.first_name,
                    last_name: result.response.last_name,
                    email: result.response.email,
                    phone: result.response.phone,
                    username: result.response.username,
                }
            });
        } else {
            console.log("Fail to get profile");
        }
    };

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    render() {
        return (
            <div className="profileContainer">
                <Row>
                    <Col span={6}>
                        {this.state.photoUrl && (
                            <Avatar
                                size={200}
                                icon="user"
                                src={this.state.photoUrl[0].thumbUrl}
                            />
                        )}
                    </Col>

                    <Col span={18}>
                        {this.state.profileInfo && (
                            <div>
                                <h1>{`${this.state.profileInfo.first_name} ${this.state.profileInfo.last_name}`}</h1>
                                <Descriptions title=" ">
                                    <Descriptions.Item label="Логин">{this.state.profileInfo.username}</Descriptions.Item>
                                    <Descriptions.Item label="Номер телефона">{this.state.profileInfo.phone}</Descriptions.Item>
                                    <Descriptions.Item label="E-mail">{this.state.profileInfo.email}</Descriptions.Item>
                                    <Descriptions.Item label="Возраст">24</Descriptions.Item>
                                    <Descriptions.Item label="VK">
                                        Some id
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Место рождения">
                                        Россия
                                    </Descriptions.Item>
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
                                <Icon type="user" />
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
                                {this.state.photoUrl && (
                                    this.state.photoUrl.map((url, i) => {
                                        return <Avatar
                                            size={200}
                                            icon="user"
                                            shape="square"
                                            src={url.thumbUrl}
                                            style={{ margin: '10px' }}
                                            key={i}
                                        />
                                    })

                                )}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                                Лайк
                                <Badge dot={true}>
                                    <a href="#" className="head-example" />
                                </Badge>
                            </span>
                        }
                        key="2"
                    >
                        <Row>
                            <Col span={6}>
                                <h2>Взаимные лайки:</h2>
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


                {/* <Carousel afterChange={this.onChange}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel> */}
                ,
      </div>
        );
    }
}

export default Profile;
