import React, { useState } from "react";
import AnimeCard from '../components/AnimeCard';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const PopularAnimes = (props) => {
    const [data, setData] = useState(props?.data);

    const SEO = {
        title: `Lista de animes mejores valorados • ${process.env.SITENAME}`,
        description: `Lista de animes mejores valorados`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}/popularanimes`,
            title: `Lista de animes mejores valorados • ${process.env.SITENAME}`,
            description: `Lista de animes mejores valorados`,
            images: [{
                url: `https://i.imgur.com/Iof3uSm.jpg`,
                width: 640,
                height: 360,
                alt: `Lista de animes mejores valorados • ${process.env.SITENAME}`,
            }],
            site_name:  `${process.env.SITENAME}`,
        },
        twitter: {
            handle: `@${process.env.SITENAME}`,
            site: `@${process.env.SITENAME}`,
            cardType: 'summary_large_image',
        }
    }

    return (
        <Layout>
            <main className="TopAnimesPage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Animes mejores valorados</h2>
                <div className="listAnimes">
                {data?.map((item, idx) => (
                    <AnimeCard anime={item} key={idx} />
                ))}
                </div>
            </main>
        </Layout>
    );
}

PopularAnimes.getInitialProps = async() => {
    const response = await fetch(`${process.env.APIPAGE}/web/animes/type/popular`)
    const dataJson = await response.json();
    return { data: dataJson };
}

export default PopularAnimes