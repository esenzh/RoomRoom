import React, { Component } from 'react';
import MutualLikeProfile from './MutualLikeProfile';
import { connect } from 'react-redux';
import { AddMutualUser } from '../redux/type';

class MutualLikeList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.fetchMutualLikes();
    }

    async fetchMutualLikes() {
        const response = await fetch('/api/likes/mutual', {
            headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json();
        if (result.response === 'fail') {
            console.log('fail');
        } else if (result.response === 'nomatch') {
            this.props.addMutualUsers([])
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
                ) : (
                        <div>
                            <p style={{ marginTop: '5px' }}>Взаимных лайков еще нету!</p>
                        </div>)}
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