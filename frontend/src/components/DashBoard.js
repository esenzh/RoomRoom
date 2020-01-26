import React, {Component} from 'react';
import {Card, Row, Layout, Breadcrumb, Col, Modal, Avatar, Icon} from 'antd';

const {Header, Content, Sider} = Layout;
const {Meta} = Card;


class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      idUser: null,
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  async componentDidMount() {
    let arr1FromSession = {
      idAuthor: '_idjlkjlkg8997867ghg',
      location: 'Бульвар Рокоссовского',
      interest: [],
      data: 'Date',
      about: 'String',
      likes: [],
      prise: 25
    }
    // const resp = await fetch('/api/profile');
    // const data = await resp.json();
    // const user =
    const reqComparison = await fetch(
      '/api/findSimilarUsers',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(arr1FromSession)
      });
    let idUser = await reqComparison.json();
    this.setState({idUser: idUser})
    console.log(this.state.idUser[0].photo[0])
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Layout style={{padding: '0 84px 84px'}}>
          <Content
            style={{
              background: '#fff',
              padding: 30,
              margin: 20,
              minHeight: 280,
            }}
          >
            <Row gutter={16}>

              {this.state.idUser && this.state.idUser.map((user, i) => {
                return (
                  <Col span={8}>
                    <Card
                      onClick={this.showModal}
                      style={
                        {
                          width: 240,
                          height: 250,
                          marginLeft: 'auto',
                          marginRight: "auto",
                          padding: 10,
                          margin: 10
                        }
                      }
                      cover={<img alt="example" src={user['photo'][0]}/>}
                      key={i}
                    >
                      <Meta title={user['first_name']}/>
                    </Card>
                  </Col>
                )
              })}

            </Row>
          </Content>
        </Layout>

        {this.state.idUser &&
        <Modal
          title="Детальная информация"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <div style={{textAlign: 'center'}}>
            <Avatar
              size={240}
              src={this.state.idUser[0].photo[0]}
            />
            <p>Информация</p>
            <p>Информация</p>
            <p>Информация</p>

          </div>
          <Icon type="heart" />
          <Icon type="close-circle" />


        </Modal>}


      </div>
    );
  }
}

export default DashBoard;