import React, { Component } from 'react';
import { Modal, Avatar, List, Icon } from 'antd';
import { connect } from 'react-redux';
import { RemoveLikedByUsers } from '../redux/type';

class LikedByUserProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleLike = async () => {
        await fetch('/api/sendLikeMail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
        this.props.removeLikedByUser(this.props.user)
    }

    render() {
        return (<div>
            <Modal
                title="Инфорамация о человеке"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleOk}
                footer={[
                    <div>
                        <Icon type="close-circle" style={{ fontSize: '50px', float: 'left' }} onClick={this.props.handleOk} />
                        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" style={{ fontSize: '50px' }} onClick={this.handleLike} />
                    </div>
                ]}
            >
                <div style={{ display: 'flex' }}>
                    {this.props.user.photo.map((photo, i) => {
                        return <Avatar
                            key={i}
                            size={200}
                            icon="user"
                            shape='square'
                            style={{ margin: '10px' }}
                            src={photo.thumbUrl}
                        />
                    })}
                </div>
                <div>
                    <h2>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h2>
                    <List itemLayout="horizontal">
                        <List.Item>
                            {this.props.user.form.prise} 000 P
                        </List.Item>
                        <List.Item>
                            {this.props.user.form.location}
                        </List.Item>
                        <List.Item>
                            {this.props.user.form.interest.join(', ')}
                        </List.Item>
                        {this.props.user.age && (<List.Item>
                            {this.props.user.age}
                        </List.Item>)}
                        {this.props.user.nativeLocation && (<List.Item>
                            {this.props.user.nativeLocation}
                        </List.Item>)}
                    </List>
                </div>
            </Modal>
        </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeLikedByUser: (id) => {
            dispatch(RemoveLikedByUsers(id));
        }
    };
}

export default connect(null, mapDispatchToProps)(LikedByUserProfileInfo);