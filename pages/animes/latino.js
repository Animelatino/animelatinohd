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
        this.state = {
            data: this.props.data,
            perPage: 28
        }
    }

    changePage = (type) => {
        const page = this.props.router.query.page ? this.props.router.query.page : 1;
        const { router } = this.props;
        if(type === 'prev' && parseInt(page - 1) === 1){
            router.push({
                query: null
            })
        }else{
            router.push({
                query: {
                    page: type === 'next' ? parseInt(parseInt(page) + 1) : parseInt(parseInt(page) - 1)
                }
            })
        }
    }

    paginationAnimes = () => {
        const page = this.props.router.query.page ? this.props.router.query.page : 1;
        const { data, perPage } = this.state;
        return (
            <div className={styles.paginate}>
                { data[(page-1)*perPage-1] && (
                <a className={styles.item} onClick={() => this.changePage('prev')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                </a>
                )}
                <a className={`${styles.item} ${styles.active}`}>{page}</a>
                { data[page*perPage+1] && (
                <a className={styles.item} onClick={() => this.changePage('next')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                    </svg>
                </a>
                )}
            </div>
        )
    }

    render() {
        let { page } = this.props.router.query;
        page = page ? page : 1;
        const { data, perPage } = this.state;
        return (
            <Layout>
                <Head>
                    <title>{`Lista de animes en Español Latino • ${process.env.NAME}`}</title>
                    <meta name="description" content={`Anime Online en Español Latino Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <link rel="canonical" href={`${process.env.URL}/animes/latino`} />
                    <meta name="og:title" content={`Lista de animes en Español Latino • ${process.env.NAME}`} />
                    <meta name="og:description" content={`Anime Online en Español Latino Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`} />
                    <meta name="og:url" content={`${process.env.URL}/animes/latino`} />
                    <meta name="og:locale" content="es_LA" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://i.imgur.com/Iof3uSm.jpg" />
                    <meta property="og:image:width" content="265" />
			        <meta property="og:image:height" content="265" />
                    <meta itemProp="image" content="https://i.imgur.com/Iof3uSm.jpg" />
                </Head>
                <main className={styles.container}>
                    <ListAnimes title={'Animes en Español Latino'} animes={data?.slice(((page-1)*perPage),(page*perPage))} paginate={this.paginationAnimes()}/>
                </main>
            </Layout>
        );
    }
}

export async function getStaticProps() {
    const res = await api.get(`anime/latino`);
    return {
        props: {
            data: res.data,
        },
        revalidate: 1
    }
}


export default withRouter(index);