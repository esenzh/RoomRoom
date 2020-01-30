import React, {Component} from 'react';
import {connect} from "react-redux";
import {EditProfilePageAC, AddPhotoAC} from "../redux/type";
import {Redirect} from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Icon,
  notification, Modal,
} from 'antd';

import UploadPhoto from './UploadPhoto';

const {confirm} = Modal;

const openNotification = (placement, icon, title, message) => {
  notification.open({
    message: title,
    description:
    message,
    placement,
    icon: <Icon type={icon} style={{color: '#108ee9'}}/>,
    duration: 3
  });
};

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false,
      iconLoading: false,
      visible: false,
      isDelete: false
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({iconLoading: true})
        const {
          first_name,
          last_name,
          email,
          phone,
          vk,
          nativeLocation
        } = values
        const response = await fetch('/api/profile/edit', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone,
            vk,
            nativeLocation,
            photos: this.props.photos
          })
        })
        const result = await response.json();
        if (result.response === 'fail') {
          this.setState({iconLoading: false})

        } else if (result.response === 'emailExist') {
          openNotification('topRight', 'warning', 'Warning', 'Этот E-mail уже используется!')
        } else {
          const {first_name, last_name, email, phone, nativeLocation, username, age, photo} = result.response;
          this.props.addNewProfile({first_name, last_name, email, phone, nativeLocation, username, age});
          this.props.addPhotos(photo);
          this.setState({
            isRedirect: true,
            iconLoading: false
          })
        }
      }
    })
  }

  showDeleteConfirm = async () => {
    let result = await fetch("/api/profile", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
    });
    let response = await result.json()
    if (response.response === 'success') {
      this.setState({isDelete: true})
    }
  }


  render() {
    if (this.state.isRedirect) {
      return <Redirect to={'/profile'}/>
    }
    if (this.state.isDelete) {
      return <Redirect to={'/login'}/>
    }
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className='registerForm'>
        <Card style={{borderRadius: '20px', marginTop: '50px', width: '700px'}}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Имя">
              {getFieldDecorator('first_name', {
                initialValue: this.props.user.first_name,
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите имя!',
                  },
                ],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Фамилия">
              {getFieldDecorator('last_name', {
                initialValue: this.props.user.last_name,
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите фамилию!',
                  },
                ],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                initialValue: this.props.user.email,
                rules: [
                  {
                    type: 'email',
                    message: 'Введите правильный E-mail!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите E-mail!',
                  },
                ],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Возраст">
              {getFieldDecorator('age', {
                initialValue: this.props.user.age,
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Родной город">
              {getFieldDecorator('nativeLocation', {
                initialValue: this.props.user.nativeLocation,
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Номер телефона">
              {getFieldDecorator('phone', {
                initialValue: this.props.user.phone,
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="VK">
              {getFieldDecorator('vk', {
                initialValue: this.props.user.vk,
              })(<Input/>)}
            </Form.Item>
            <Form.Item label='Загрузите фото'>
              <UploadPhoto/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button loading={this.state.iconLoading} icon='save'
                      style={{backgroundColor: '#4A76A8', color: '#ffffff'}} htmlType="submit">
                Сохранить
              </Button>
              <Button style={{backgroundColor: 'red', color: '#ffffff', alignSelf: "right"}}
                      onClick={this.showDeleteConfirm} type="dashed">
                Удалить профиль
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Modal visible={this.state.visible}>

        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewProfile: newProfile => {
      dispatch(EditProfilePageAC(newProfile));
    },
    addPhotos: photos => {
      dispatch(AddPhotoAC(photos))
    }
  };
}

function mapStateToProps(store) {
  return {
    user: store.user,
    photos: store.photos
  };
}

const NewProfile = Form.create({name: 'register'})(EditProfile);
export default connect(mapStateToProps, mapDispatchToProps)(NewProfile);