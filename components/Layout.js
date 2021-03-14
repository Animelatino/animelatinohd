import React, { Component } from 'react';
import { initGA, logPageView } from '../lib/ga';
import HeaderNavigation from './HeaderNavigation';
import BottomNavigation from './BottomNavigation';
import AdsScript from './AdsScript';
import DetectAdBlock from './DetectAdBlock';

export default class Layout extends Component {

    componentDidMount () {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        logPageView();
    }

    render () {
        return (
            <>
                <DetectAdBlock />
                <HeaderNavigation/>
                {this.props.children}
                <BottomNavigation/>
            </>
        )
    }

}