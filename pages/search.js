import React, { useState } from "react";
import AnimeCard from '../components/AnimeCard';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const Search = (props) => {
    const router = useRouter();
    const [data, setData] = useState(props?.data);

    const SEO = {
        title: `Resultados de busqueda para ${router?.query?.q} • ${process.env.SITENAME}`,
        description: `Resultados de busqueda para ${router?.query?.q}`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}/search?q=${router?.query?.q}`,
            title: `Resultados de busqueda para ${router?.query?.q} • ${process.env.SITENAME}`,
            description: `Resultados de busqueda para ${router?.query?.q}`,
            images: [{
                url: `https://i.imgur.com/Iof3uSm.jpg`,
                width: 640,
                height: 360,
                alt: 'AnimeLHD',
                alt: `Resultados de busqueda para ${router?.query?.q} • ${process.env.SITENAME}`,
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
            <main className="SearchAnimesPage">
                <NextSeo {...SEO} />
                <div className="serchBox">
                    <form>
                        <input autoFocus id="search" placeholder="Buscar..." name="q"/>
                    </form>
                </div>
                { router?.query?.q?.length > 0
                ?   data?.length > 0
                    ?   <>
                            <h2 className="titlePage">Resultados de busqueda para {router?.query?.q}</h2>
                            <div className="listAnimes">
                                { data?.map((item, idx) => (
                                    <AnimeCard anime={item} key={idx} />
                                ))}
                            </div>
                        </>
                    :   <div className="noAnimeSearch">
                            <h2>No se encontraron resultados para {router?.query?.q}</h2>
                            <p>Verifica que el nombre ingresado sea el correcto</p>
                        </div>
                :   <div className="noAnimeSearch">
                        <h2>Ingresa un termino a buscar...</h2>
                        <p>Verifica que el nombre ingresado sea el correcto</p>
                    </div>
                }
            </main>
        </Layout>
    );
}

Search.getInitialProps = async({query}) => {
    if(query?.q){
        const response = await fetch(`${process.env.APIPAGE}/web/animes/search/${query?.q}`);
        const dataJson = await response.json();
        return { data: dataJson };
    }else{
        return { data: [] };
    }
}

export default Search