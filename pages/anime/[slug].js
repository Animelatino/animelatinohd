import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import ErrorPage from 'next/error';
import Layout from '../../components/Layout';

const Index = (props) => {
    const [data, setData] = useState(props?.data);
    const [tab, setTab] = useState("watch");
  	const getOverview = () => setTab("overview");
    const getWatch = () => setTab("watch");

    if(data?.msg) {
        return <ErrorPage statusCode={404} />
    }

    const getDateFormat = (date) => {
        let dateFormat = new Date(date);
        let year = dateFormat.getFullYear();
        let month = dateFormat.toLocaleString('default', { month: 'long' });
        let day = dateFormat.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return day + ' de ' + month + ' del ' + year
    }

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
      
    return (
        <Layout>
            <div className="PageAnime">
                <NextSeo {...SEO} />
                <div className="banner">
                    <Image className="banner" alt={data?.title} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w1280'+data?.banner}/>
                </div>
                <div className="info-tab">
                    <div className="info-tab-content">
                        <div className="poster">
                            <Image className="poster" alt={data?.title} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w300'+data?.poster}/>
                        </div>
                        <div className="info-tab-data">
                            <h2>{data?.title}</h2>
                            <div className="desc">{data?.overview?.length > 0 ? data?.overview : 'No hay sinopsis para este anime.' }</div>
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
                        <div className="info-anime">
                            <div className="box">
                                <h2 className="title-box">Tipo</h2>
                                <p className="content-box">{data?.type === 'Tv' ? 'Anime' : (data?.type === 'Movie' ? 'Película' : data?.type)}</p>
                            </div>
                            <div className="box">
                                <h2 className="title-box">Estado</h2>
                                <p className="content-box">{data?.status === 0 ? 'Finalizado' : 'En emisión'}</p>
                            </div>
                            <div className="box">
                                <h2 className="title-box">Estreno</h2>
                                <p className="content-box">{ getDateFormat(data?.aired) || 'No definido' }</p>
                            </div>
                            <div className="box">
                                <h2 className="title-box">Titulo Original</h2>
                                <p className="content-box">{data?.title_original || 'No definido'}</p>
                            </div>
                            <div className="box">
                                <h2 className="title-box">Clasificación</h2>
                                <p className="content-box">{data?.rating || 'No definido'}</p>
                            </div>
                            <div className="box">
                                <h2 className="title-box">Rating</h2>
                                <p className="content-box">{data?.vote_average || '0'+'/10'}</p>
                            </div>
                            <div className="box">
                                <h2 className="title-box">Votos</h2>
                                <p className="content-box">{data?.popularity || 'No definido'}</p>
                            </div>
                        </div>
                    )}
                    {tab === "watch" && (
                        <div className="episodes">
                        { data?.episodes?.map((item, idx) => (
                            <Link href={`/ver/${data?.slug}/${item?.number}`} key={idx}>
                                <a className="episode">
                                    <span>{item?.number}</span>
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
    const response = await fetch(`${process.env.APIPAGE}/web/animes/${query?.slug}`);
    const dataJson = await response.json();
    return { data: dataJson };
}

export default Index