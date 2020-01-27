import React, { Component } from 'react';
import MutualLikeProfile from './MutualLikeProfile';

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
        if (result.response !== 'fail') {
            this.setState({
                mutual: result.response
            })
        } else {
            this.setState({
                mutual: null
            })
        }

    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                {this.state.mutual ? (
                    this.state.mutual.map((user, i) => {
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

export default MutualLikeList;