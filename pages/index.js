import React from 'react';
import { NextSeo } from 'next-seo';
import { api } from '../lib/api';
import styles from '../styles/Home.module.css';
import ListEpisodes from '../components/ListEpisodes';
import ListAnimes from '../components/ListAnimes';
import Layout from '../components/Layout';

const Index = (props) => {
    const [data, setData] = React.useState(props?.data);

    const SEO = {
        title: `Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.SITENAME}`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.SITENAME}`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}`,
            title: `Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.SITENAME}`,
            description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.SITENAME}`,
            images: [{
                url: `https://i.imgur.com/Iof3uSm.jpg`,
                width: 640,
                height: 360,
                alt: `Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.SITENAME}`,
            }],
            site_name: `${process.env.SITENAME}`,
        },
        twitter: {
            handle: `@${process.env.SITENAME}`,
            site: `@${process.env.SITENAME}`,
            cardType: 'summary_large_image',
        }
    }

    return (
        <Layout>
            <NextSeo {...SEO} />
            <main className={styles.container}>
                <ListEpisodes title={'Episodios recientes'} data={data?.episodes}/>
                <ListAnimes title={'Animes recientes'} data={data?.animes}/>
            </main>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await api.get(`home`);
    return {
        props: { 
            data: res.data 
        }
    }
}

export default Index