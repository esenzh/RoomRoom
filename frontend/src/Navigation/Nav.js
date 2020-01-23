import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            < div >
                <NavLink to={"/component1"} activeClassName={'active'} >Component 1</NavLink>
                <NavLink to={"/component2"} activeClassName={'active'} >Component 2</NavLink>
                <NavLink to={"/component3"} activeClassName={'active'} >Component 3</NavLink>
                <NavLink exact to={"/component4"} activeClassName={'active'} >Component 4</NavLink>
                < /div>
        )
            ;
        }
    }
    
    export default Navigation;
    
