import React from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { api } from '../../lib/api';
import styles from '../../styles/Anime.module.css';
import Layout from '../../components/Layout';
import { bannerAnime, posterAnime, slugGenre } from '../../helpers/Functions';
import { getStatusAnime, getDateAiredAnime, getRatingAnime, getVoteAverageAnime } from '../../helpers/Strings';
import Comments from "../../components/Comments";
import AnimeEpisodeCard from '../../components/AnimeEpisodeCard';
import Link from 'next/link';

const slug = (props) => {
    return <SlugComponent key={Math.random()} {...props} />;
}

const SlugComponent = (props) => {
    const [data, setData] = React.useState(props?.data);
    const [tab, setTab] = React.useState("episodes");

    const SEO = {
        title: `Ver ${data?.title} Sub Español Latino en HD Online • ${process.env.SITENAME}`,
        description: `${(data?.overview?.length > 165 ? (data?.overview?.slice(0,165) + '...') : data?.overview)}`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}/anime/${data?.slug}`,
            title: `Ver ${data?.title} Sub Español Latino en HD Online • ${process.env.SITENAME}`,
            description: `${(data?.overview?.length > 165 ? (data?.overview?.slice(0,165) + '...') : data?.overview)}`,
            images: [{
                url: `https://image.tmdb.org/t/p/w500${data?.banner}`,
                width: 640,
                height: 360,
                alt: `${process.env.SITENAME} • Animes Online HD Gratis`,
            }],
            site_name: `${process.env.SITENAME}`,
        },
        twitter: {
            handle: `@${process.env.SITENAME}`,
            site: `@${process.env.SITENAME}`,
            cardType: 'summary_large_image',
        }
    }


    const Banner = ({data}) => {
        return (
            <div className={styles.banner} style={{ backgroundImage: "url("+`${bannerAnime(data?.banner)}`+")"}}>
                <div className={styles.content} >
                    <div className={styles.column}>
                        <h1>{data?.title}</h1>
                        <div className={styles.genres}>
                            { data?.genres && data?.genres?.split(',')?.map((genre, idx) => (
                                <Link key={idx} href={slugGenre(genre)}>
                                    <a className={styles.item}  title={genre}>{genre}</a>
                                </Link>
                            ))} 
                        </div>
                    </div>
                </div>
                <div className={styles.overlay}></div>
            </div>
        )
    }

    const Info = ({data}) => {
        return(
            <div className={styles.info}>
                <div className={styles.cover}>
                    <Image
                        className="poster"
                        alt={data?.title}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={posterAnime(data?.poster)}/>
                </div>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <div className={styles.stats}>
                            <div title="Total view" className={styles.stat}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path>
                                </svg>
                                170.9K
                            </div>
                            <div title="Total favorite" className={styles.stat}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
                                </svg>
                                700
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <small>Avg. Score</small>
                        <svg viewBox="0 0 24 24" className={styles.gold}>
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path>
                        </svg>
                        { getVoteAverageAnime(data?.vote_average) }
                    </div>
                    <div className={styles.item}>
                        <small>Estado</small> { getStatusAnime(data?.status) }
                    </div>
                    <div className={styles.item}>
                        <small>Clasificación</small> { getRatingAnime(data?.rating) }
                    </div>
                    <div className={styles.item}>
                        <small>Estreno</small> { getDateAiredAnime(data?.aired) }
                    </div>
                </div>
            </div>
        );
    }

    const Details = ({data}) => {
        return (
            <div className={styles.details}>
                <div className={styles.overview}>
                  <p>{data?.overview ? data?.overview : 'No hay sinopsis para este anime'}</p>
                </div>
                <div className={styles.listEpisodes}>
                    {data?.episodes?.map((episode, idx) => (
                        <AnimeEpisodeCard anime={data} episode={episode} key={idx} />
                    ))}
                </div>
                <Comments/>
            </div>
        );
    }
    
    return (
        <Layout>
            <NextSeo {...SEO} />
            <main className={styles.container}>
                <Banner data={data}/>
                <div className={styles.contentAnime}>
                    <Info data={data}/>
                    <Details data={data}/>
                </div>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const res = await api.get(`anime/${context.params.slug}`)
    return {
        props: { 
            data: res.data 
        }
    }
}

export default slug