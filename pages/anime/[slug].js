import React from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { api } from '../../lib/api';
import styles from '../../styles/Anime.module.css';
import ListEpisodes from '../../components/ListEpisodes';
import Layout from '../../components/Layout';
import { bannerAnime, posterAnime } from '../../helpers/Functions';
import { getTypeAnime, getStatusAnime, getDateAiredAnime, getRatingAnime, getVoteAverageAnime, getPopularityAnime } from '../../helpers/Strings';
import ShareButtons from "../../components/ShareButtons";
import Comments from "../../components/Comments";

const slug = (props) => {
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
            <div className={styles.banner}>
                <Image className={styles.image}
                    alt={data?.title}
                    height={"auto"}
                    width={"auto"}
                    layout={"responsive"}
                    loading={"lazy"}
                    src={bannerAnime(data?.banner)}
                    />
            </div>
        )
    }

    const Info = ({data}) => {
        return(
            <div className={styles.infoAnimeTop}>
                <div className={styles.info}>
                    <div className={styles.poster}>
                        <Image
                            className="poster"
                            alt={data?.title}
                            height="auto"
                            width="auto"
                            layout="responsive"
                            loading={"lazy"}
                            src={posterAnime(data?.poster)}/>
                    </div>
                    <div className={styles.data}>
                        <h2>{data?.title}</h2>
                        <ShareButtons title={SEO?.title} url={SEO?.openGraph?.url} twitterHandle={SEO?.twitter?.handle}/>
                        <div className={styles.overview}>{data?.overview?.length > 0 ? data?.overview : 'No hay sinopsis para este anime.' }</div>
                        <div className={styles.tabs}>
                            <span className={tab === "episodes" ? styles.active : '' } onClick={() => { setTab('episodes') }}>Lista de episodios</span>
                            <span className={tab === "overview" ? styles.active : '' } onClick={() => { setTab('overview') }}>Información</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const ContentTabs = ({data}) => {
        return (
            <div className={styles.barData}>
            {tab === "overview" && (
                <ContentInfoExtra data={data}/>
            )}
            {tab === "episodes" && (
                <ListEpisodes data={data?.episodes} slugAnime={data?.slug} imageAnime={data?.banner}/>
            )}
                <Comments/>
            </div>
        );
    }

    const ContentInfoExtra = ({data}) => {
        return (
            <div className={styles.infoAnime}>
                <div className={styles.box}>
                    <h2 className={styles.title}>Tipo</h2>
                    <p className={styles.content}>{ getTypeAnime(data?.type) }</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.title}>Estado</h2>
                    <p className={styles.content}>{ getStatusAnime(data?.status) }</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.title}>Estreno</h2>
                    <p className={styles.content}>{ getDateAiredAnime(data?.aired) }</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.title}>Titulo Original</h2>
                    <p className={styles.content}>{ data?.title_original }</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.title}>Clasificación</h2>
                    <p className={styles.content}>{ getRatingAnime(data?.rating) }</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.title}>Rating</h2>
                    <p className={styles.content}>{ getVoteAverageAnime(data?.vote_average) }</p>
                </div>
                <div className={styles.box}>
                    <h2 className={styles.title}>Votos</h2>
                    <p className={styles.content}>{ getPopularityAnime(data?.popularity) }</p>
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <NextSeo {...SEO} />
            <main className={styles.container}>
                <Banner data={data}/>
                <Info data={data}/>
                <ContentTabs data={data}/>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const res = await api.get(`animes/${context.params.slug}`)
    return {
        props: { 
            data: res.data 
        }
    }
}

export default slug