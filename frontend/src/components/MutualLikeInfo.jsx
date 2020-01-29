import React, { Component } from 'react';
import { Modal, Avatar, Button, List } from 'antd';

class MutualLikeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            <Modal
                title="Инфорамация о человеке"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleOk}
                footer={[
                    <Button key="back" onClick={this.props.handleOk}>
                        Close
                    </Button>
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
                            {this.props.user.email}
                        </List.Item>
                        <List.Item>
                            {this.props.user.phone}
                        </List.Item>
                        <List.Item>
                            {this.props.user.form.prise} 000 P
                        </List.Item>
                        <List.Item>
                            {this.props.user.form.location}
                        </List.Item>
                        {this.props.user.age && (<List.Item>
                            {this.props.user.age}
                        </List.Item>)}
                        {this.props.user.nativeLocation && (
                        <List.Item>
                            {this.props.user.nativeLocation}
                        </List.Item>
                        )}
                        {this.props.user.vk && (
                        <List.Item>
                            {this.props.user.vk}
                        </List.Item>
                        )}
                        <List.Item>
                            {this.props.user.form.interest.join(', ')}
                        </List.Item>
                    </List>
                </div>
            </Modal>
        </div>);
    }
}

export default MutualLikeInfo;