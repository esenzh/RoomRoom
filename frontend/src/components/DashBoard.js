import React, {Component} from 'react';
import {Card, Row, Layout, Breadcrumb, Col, Modal, Avatar, Icon} from 'antd';

const {Header, Content, Sider} = Layout;
const {Meta} = Card;


class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      visible: false,
      location: null,
      about: null,
      prise: null,
      foto: null,
      first_name: null,
      interest: null,
      сomparisonInterests: null
    }
  }

  showModal = (user) => {
    //console.log(event.target)
    console.log(user)
    this.setState({
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
    const reqComparison = await fetch(
      '/api/findSimilarUsers',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',

      });
    let users = await reqComparison.json();
    console.log(users)
    this.setState({users: users});
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

              {this.state.users && this.state.users.map((user, i) => {
                return (
                  <Col span={8}>
                    <Card
                      onClick={() => this.showModal(user)}
                      style={
                        {
                          width: 240,
                          height: 300,
                          marginLeft: 'auto',
                          marginRight: "auto",
                          padding: 10,
                          margin: 10
                        }
                      }
                      cover={<img alt="example" src={user.photo[0].thumbUrl}/>}
                      key={i}
                    >
                      <h2>{user.firs_name}</h2>
                      {/*<Meta title={user.firs_name} style={{fontSize: '22px'}}/>*/}
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Content>
        </Layout>

        {this.state.interest &&
        <Modal
          title="Детальная информация"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <div style={{height: 60}}>
              <Icon type="close-circle" style={{fontSize: '62px', float: 'left'}}/>
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" style={{fontSize: '62px', float: 'right'}}/>
            </div>
          ]}
        >
          <div style={{textAlign: 'center'}}>
            <Avatar
              size={180}
              src={this.state.foto}
            />

          </div>
          <p>Xочу арендовать квартиру возле метро: {this.state.location}</p>
          <p>Интересы: {this.state.interest.join(', ')}</p>
          <p>Совпавшие интересы: {this.state.сomparisonInterests.join(', ')}</p>
          <p>О себе: {this.state.about}</p>
          <p>Ориентировочная цена в месяц: {this.state.prise}</p>


        </Modal>}


      </div>
    );
  }
}

export default DashBoard;