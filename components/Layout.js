import React from 'react';
import { initGA, logPageView } from '../lib/ga';
import Header from './Header';

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
                <Header/>
                {this.props.children}
            </>
        )
    }

}