import React, { Component } from 'react';
import LikedByProfile from './LikedByProfile';
import { connect } from 'react-redux';
import { AddLikedByUsers } from '../redux/type';

class LikedByList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.fetchLikedBy();
    }

    async fetchLikedBy() {
        const response = await fetch('/api/likes/by', {
            headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json();
        if (result.response.length !== 'fail') {
            this.props.addLikedByUsers(result.response)
        } else {
            console.log('Server fail')
        }
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                {this.props.likedByUsers && this.props.likedByUsers.length !== 0 ? (
                    this.props.likedByUsers.map((user, i) => {
                        return <LikedByProfile user={user} key={i} />
                    })
                ) : (
                        <div>
                            <p style={{ marginTop: '5px' }}>Вашу анкету еще ни кто не лайкнул!</p>
                        </div>)}
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