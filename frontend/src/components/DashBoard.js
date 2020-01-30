
import React, {Component} from 'react';
import {Card, Row, Layout, Col, Modal, Avatar, Icon, message, Spin, Empty, Button, Carousel} from 'antd';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AddMutualUser, AddUsersDashBoard} from "../redux/type";

const {Content} = Layout;


class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      redirectToAnket: false,
      loading: false,
      haveAnket: false,
      id: null,
      visible: false,
      location: null,
      about: null,
      prise: null,
      foto: null,
      first_name: null,
      interest: null,
      сomparisonInterests: null,
      nativeLocation:null,
      isRedirect: false
    };
  }

  isLike = async () => {
    this.setState({ visible: false });
    const reqComparison = await fetch("/api/sendLikeMail", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: this.state.id
      })
    });
    let users = await reqComparison.json();
    message.success(users.text);
  };

  showModal = user => {
    let fotos = user.photo.map((foto)=>
      foto.thumbUrl
    )
    this.setState({
      id: user.id,
      location: user.location,
      about: user.about,
      prise: user.prise,
      first_name: user.first_name,
      interest: user.interest,
      foto: fotos,
      сomparisonInterests: user.сomparisonInterests,
      nativeLocation:user.nativeLocation,
      visible: true
    });
  };

  async componentDidMount() {
    if (this.props.users.length === 0){
      this.setState({ loading: true });
    }
    const reqComparison = await fetch("/api/findSimilarUsers", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    let users = await reqComparison.json();

    this.setState({loading: false });
    if (users.response === "unauthenticated") {
      this.setState({
        isRedirect: true
      });
    }else{
      if (users.error === "Анкета отсутствует, создайте анкету!") {
        this.setState({ haveAnket: true });
      } else {
        this.props.AddUsersDashBoard(users)

      }
    }
  }

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  redir = () => {
    this.setState({ redirectToAnket: true });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={"/login"} />;
    }
    if (this.state.redirectToAnket) {
      return <Redirect to={"/anketa"} />;
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

    return (
      <div>
        {this.state.loading && (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" tip="Loading..."></Spin>
          </div>
        )}


        <p style={{ fontSize: "25px" }} align={"center"}>
          Подходящие для Вас пользователи!
        </p>
        {this.props.users && (
          <Layout style={{ padding: "0 84px 84px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 30,
                margin: 20,
                minHeight: 340,
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
                {this.props.users.map((user, i) => {
                  return (
                      <Card
                        onClick={() => this.showModal(user)}
                        style={{
                          width: 240,
                          height: 300,
                          marginLeft: "auto",
                          marginRight: "auto",
                          padding: 10,
                          margin: 10
                        }}
                        cover={
                          <img alt="example" src={user.photo[0].thumbUrl} />
                        }

                      >
                        <div>
                          <div style={{float: "left",fontSize: "22px"}}>
                            {user.first_name}
                          </div>
                          <div style={{float:"right",fontSize: "22px"}}>
                            {user.age}
                          </div>
                        </div>

                      </Card>
                  );
                })}
            </Content>
          </Layout>
        )}

        {this.state.interest && (
          <Modal
            title="Детальная информация"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={[
              <div style={{ height: 60 }}>
                <Icon
                  type="close-circle"
                  style={{ fontSize: "62px", float: "left" }}
                  onClick={this.handleCancel}
                />
                <Icon
                  type="heart"
                  theme="twoTone"
                  twoToneColor="#eb2f96"
                  style={{ fontSize: "62px", float: "right" }}
                  onClick={this.isLike}
                />
              </div>
            ]}
          >
            <div style={{ textAlign: "center" }}>
              <Carousel autoplay>
                {this.state.foto.map((f,i)=>
                  <div key={i}>
                    <Avatar  size={180} src={f} />
                  </div>
                )}
              </Carousel>
            </div>
            {/*<Descriptions title="User Info" layout="vertical">*/}
            {/*  <Descriptions.Item label="Xочу арендовать квартиру возле метро">{this.state.location}</Descriptions.Item>*/}
            {/*  <Descriptions.Item label="Мои интересы">{this.state.interest.join(", ")}</Descriptions.Item>*/}
            {/*  <Descriptions.Item label="Совпавшие интересы">{this.state.сomparisonInterests.join(", ")}</Descriptions.Item>*/}
            {/*  /!*<Descriptions.Item label="О себе:" span={2}>*!/*/}
            {/*  /!*  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China*!/*/}
            {/*  /!*</Descriptions.Item>*!/*/}
            {/*  <Descriptions.Item label="Ориентировочная цена в месяц">{this.state.prise}</Descriptions.Item>*/}
            {/*</Descriptions>*/}
            <p><b>Xочу арендовать квартиру возле метро:</b> {this.state.location}</p>
            <p><b>Мои интересы:</b> {this.state.interest.join(", ")}</p>
            <p>
              <b>Совпавшие интересы: {this.state.сomparisonInterests.length}</b> ({this.state.сomparisonInterests.join(", ")})
            </p>
            {this.state.nativeLocation && <p><b>Родной город:</b> {this.state.nativeLocation}</p> }
            <p><b>О себе:</b> {this.state.about}</p>
            <p><b>Ориентировочная цена в месяц:</b> {this.state.prise}</p>
          </Modal>
        )}
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
    AddUsersDashBoard: (users) => {
      dispatch(AddUsersDashBoard(users));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
