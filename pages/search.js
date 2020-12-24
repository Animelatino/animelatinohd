import React, { useState } from "react";
import AnimeCard from '../components/AnimeCard';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const Search = (props) => {
    const router = useRouter();
    const [animes, setAnimes] = useState(props?.animes);

    const SEO = {
        title: `Resultados de busqueda para ${router?.query?.q} • AnimeLatinoHD`,
        description: `Resultados de busqueda para ${router?.query?.q}`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.homePage}/search?q=${router?.query?.q}`,
            title: `Resultados de busqueda para ${router?.query?.q} • AnimeLatinoHD`,
            description: `Resultados de busqueda para ${router?.query?.q}`,
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


    return (
        <main className="SearchAnimesPage">
            <NextSeo {...SEO} />
            <div className="serchBox">
                <form>
                    <input autoFocus id="search" placeholder="Buscar..." name="q"/>
                </form>
            </div>
            { animes.length > 0
            ?   <>
                    <h2 className="titlePage">Resultados de busqueda para {router?.query?.q}</h2>
                    <div className="listAnimes">
                        { animes?.map((anime, idx) => (
                            <AnimeCard anime={anime} key={idx} />
                        ))}
                    </div>
                </>
            :   <div className="noAnimeSearch">
                    <h2>No se encontraron animes con el termino buscado</h2>
                    <p>Verifica que el nombre ingresado sea el correcto</p>
                </div>
            }
        </main>
    );
}

Search.getInitialProps = async({query}) => {
    if(query?.q){
        const dataAnimes = await fetch(`${process.env.apiPage}/web/animes/search/${query?.q}`);
        const animes = await dataAnimes.json();
        return { animes: animes };
    }else{
        return { animes: [] };
    }
}

export default Search