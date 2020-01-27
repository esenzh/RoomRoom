import React, {Component} from 'react';
import {Card, Row, Layout, Breadcrumb, Col, Modal, Avatar, Icon} from 'antd';

const {Header, Content, Sider} = Layout;
const {Meta} = Card;


class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      id:null,
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
  isLike = async() => {
    console.log('inLike')
    const reqComparison = await fetch(
      '/api/sendLikeMail',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id:this.state.id
        })
      });
    let users = await reqComparison.json();
    console.log(users)
  }

  showModal = (user) => {
    //console.log(event.target)
    console.log(user)
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
    const reqComparison = await fetch(
      '/api/findSimilarUsers',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',

      });
    let users = await reqComparison.json();
    // console.log(users)
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
        <div>
          <table align={"center"} width={"70%"}
                 style={{fontStyle: "Courier New monospace, font-weight: bold"}}>
            <tr>
              <td align={"left"}>
                <p style={{fontSize: '25px'}} align={"center"}>Рады приветствовать Вас на сайте <b>RoomRoom</b>! </p>
                <img width={"20px"}
                     src={"https://img.icons8.com/color/48/000000/lighthouse.png"}/> Используя наш сервис Вы сможете найти подходящего Вам человека для совместного съема квартиры в аренду в городе Москве!<br/>
                <p> <img
                    width={"20px"}
                    src={"https://img.icons8.com/nolan/64/men-age-group-3.png"}/>Благодаря RoomRoom Вы подыщите человека, желающего проживать на одинаковой с Вами станции метро, по схожей стоимости и что самое главное - подходящего Вам по интересам или сфере деятельности! Система выстраивает и  показывает Вам пользователей по совпавшим интересам от наиболее подходящих к менее подходящим, но также имеющим с Вами хотя бы одно совпадение интересов. После того как Вы нажмете на лайк, понравившийся пользователь получит об этом уведомление. Посел того как он тоже добавит Вас в понравившихся пользователей вы сможете увидеть контакты друг друга в своем профиле.
                  Однако помните, что созданная Вами анкета для поиска подходящего человека удаляется через каждые три дня для поддержания актуальности базы данных пользователей. Чтобы этого не произошло обновляйте свою анкету в профиле, либо создайте новую анкету!<br/>

                  <img
                      width={"20px"}
                      src={"https://img.icons8.com/color/48/000000/heart-with-arrow.png"}/> Приятного использования сервиса RoomRoom и проживания в замечательном городе Москве, столице нашей Родины!    </p>
              </td>
            </tr>
            <hr color='red'></hr>
          </table>

        </div>
<p style={{fontSize: '25px'}} align={"center"}>Подходящие для Вас пользователи!</p>
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
                      key={user.id}
                    >
                      <h2>{user.first_name}</h2>
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
              <Icon type="close-circle" style={{fontSize: '62px', float: 'left'}} onClick={this.handleCancel}/>
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" style={{fontSize: '62px', float: 'right'}} onClick={this.isLike}/>
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
          <p>Мои интересы: {this.state.interest.join(', ')}</p>
          <p>Совпавшие интересы: {this.state.сomparisonInterests.join(', ')}</p>
          <p>О себе: {this.state.about}</p>
          <p>Ориентировочная цена в месяц: {this.state.prise}</p>
        </Modal>}
      </div>
    );
  }
}

export default DashBoard;