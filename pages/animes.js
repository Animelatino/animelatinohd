import React, { useState } from "react";
import Router, { useRouter } from 'next/router';
import AnimeCard from '../components/AnimeCard';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';


const Animes = (props) => {
    return <AnimesContent key={Math.random()} initialAnimes={props?.animes} />;
};

const AnimesContent = (props) => {
    const router = useRouter();
    const [animes, setAnimes] = useState(props?.initialAnimes);

    const getType = (type) => {
        switch (type) {
            case 'tv':
                    return 'animes';
                break;
            case 'movie':
                    return 'peliculas';
                break;
            case 'ona':
            case 'ova':
                    return type+'s';
                break;
            case 'special':
                    return 'especiales';
                break;
            default:
                    return 'animes';
                break;
        }
    }

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

    const changeYear = (e) => {
        Router.push({
            query: { 
                year: e.target.value,
                type: router?.query?.type || '',
                status: router?.query?.status || '',
            },
        });
    }
    
    const changeType = (e) => {
        Router.push({
            query: { 
                year: router?.query?.year || '',
                type: encodeURI(e.target.value),
                status: router?.query?.status || '',
            },
        });
    }

    const changeStatus = (e) => {
        Router.push({
            query: { 
                year: router?.query?.year || '',
                type: router?.query?.type || '',
                status: encodeURI(e.target.value),
            },
        });
    }


    return (
        <Layout>
            <main className="TopAnimesPage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Lista de { getType(router?.query?.type) } { router?.query?.status ? (router?.query?.status == 0 ? 'finalizados' : 'en emisión') : '' }  { router?.query?.year ? 'del año '+router?.query?.year : '' }</h2>
                <div className="filter">
                    <div className="year">
                        <label htmlFor="year">Por año:</label>
                        <select id="year" value={router?.query?.year} onChange={changeYear}>
                            <option value="">Todos</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                        </select>
                    </div>
                    <div className="type">
                        <label htmlFor="type">Por tipo:</label>
                        <select id="type" value={router?.query?.type} onChange={changeType}>
                            <option value="">Todos</option>
                            <option value="tv">Anime</option>
                            <option value="movie">Pelicula</option>
                            <option value="ona">Ona</option>
                            <option value="ova">Ova</option>
                            <option value="special">Especial</option>
                        </select>
                    </div>
                    <div className="status">
                        <label htmlFor="status">Por estado:</label>
                        <select id="status" value={router?.query?.status} onChange={changeStatus}>
                            <option value="">Todos</option>
                            <option value="1">En emision</option>
                            <option value="0">Finalizado</option>
                        </select>
                    </div>
                </div>
                <div className="listAnimes">
                {animes?.data?.map((anime, idx) => (
                    <AnimeCard anime={anime} key={idx} />
                ))}
                </div>
            </main>
        </Layout>
    );
}

Animes.getInitialProps = async({query}) => {
    const defaultQuery = {
        type: query?.type || '',
        year: query?.year || '',
        status: query?.status || ''
    };
    const queryString = (obj) => {
        return Object.entries(obj)
            .map(([index, val]) => `${index}=${val}`)
            .join("&");
    };
    const dataAnimes = await fetch(`${process.env.apiPage}/web/animes/list?${queryString({ ...defaultQuery })}`)
    const animes = await dataAnimes.json();
    return { animes: animes };
}

export default Animes