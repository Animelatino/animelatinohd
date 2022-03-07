import React, { Component } from 'react';
import { initGA, logPageView } from '../lib/ga';
import HeaderNavigation from './HeaderNavigation';
import BottomNavigation from './BottomNavigation';
import DetectAdBlock from './DetectAdBlock';
import MobileApp from './MobileApp';

export default class Layout extends Component {
    componentDidMount() {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        logPageView();
    }

    render() {
        return (
            <>
                <HeaderNavigation />
                {this.props.children}
                <BottomNavigation />
                {/* <DetectAdBlock /> */}
                <MobileApp />
            </>
        );
    }
}
