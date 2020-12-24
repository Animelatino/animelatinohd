import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';

const Index = (props) => {
    const [anime, setAnime] = useState(props.anime);
    const [tab, setTab] = useState("watch");

  	const getOverview = () => setTab("overview");
    const getWatch = () => setTab("watch");

    if(anime?.msg) {
        return <ErrorPage statusCode={404} />
    }

    const SEO = {
        title: `Ver ${anime?.title} Sub Español Latino en HD Online • AnimeLatinoHD`,
        description: `${(anime?.overview?.length > 165 ? (anime?.overview?.slice(0,165) + '...') : anime?.overview)}`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.homePage}/${anime?.slug}`,
            title: `Ver ${anime?.title} Sub Español Latino en HD Online • AnimeLatinoHD`,
            description: `${(anime?.overview?.length > 165 ? (anime?.overview?.slice(0,165) + '...') : anime?.overview)}`,
            images: [{
                url: `https://image.tmdb.org/t/p/w500${anime?.banner}`,
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
            <div className="PageAnime">
                <NextSeo {...SEO} />
                <div className="banner">
                    <Image className="banner" alt={anime?.title} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w1280'+anime?.banner}/>
                </div>
                <div className="info-tab">
                    <div className="info-tab-content">
                        <div className="poster">
                            <Image className="poster" alt={anime?.title} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w300'+anime?.poster}/>
                        </div>
                        <div className="info-tab-data">
                            <h2>{anime?.title}</h2>
                            <div className="desc">{anime?.overview}</div>
                            <div className="tabs">
                                <span className={tab === "watch" ? 'active' : '' } onClick={getWatch}> Lista de episodios </span>
                                <span className={tab === "overview" ? 'active' : '' } onClick={getOverview}> Información </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bar-tab">
                    <div>
                    {tab === "overview" && (
                        <span>Detalles</span>
                    )}
                    {tab === "watch" && (
                        <div className="episodes">
                        { anime?.episodes?.map((episode, idx) => (
                            <Link href={`/${anime.slug}/${episode.number}`} key={idx}>
                                <a className="episode">
                                    <span>{episode.number}</span>
                                </a>
                            </Link>
                        ))
                        }
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

Index.getInitialProps = async({query}) => {
    if(query.anime){
        const dataAnime = await fetch(`${process.env.apiPage}/web/animes/${query?.anime}`);
        const anime = await dataAnime.json();
        return { anime: anime };
    }else{
        return { anime: [] };
    }
}

export default Index