import React, { useState } from "react";
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { PlayIcon, LeftIcon, ListIcon, RightIcon, CloseIcon } from '../../../components/Icons';
import ErrorPage from 'next/error';
import Layout from '../../../components/Layout';
import Iframe from 'react-iframe';
import ShareButtons from "../../../components/ShareButtons";
import DisqusComments from "../../../components/DisqusComments";

const Episode = (props) => {
    return <EpisodeContent key={props?.data?.id} initialData={props?.data} />;
};

const EpisodeContent = (props) => {
    const [data, setData] = useState(props?.initialData);
    const [iframe, setIframe] = useState(null);
    const [ads, setAds] = useState(false);

    if(data?.msg) {
        return <ErrorPage statusCode={404} />
    }

    const SEO = {
        title: `Ver ${data?.anime?.title} Capítulo ${data?.number} Sub Español Latino en HD Online • ${process.env.SITENAME}`,
        description: `Anime ${data?.anime?.title} capitulo ${data?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}/ver/${data?.anime?.slug}/${data?.number}`,
            title: `Ver ${data?.anime?.title} Capítulo ${data?.number} Sub Español Latino en HD Online • ${process.env.SITENAME}`,
            description: `Anime ${data?.anime?.title} capitulo ${data?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`,
            images: [{
                url: `https://image.tmdb.org/t/p/w500${data?.anime?.banner}`,
                width: 640,
                height: 360,
                alt: `Ver ${data?.anime?.title} Capítulo ${data?.number} Sub Español Latino en HD Online • ${process.env.SITENAME}`,
            }],
            site_name: `${process.env.SITENAME}`,
        },
        twitter: {
            handle: `@${process.env.SITENAME}`,
            site: `@${process.env.SITENAME}`,
            cardType: 'summary_large_image',
        }
    }

    const optionPress = (player) => {
        if(player?.server?.type === 1){
            setAds(true);
            setIframe(player?.server?.embed ? player?.server?.embed?.replace("{id}", player?.code) : player?.code);
        }else{
            setAds(false);
            setIframe(`${process.env.STREAMPAGE}/${player?.id}`);
        }
    }
    
    const backPressed = async () => {
        setIframe("");
        setAds(false);
	}

    return (
        <Layout>
            <main className="EpisodePage">
                <NextSeo {...SEO} />
                <h1 className="episode-title">{`${data?.anime?.title} - ${data?.number}`}</h1>
                <ShareButtons title={SEO?.title} url={SEO?.openGraph?.url} twitterHandle={SEO?.twitter?.handle}/>
                { iframe 
                ?   <>
                        { ads && (
                            <div className="BlockAds">
                                <p>Está opcion puede contener anuncios, que son externos a nosotros. DISCUPEN LAS MOLESTIAS</p>
                                <b>Se recomienda usar ADBLOCK</b>
                            </div>
                        )}
                        <div className="videoPlayer">
                            <div className="video">
                                <Iframe url={iframe} allow="fullscreen" width="100%" height="100%" id="videoPlayer" className="iframePlayer" display="initial" position="relative"/>
                            </div>
                            <div className="backButton" onClick={() => backPressed()}>
                                <CloseIcon />
                            </div>
                        </div>
                    </>
                :   <>
                        <span className="message">Seleccione una opción para reproducir</span>
                        <div className="options">
                            {data?.players?.map((player) => (
                                <div key={player?.id} className="option" onClick={() => optionPress(player)}>
                                    <div className="icon">
                                        <PlayIcon/>
                                    </div>
                                    <div className="info">
                                        <span className="languaje">{player?.languaje === 0 ? 'Subtitulado' : 'Latino'} &bull; </span>
                                        <span className="title">{player?.server?.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                }
                <div className="navEpisodes">
                    <div className="prev">
                        {data?.anterior && (
                        <Link href={`/ver/${data?.anterior?.anime?.slug}/${data?.anterior?.number}`}>
                            <a>
                                <LeftIcon />
                                <span>Episodio anterior</span>
                            </a>
                        </Link>
                        )}
                    </div>
                    <div className="list">
                        {data?.anime && (
                        <Link href={`/anime/${data?.anime?.slug}`}>
                            <a>
                                <ListIcon />
                                <span>Lista de episodios</span>
                            </a>
                        </Link>
                        )}
                    </div>
                    <div className="next">
                        {data?.siguiente && (
                        <Link href={`/ver/${data?.siguiente?.anime?.slug}/${data?.siguiente?.number}`}>
                            <a>
                                <RightIcon />
                                <span>Episodio siguiente</span>
                            </a>
                        </Link>
                        )}
                    </div>
                </div>
                <DisqusComments/>
            </main>
        </Layout>
    );
}

Episode.getInitialProps = async({ query }) => {
    const response = await fetch(`${process.env.APIPAGE}/web/episodes/${query?.anime}/${query?.episode}`)
    const dataJson = await response.json();
    return { data: dataJson };
}

export default Episode