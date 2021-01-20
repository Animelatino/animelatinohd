import React from 'react';
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';
import { api } from '../lib/api';
import styles from '../styles/Animes.module.css';
import ListAnimes from '../components/ListAnimes';
import Layout from '../components/Layout';

const Animes = (props) => {
    return <AnimesComponent key={Math.random()} {...props} />;
}

const AnimesComponent = (props) => {
    const router = useRouter();
    const [data, setData] = React.useState(props?.data);
    const [filter, setFilter] = React.useState(router?.query);
    const [filterShow, setFilterShow] = React.useState(true);
    const [filterings, setFiltering] = React.useState(props?.filterings);

    const handleChange = async (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value  
        })
        if(e.target.name !== 'search'){
            pushQueryUrl(e);
        }
    }

    const toggleFilters = () => {
        setFilterShow(!this.state.showFilter);
    }

    const onKeyDownSearch = (e) => {
        if(e.key === 'Enter'){
            pushQueryUrl(e);
        }
    }

    const pushQueryUrl = (e) => {
        router.push({
            query: {
                ...router.query,
                [e.target.name]: e.target.value
            }
        })
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

    const filterAnimes = () => {
        return (
            <>
                <div className={styles.BoxFilter} onClick={() => { setFilterShow(!filterShow) } }>
                    { filterShow ? 'Cerrar filtros' : 'Abrir filtros'}
                </div>
                { filterShow && (
                    <div className={styles.filter}>
                        <div className={styles.search}>
                            <label htmlFor={"search"}>Buscar:</label>
                            <input value={filter?.search} placeholder={"Buscar anime o pelicula..."} onKeyPress={onKeyDownSearch} type={"text"} name={"search"} id={"search"} onChange={handleChange}/>
                        </div>
                        <div className={styles.ListTypes}>
                            <div className={styles.type}>
                                <label htmlFor={"type"}>Por tipo:</label>
                                <select name={"type"} value={filter?.type} id={"type"} onChange={handleChange}>
                                    <option value="">Todos</option>
                                    {filterings?.types?.map((item, idx) => (
                                        <option value={item?.type?.toLowerCase()} key={idx}>{item?.type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.type}>
                                <label htmlFor={"status"}>Por estado:</label>
                                <select name={"status"} value={filter?.status} id={"status"} onChange={handleChange}>
                                    <option value="">Todos</option>
                                    {filterings?.status?.map((item, idx) => (
                                        <option value={item?.status} key={idx}>{item?.status === 0 ? "Finalizado" : "En emisión"}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.type}>
                                <label htmlFor={"year"}>Por año:</label>
                                <select name={"year"} value={filter?.year} id={"year"} onChange={handleChange}>
                                    <option value="">Todos</option>
                                    {filterings?.years?.map((item, idx) => (
                                        <option value={item?.year} key={idx}>{item?.year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.type}>
                                <label htmlFor={"genre"}>Por genero:</label>
                                <select name={"genre"} value={filter?.genre} id={"genre"} onChange={handleChange}>
                                    <option value="">Todos</option>
                                    {filterings?.genres?.map((item, idx) => (
                                        <option value={item?.slug} key={idx}>{item?.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <Layout>
            <NextSeo {...SEO} />
            <main className={styles.container}>
                <ListAnimes filters={filterAnimes()} data={data?.data} title={'Directorio anime'}/>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const queryString = (obj) => {
        return Object.entries(obj)
            .map(([index, val]) => `${index}=${val}`)
            .join("&");
    };
    const res = await api.get(`animes/list?${queryString({ ...context?.query })}`);
    const res2 = await api.get(`filterings`);
    return {
        props: {
            data: res.data,
            filterings: res2.data
        }
    }
}

export default Animes