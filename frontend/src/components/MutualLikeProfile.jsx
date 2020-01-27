import React, { Component } from 'react';
import {Avatar} from 'antd';

class MutualLikeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            <Avatar
                size={100}
                icon="user"
                shape="square"
                style={{ margin: '10px' }}
                src={this.props.user._id}
            />
        </div>);
    }
}

export default MutualLikeProfile;