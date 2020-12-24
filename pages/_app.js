import React, { useEffect } from 'react';
import './styles.css';
import Navbar from '../components/Navbar';
import BottomTab from '../components/BottomTab';
import NProgress from "nprogress";
import Head from "next/head"
import Router from "next/router";

Router.onRouteChangeStart = url => {
    NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function MyApp({ Component, pageProps }) {

    if (typeof window !== "undefined") {
        const mode = localStorage.getItem("mode") ? localStorage.getItem("mode") : "light";
        document.documentElement.dataset.theme = mode;
    }
    
    return (
        <>
            <Head>
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>
            </Head>
            <Navbar/>
            <BottomTab/>
            <Component {...pageProps}/>
        </>
    )
}