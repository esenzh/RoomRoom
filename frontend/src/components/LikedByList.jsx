import React, { Component } from 'react';
import LikedByProfile from './LikedByProfile';
import { connect } from 'react-redux';
import { AddLikedByUsers } from '../redux/type';
import { Empty } from 'antd';

class LikedByList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noForm: false
        }
    }

    componentDidMount() {
        this.fetchLikedBy();
    }

    async fetchLikedBy() {
        const response = await fetch('/api/likes/by', {
            headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json();
        if (result.response === 'fail') {
            console.log('Server fail')
        } else if (result.response === 'noform') {
            this.props.addLikedByUsers([]);
            this.setState({
                noForm: true
            })
        } else {
            this.props.addLikedByUsers(result.response)
        }
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                {this.props.likedByUsers && this.props.likedByUsers.length !== 0 ? (
                    this.props.likedByUsers.map((user, i) => {
                        return <LikedByProfile user={user} key={i} />
                    })
                ) : this.state.noForm ? (<Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={{
                        height: 60,
                    }}
                    description={
                        <span>
                            Создайте анкету
                      </span>
                    }
                >
                </Empty>) : (<Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={{
                        height: 60,
                    }}
                    description={
                        <span>
                            Вашу анкету еще никто не лайкнул
                      </span>
                    }
                >
                </Empty>)}
            </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addLikedByUsers: (users) => {
            dispatch(AddLikedByUsers(users));
        }
    };
}

function mapStateToProps(store) {
    return {
        likedByUsers: store.likedByUsers
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedByList);