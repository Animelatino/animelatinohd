import React from 'react';
import { initGA, logPageView } from '../lib/ga';
import HeaderNavigation from './HeaderNavigation';
import BottomNavigation from './BottomNavigation';

export default class Layout extends React.Component {

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
                <HeaderNavigation/>
                {this.props.children}
                <BottomNavigation/>
            </>
        )
    }

}