import React, { useState } from "react";
import EpisodeCard from '../components/EpisodeCard';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const Index = (props) => {
    const [episodes, setEpisodes] = useState(props.episodes);
    
    const SEO = {
        title: `Ver Anime Online en HD Sub Español Latino Gratis • AnimeLHD`,
        description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en AnimeLHD`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.homePage}`,
            title: `Ver Anime Online en HD Sub Español Latino Gratis • AnimeLHD`,
            description: `Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en AnimeLHD`,
            images: [{
                url: `https://i.imgur.com/Iof3uSm.jpg`,
                width: 640,
                height: 360,
                alt: 'AnimeLHD',
            }],
            site_name: 'AnimeLHD',
        },
        twitter: {
            handle: '@animelatinohd',
            site: '@animelatinohd',
            cardType: 'summary_large_image',
        }
    }

    return (
        <Layout>
            <main className="homePage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Últimos episodios</h2>
                <div className="listEpisodes">
                {episodes?.map((episode, idx) => (
                    <EpisodeCard episode={episode} key={idx} />
                ))}
                </div>
            </main>
        </Layout>
    );
}

Index.getInitialProps = async() => {
    const dataEpisodes = await fetch(`${process.env.apiPage}/web/home/episodes`)
    const episodes = await dataEpisodes.json();
    return { episodes: episodes };
}

export default Index