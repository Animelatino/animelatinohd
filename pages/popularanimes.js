import React, { useState } from "react";
import AnimeCard from '../components/AnimeCard';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const PopularAnimes = (props) => {
    const [animes, setAnimes] = useState(props.animes);

    const SEO = {
        title: `Lista de animes mejores valorados • AnimeLatinoHD`,
        description: `Lista de animes mejores valorados`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.homePage}/popularanimes`,
            title: `Lista de animes mejores valorados • AnimeLatinoHD`,
            description: `Lista de animes mejores valorados`,
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
            <main className="TopAnimesPage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Animes mejores valorados</h2>
                <div className="listAnimes">
                {animes?.map((anime, idx) => (
                    <AnimeCard anime={anime} key={idx} />
                ))}
                </div>
            </main>
        </Layout>
    );
}

PopularAnimes.getInitialProps = async() => {
    const dataAnimes = await fetch(`${process.env.apiPage}/web/animes/type/popular`)
    const animes = await dataAnimes.json();
    return { animes: animes };
}

export default PopularAnimes