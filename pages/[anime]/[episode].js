import React, { useState } from "react";
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { PlayIcon, LeftIcon, ListIcon, RightIcon, CloseIcon } from '../../components/Icons';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';

const Episode = (props) => {
    return <EpisodeContent key={props.data.id} initialEpisode={props.data} />;
};

const EpisodeContent = (props) => {
    const [episode, setEpisode] = useState(props.initialEpisode);
    const [iframe, setIframe] = useState(null);

    if(episode?.msg) {
        return <ErrorPage statusCode={404} />
    }

    const SEO = {
        title: `Ver ${episode?.anime?.title} Capítulo ${episode?.number} Sub Español Latino en HD Online • AnimeLatinoHD`,
        description: `Anime ${episode?.anime?.title} capitulo ${episode?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.homePage}/${episode?.anime?.slug}/${episode?.number}`,
            title: `Ver ${episode?.anime?.title} Capítulo ${episode?.number} Sub Español Latino en HD Online • AnimeLatinoHD`,
            description: `Anime ${episode?.anime?.title} capitulo ${episode?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`,
            images: [{
                url: `https://image.tmdb.org/t/p/w500${episode?.anime?.banner}`,
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

    const optionPress = (id) => {
    	setIframe(`${process.env.streamPage}/${id}`);
    }
    
    const backPressed = async () => {
		setIframe("");
	}

    return (
        <Layout>
            <main className="EpisodePage">
                <NextSeo {...SEO} />
                <h1 className="episode-title">{`${episode?.anime?.title} - ${episode?.number} `}</h1>
                { iframe 
                ?   <div className="videoPlayer">
                        <div className="video">
                            <iframe src={iframe} allow="fullscreen" width="100%" height="100%"/>
                        </div>
                        <div className="backButton" onClick={() => backPressed()}>
                            <CloseIcon />
                        </div>
                    </div>
                :   <>
                        <span className="message">Seleccione una opción para reproducir</span>
                        <div className="options">
                            {episode?.players?.map((player) => (
                                <div key={player.id} className="option" onClick={() => optionPress(player.id)}>
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
                        {episode?.anterior && (
                        <Link href={`/${episode?.anterior?.anime?.slug}/${episode?.anterior?.number}`} as={`/${episode?.anterior?.anime?.slug}/${episode?.anterior?.number}`}>
                            <a>
                                <LeftIcon />
                                <span>Episodio anterior</span>
                            </a>
                        </Link>
                        )}
                    </div>
                    <div className="list">
                        {episode?.anime && (
                        <Link href={`/${episode?.anime?.slug}`}>
                            <a>
                                <ListIcon />
                                <span>Lista de episodios</span>
                            </a>
                        </Link>
                        )}
                    </div>
                    <div className="next">
                        {episode?.siguiente && (
                        <Link href={`/${episode?.siguiente?.anime?.slug}/${episode?.siguiente?.number}`} as={`/${episode?.siguiente?.anime?.slug}/${episode?.siguiente?.number}`}>
                            <a>
                                <RightIcon />
                                <span>Episodio siguiente</span>
                            </a>
                        </Link>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}

Episode.getInitialProps = async({ query }) => {
    const res = await fetch(`${process.env.apiPage}/web/episodes/${query?.anime}/${query?.episode}`)
    const data = await res.json();
    return { data: data };
}


export default Episode