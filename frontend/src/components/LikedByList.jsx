import React, { Component } from 'react';
import LikedByProfile from './LikedByProfile';

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
            this.setState({
                likedByUsers: result.response
            })
        } else {
            console.log('Server fail')
        }
    }
    render() {
        return (<div style={{ display: 'flex' }}>
            {this.state.likedByUsers && this.state.likedByUsers.length !== 0 ? (
                this.state.likedByUsers.map((user, i) => {
                    return <LikedByProfile user={user} key={i} />
                })
            ) : (
                    <div>
                        <p style={{ marginTop: '5px' }}>Вашу анкету еще ни кто не лайкнул!</p>
                    </div>)}
        </div>);
    }
}

export default LikedByList;