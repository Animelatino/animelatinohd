import React, { Component } from 'react';
import HeaderNavigation from './HeaderNavigation';
import BottomNavigation from './BottomNavigation';
import MobileApp from './MobileApp';

export default class Layout extends Component {
    render() {
        return (
            <>
                <HeaderNavigation />
                {this.props.children}
                <BottomNavigation />
                <MobileApp />
            </>
        );
    }
}
