import React, {Component} from 'react';
import {Card, Row, Layout, Breadcrumb,Col} from 'antd';

const {Header, Content, Sider} = Layout;
const {Meta} = Card;
const idUser = [{
  "_id": "5e2aabec7624d483fe18b670",
  "photo": ["https://topovik.com/wp-content/uploads/2017/06/%D0%94%D1%83%D1%8D%D0%B9%D0%BD-%D0%94%D0%B6%D0%BE%D0%BD%D1%81%D0%BE%D0%BD.jpg"],
  "first_name": "Benjamin",
  "last_name": "Vance",
  "email": "benjamin.vance@isodrive.name",
  "phone": "+7 (912) 527-2300",
  "username": "benjamin",
  "password": "$2b$10$BY2XlnJxq/kw/TT1zijy1uHmZ8DDjPqvAD.JO.kxsiNGb.UNJwpGS",
  "__v": 0
},
  {
    "_id": "5e2aabec7624d483fe18b671",
    "photo": ["https://s16.stc.all.kpcdn.net/share/i/12/10820587/inx960x640.jpg"],
    "first_name": "Laurie",
    "last_name": "Cox",
    "email": "laurie.cox@geekol.net",
    "phone": "+7 (961) 540-3596",
    "username": "laurie",
    "password": "$2b$10$u6XiXtcQZ8ykICvgGKnFmeQLOcsq512RZRpueagzYJZTjbSHY4M0e",
    "__v": 0
  },
  {
    "_id": "5e2aabec7624d483fe18b672",
    "photo": ["https://i.artfile.ru/2000x1528_961005_[www.ArtFile.ru].jpg"],
    "first_name": "Roxanne",
    "last_name": "Barrett",
    "email": "roxanne.barrett@pushcart.me",
    "phone": "+7 (861) 523-3817",
    "username": "roxanne",
    "password": "$2b$10$Yb0ElXp2Ew/81FPSIcNDDu5ofhJ4VfDieYBpPwPR3.JTx5sl2Syz2",
    "__v": 0
  },
  {
    "_id": "5e2aabed7624d483fe18b674",
    "photo": ["https://w-dog.ru/wallpapers/4/14/426082441147564/leonardo-di-kaprio-leonardo-dikaprio-muzhchina-akter-foto-oboi-multi-monitory.jpg"],
    "first_name": "Davidson",
    "last_name": "Cooke",
    "email": "davidson.cooke@digial.biz",
    "phone": "+7 (909) 494-2108",
    "username": "davidson",
    "password": "$2b$10$XCZ.yRu6Zo8f/zfrL0dmqOCzrATwKx7YD1KM8N9Q5Xysl7uQAYVOi",
    "__v": 0
  },
  {
    "_id": "5e2aabec7624d483fe18b671",
    "photo": ["https://s16.stc.all.kpcdn.net/share/i/12/10820587/inx960x640.jpg"],
    "first_name": "Laurie",
    "last_name": "Cox",
    "email": "laurie.cox@geekol.net",
    "phone": "+7 (961) 540-3596",
    "username": "laurie",
    "password": "$2b$10$u6XiXtcQZ8ykICvgGKnFmeQLOcsq512RZRpueagzYJZTjbSHY4M0e",
    "__v": 0
  },
  {
    "_id": "5e2aabec7624d483fe18b672",
    "photo": ["https://i.artfile.ru/2000x1528_961005_[www.ArtFile.ru].jpg"],
    "first_name": "Roxanne",
    "last_name": "Barrett",
    "email": "roxanne.barrett@pushcart.me",
    "phone": "+7 (861) 523-3817",
    "username": "roxanne",
    "password": "$2b$10$Yb0ElXp2Ew/81FPSIcNDDu5ofhJ4VfDieYBpPwPR3.JTx5sl2Syz2",
    "__v": 0
  },
  {
    "_id": "5e2aabec7624d483fe18b672",
    "photo": ["https://i.artfile.ru/2000x1528_961005_[www.ArtFile.ru].jpg"],
    "first_name": "Roxanne",
    "last_name": "Barrett",
    "email": "roxanne.barrett@pushcart.me",
    "phone": "+7 (861) 523-3817",
    "username": "roxanne",
    "password": "$2b$10$Yb0ElXp2Ew/81FPSIcNDDu5ofhJ4VfDieYBpPwPR3.JTx5sl2Syz2",
    "__v": 0
  },
  {
    "_id": "5e2aabed7624d483fe18b674",
    "photo": ["https://w-dog.ru/wallpapers/4/14/426082441147564/leonardo-di-kaprio-leonardo-dikaprio-muzhchina-akter-foto-oboi-multi-monitory.jpg"],
    "first_name": "Davidson",
    "last_name": "Cooke",
    "email": "davidson.cooke@digial.biz",
    "phone": "+7 (909) 494-2108",
    "username": "davidson",
    "password": "$2b$10$XCZ.yRu6Zo8f/zfrL0dmqOCzrATwKx7YD1KM8N9Q5Xysl7uQAYVOi",
    "__v": 0
  },
  {
    "_id": "5e2aabec7624d483fe18b671",
    "photo": ["https://s16.stc.all.kpcdn.net/share/i/12/10820587/inx960x640.jpg"],
    "first_name": "Laurie",
    "last_name": "Cox",
    "email": "laurie.cox@geekol.net",
    "phone": "+7 (961) 540-3596",
    "username": "laurie",
    "password": "$2b$10$u6XiXtcQZ8ykICvgGKnFmeQLOcsq512RZRpueagzYJZTjbSHY4M0e",
    "__v": 0
  },
  {
    "_id": "5e2aabec7624d483fe18b672",
    "photo": ["https://i.artfile.ru/2000x1528_961005_[www.ArtFile.ru].jpg"],
    "first_name": "Roxanne",
    "last_name": "Barrett",
    "email": "roxanne.barrett@pushcart.me",
    "phone": "+7 (861) 523-3817",
    "username": "roxanne",
    "password": "$2b$10$Yb0ElXp2Ew/81FPSIcNDDu5ofhJ4VfDieYBpPwPR3.JTx5sl2Syz2",
    "__v": 0
  },
  {
    "_id": "5e2aabed7624d483fe18b674",
    "photo": ["https://w-dog.ru/wallpapers/4/14/426082441147564/leonardo-di-kaprio-leonardo-dikaprio-muzhchina-akter-foto-oboi-multi-monitory.jpg"],
    "first_name": "Davidson",
    "last_name": "Cooke",
    "email": "davidson.cooke@digial.biz",
    "phone": "+7 (909) 494-2108",
    "username": "davidson",
    "password": "$2b$10$XCZ.yRu6Zo8f/zfrL0dmqOCzrATwKx7YD1KM8N9Q5Xysl7uQAYVOi",
    "__v": 0
  }
];


class DashBoard extends Component {

  // async componentDidMount() {
  //   console.log('Task cookie: ' ,)
  //   const response = await fetch('/users/todo', {
  //     method: 'POST',
  //     // body: JSON.stringify({
  //     //   userId: this.props.cookies.get('userId'),
  //     //
  //     // }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //
  //   let result = await response.json();
  //
  //   this.props.updateNote(result.notes)
  // }
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

              {idUser && idUser.map((user, i) => {
                return (
                  <Col span={8}>
                    <Card
                      style={
                        {
                          width: 240,
                          height:250,
                          marginLeft: 'auto',
                          marginRight: "auto",
                          padding:10,
                          margin:10
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


      </div>
    );
  }
}

export default DashBoard;