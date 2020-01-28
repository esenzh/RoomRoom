import React, { Component } from 'react';
import { Avatar } from 'antd';
import LikedByUserProfileInfo from './LikedByUserProfileInfo';

class LikedByProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
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
                src={this.props.user.photo[0].thumbUrl}
                onClick={this.showModal}
            />
            <LikedByUserProfileInfo user={this.props.user} showModal={this.showModal} handleOk={this.handleOk} visible={this.state.visible}/>
        </div>);
    }
}

export default LikedByProfile;