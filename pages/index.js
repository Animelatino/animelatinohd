import React, { useState } from "react";
import EpisodeCard from '../components/EpisodeCard';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const Index = (props) => {
    const [data, setEpisodes] = useState(props?.data);
    
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
            <main className="homePage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Últimos episodios</h2>
                <div className="listEpisodes">
                {data?.map((item, idx) => (
                    <EpisodeCard episode={item} key={idx} />
                ))}
                </div>
            </main>
        </Layout>
    );
}

Index.getInitialProps = async() => {
    const response = await fetch(`${process.env.APIPAGE}/web/home/episodes`)
    const dataJson = await response.json();
    return { data: dataJson };
}

export default Index