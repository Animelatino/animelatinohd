import React, { useState } from "react";
import Router, { useRouter } from 'next/router';
import AnimeCard from '../components/AnimeCard';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';


const Animes = (props) => {
    return <AnimesContent key={Math.random()} initialData={props?.data} />;
};

const AnimesContent = (props) => {
    const router = useRouter();
    const [data, setData] = useState(props?.initialData);

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
        title: `Lista de animes • ${process.env.SITENAME}`,
        description: `Lista de animes`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}/animes`,
            title: `Lista de animes • ${process.env.SITENAME}`,
            description: `Lista de animes`,
            images: [{
                url: `https://i.imgur.com/Iof3uSm.jpg`,
                width: 640,
                height: 360,
                alt: `Lista de animes • ${process.env.SITENAME}`,
            }],
            site_name: `${process.env.SITENAME}`,
        },
        twitter: {
            handle: `@${process.env.SITENAME}`,
            site: `@${process.env.SITENAME}`,
            cardType: 'summary_large_image',
        }
    }

    const changeGenre = (e) => {
        Router.push({
            query: { 
                genre: encodeURI(e.target.value),
                year: router?.query?.type || '',
                type: router?.query?.type || '',
                status: router?.query?.status || '',
                page: router?.query?.page || ''
            },
        });
    }
    
    const changeYear = (e) => {
        Router.push({
            query: {
                genre: router?.query?.genre || '',
                year: e.target.value,
                type: router?.query?.type || '',
                status: router?.query?.status || '',
                page: router?.query?.page || ''
            },
        });
    }
    
    const changeType = (e) => {
        Router.push({
            query: {
                genre: router?.query?.genre || '',
                year: router?.query?.year || '',
                type: encodeURI(e.target.value),
                status: router?.query?.status || '',
                page: router?.query?.page || ''
            },
        });
    }

    const changeStatus = (e) => {
        Router.push({
            query: {
                genre: router?.query?.genre || '',
                year: router?.query?.year || '',
                type: router?.query?.type || '',
                status: encodeURI(e.target.value),
                page: router?.query?.page || ''
            },
        });
    }

    const prevData = () => {
        Router.push({
            query: {
                genre: router?.query?.genre || '',
                year: router?.query?.year || '',
                type: router?.query?.type || '',
                status: router?.query?.status || '',
                page: router?.query?.page ? parseInt(router?.query?.page) - 1 : 0
            },
        });
    }

    const nextData = () => {
        Router.push({
            query: {
                genre: router?.query?.genre || '',
                year: router?.query?.year || '',
                type: router?.query?.type || '',
                status: router?.query?.status || '',
                page: router?.query?.page ? parseInt(router?.query?.page) + 1 : 2
            },
        });
    }


    return (
        <Layout>
            <main className="TopAnimesPage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Lista de { getType(router?.query?.type) } { router?.query?.status ? (router?.query?.status == 0 ? 'finalizados' : 'en emisión') : '' }  { router?.query?.year ? 'del año '+router?.query?.year : '' }</h2>
                <div className="filter">
                    <div className="genres">
                        <label htmlFor="genres">Por genero:</label>
                        <select id="genres" value={router?.query?.genre} onChange={changeGenre}>
                            <option value="">Todos</option>
                            <option value="accion">Accion</option>
                            <option value="artes-marciales">Artes Marciales</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                            <option value="aventura">Aventura</option>
                            <option value="colegial">Colegial</option>
                            <option value="comedia">Comedia</option>
                            <option value="cosas-de-la-vida">Cosas de la vida</option>
                            <option value="demonios">Demonios</option>
                            <option value="deportes">Deportes</option>
                            <option value="drama">Drama</option>
                            <option value="echi">Echi</option>
                            <option value="espacial">Espacial</option>
                            <option value="fantasia">Fantasía</option>
                            <option value="harem">Harem</option>
                            <option value="historico">Historico</option>
                            <option value="josei">Josei</option>
                            <option value="juegos">Juegos</option>
                            <option value="magia">Magia</option>
                            <option value="mecha">Mecha</option>
                            <option value="militar">Militar</option>
                            <option value="misterio">Misterio</option>
                            <option value="musical">Musical</option>
                            <option value="parodia">Parodia</option>
                            <option value="policial">Policial</option>
                            <option value="psicologico">Psicologico</option>
                            <option value="romance">Romance</option>
                            <option value="samurai">Samurai</option>
                            <option value="seinen">Seinen</option>
                            <option value="shoujo">Shoujo</option>
                            <option value="shoujo-ai">Shoujo Ai</option>
                            <option value="shounen">Shounen</option>
                            <option value="shounen-ai">Shounen Ai</option>
                            <option value="sobrenatural">SobreNatural</option>
                            <option value="superpoderes">SuperPoderes</option>
                            <option value="terror">Terror</option>
                            <option value="thriller">Thriller</option>
                            <option value="vampiros">Vampiros</option>
                        </select>
                    </div>
                    <div className="year">
                        <label htmlFor="year">Por año:</label>
                        <select id="year" value={router?.query?.year} onChange={changeYear}>
                            <option value="">Todos</option>
                            <option value="2021">2021</option>
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
                {data?.data?.map((item, idx) => (
                    <AnimeCard anime={item} key={idx} />
                ))}
                </div>
                {data?.data?.length > 0
                ?   <div className="pagination">
                        {data?.prev_page_url && (
                            <div className="prev" onClick={prevData}>Anterior</div>
                        )}
                        {data?.next_page_url && (
                            <div className="next" onClick={nextData}>Siguiente</div>
                        )}
                    </div>
                    
                :   <div className="NotFoundPage">
                        <h3>No se encontraron animes</h3>
                    </div>
                }
            </main>
        </Layout>
    );
}

Animes.getInitialProps = async({query}) => {
    const defaultQuery = {
        genre: query?.genre || '',
        type: query?.type || '',
        year: query?.year || '',
        status: query?.status || '',
        page: query?.page || ''
    };
    const queryString = (obj) => {
        return Object.entries(obj)
            .map(([index, val]) => `${index}=${val}`)
            .join("&");
    };
    const response = await fetch(`${process.env.APIPAGE}/web/animes/list?${queryString({ ...defaultQuery })}`)
    const dataJson = await response.json();
    return { data: dataJson };
}

export default Animes