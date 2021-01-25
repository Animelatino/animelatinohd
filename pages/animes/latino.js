import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { api } from '../../lib/api';
import ListAnimes from '../../components/ListAnimes';
import Layout from '../../components/Layout';

import styles from '../../styles/Animes.module.css';

class index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <Layout>
                <Head>
                    <title>{`Lista de animes en Español LAtino • ${process.env.NAME}`}</title>
                    <meta name="description" content={`Anime Online en Español Latino Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <link rel="canonical" href={`${process.env.URL}/animes`} />
                    <meta name="og:title" content={`Lista de animes en Español LAtino • ${process.env.NAME}`} />
                    <meta name="og:description" content={`Anime Online en Español Latino Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <meta name="og:url" content={`${process.env.URL}/animes`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://i.imgur.com/Iof3uSm.jpg" />
                    <meta property="og:image:width" content="265" />
			        <meta property="og:image:height" content="265" />
                    <meta itemProp="image" content="https://i.imgur.com/Iof3uSm.jpg" />
                </Head>
                <main className={styles.container}>
                    <ListAnimes title={'Animes en Español Latino'} animes={Object.values(data)}/>
                </main>
            </Layout>
        );
    }
}

export async function getServerSideProps(context) {
    const res = await api.get(`anime/latino`);
    return {
        props: {
            data: res.data
        }
    }
}

export default withRouter(index);