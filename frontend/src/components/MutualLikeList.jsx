import React, { Component } from 'react';
import MutualLikeProfile from './MutualLikeProfile';
import { connect } from 'react-redux';
import { AddMutualUser } from '../redux/type';
import { Empty } from 'antd';

class MutualLikeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noForm: false
        }
    }

    componentDidMount() {
        this.fetchMutualLikes();
    }

    async fetchMutualLikes() {
        const response = await fetch('/api/likes/mutual', {
            headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json();
        if (result.response === 'fail' || result.response === 'nomatch') {
            this.props.addMutualUsers([])
        } else if (result.response === 'noform') {
            this.props.addMutualUsers([])
            this.setState({
                noForm: true
            })
        } else {
            this.props.addMutualUsers(result.response)
        }
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                {this.props.mutualUsers && this.props.mutualUsers.length !== 0 ? (
                    this.props.mutualUsers.map((user, i) => {
                        return <MutualLikeProfile user={user} key={i} />
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
                </Empty>) : (
                            <Empty
                                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        Взаимных лаков нету
                      </span>
                                }
                            >
                            </Empty>)}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        mutualUsers: store.mutualUsers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addMutualUsers: (users) => {
            dispatch(AddMutualUser(users));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MutualLikeList);