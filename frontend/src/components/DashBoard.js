import React, {Component} from 'react';
import {Card, Row, Layout, Breadcrumb, Col, Modal, Avatar, Icon, message, Spin, Alert, Empty, Button} from 'antd';
import {BrowserRouter as Router, Redirect} from "react-router-dom";

const {Header, Content, Sider} = Layout;
const {Meta} = Card;


class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      redirectToAnket:false,
      loading: false,
      haveAnket: false,
      users: null,
      id: null,
      visible: false,
      location: null,
      about: null,
      prise: null,
      foto: null,
      first_name: null,
      interest: null,
      сomparisonInterests: null,
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
    //console.log(event.target)
    console.log(user);
    this.setState({
      id: user.id,
      location: user.location,
      about: user.about,
      prise: user.prise,
      first_name: user.first_name,
      interest: user.interest,
      foto: user.photo[0].thumbUrl,
      сomparisonInterests: user.сomparisonInterests,
      visible: true
    });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const reqComparison = await fetch("/api/findSimilarUsers", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    let users = await reqComparison.json();

    console.log(users)
    if (users.error === 'Анкета отсутствует, создайте анкету!') {
      this.setState({haveAnket: true})
    } else {
      this.setState({users: users, loading: false});
    }
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  redir = () => {
    this.setState({redirectToAnket:true})
  }

  render() {
    if (this.state.redirectToAnket){
      return <Redirect to={'/anketa'}/>
    }
    if (this.state.haveAnket) {
      return (
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 280,
          }}
          description={
            <span>
        Создайте анкету
      </span>
          }
        >
          <Button onClick={this.redir} type="primary">Cоздать анкету</Button>
        </Empty>
      )
    }

    return (
      <div>
        {this.state.loading &&
        <div style={{textAlign: 'center'}}>
          <Spin size="large" tip="Loading...">
          </Spin>
        </div>
        }

        <p style={{fontSize: '25px'}} align={"center"}>Подходящие для Вас пользователи!</p>
        {this.state.users && <Layout style={{padding: '0 84px 84px'}}>
          <Content
            style={{
              background: "#fff",
              padding: 30,
              margin: 20,
              minHeight: 280
            }}
          >
            <Row gutter={16}>

              {this.state.users.map((user, i) => {
                return (
                  <Col span={8}>
                    <Card
                      onClick={() => this.showModal(user)}
                      style={
                        {
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
                        key={user.id}
                      >
                        <h2>{user.first_name}</h2>
                        {/*<Meta title={user.firs_name} style={{fontSize: '22px'}}/>*/}
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Content>
        </Layout>}

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
              <Avatar size={180} src={this.state.foto} />
            </div>
            <p>Xочу арендовать квартиру возле метро: {this.state.location}</p>
            <p>Мои интересы: {this.state.interest.join(", ")}</p>
            <p>
              Совпавшие интересы: {this.state.сomparisonInterests.join(", ")}
            </p>
            <p>О себе: {this.state.about}</p>
            <p>Ориентировочная цена в месяц: {this.state.prise}</p>
          </Modal>
        )}
      </div>
    );
  }
}

export default DashBoard;
