import React, { Component } from 'react';
import { Modal, Avatar } from 'antd';

class LikedByProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (<div>
            <Avatar
                size={100}
                icon="user"
                shape="square"
                style={{ margin: '10px' }}
            />
            {/* <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal> */}
        </div>);
    }
}

export default LikedByProfile;