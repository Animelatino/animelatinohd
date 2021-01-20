import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Iframe from 'react-iframe';
import { api } from '../../../lib/api';
import styles from '../../../styles/Episode.module.css';
import Layout from '../../../components/Layout';
import { slugEpisode, slugAnime } from '../../../helpers/Functions';
import { getLanguajePlayer, getStreamPlayer } from '../../../helpers/Strings';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import ShareButtons from "../../../components/ShareButtons";
import Comments from "../../../components/Comments";

const number = (props) => {
    const [data, setData] = React.useState(props?.data);
    const [iframe, setIframe] = React.useState("");
    const [tabIndex, setTabIndex] = React.useState(0);

    resetIdCounter();

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

    const VideoIframe = () => {
        return(
            <div className={styles.videoPlayer}>
                <Iframe allow={"fullscreen"} url={iframe} display="initial"/>
            </div>
        )
    }

    const ListOptions = ({data}) => {
        return(
            <>
                { data?.map((item, idx) => (
                    <div key={idx} className={styles.option} onClick={() => {setIframe(getStreamPlayer(item))} }>
                        <p>{item?.server?.title}</p>
                    </div>
                ))}
            </>
        )
    }

    const VideoPlayer = ({data}) => {
        return(
            <Tabs
                className={styles.tabContainer}
                selectedIndex={tabIndex}
                onSelect={index => { setIframe(""), setTabIndex(index) }}>
                    <TabList className={styles.tabList}>
                    {Object.entries(data)?.map((item, idx) =>(
                        <Tab key={idx} className={styles.tab}>{getLanguajePlayer(item[0])}</Tab>
                    ))}
                    </TabList>
                    { Object.entries(data)?.map((item, idx) =>(
                        <TabPanel key={idx} className={styles.tabPanel}>
                            { iframe
                            ?   <VideoIframe/>
                            :   <ListOptions data={item[1]}/>
                            }
                        </TabPanel>
                    ))}
            </Tabs>
        )
    }

    const NavCaps = ({data}) => {
        return (
            <div className={styles.navCaps}>
                <div className={styles.nav}>
                { data?.anterior && (
                    <Link href={slugEpisode(data?.anime?.slug, data?.anterior?.number)}>
                        <a className={styles.link}>&#8592; <span>Anterior</span></a>
                    </Link>
                )}
                </div>
                <div className={styles.nav}>
                { data?.anime && (
                    <Link href={slugAnime(data?.anime?.slug)}>
                        <a className={styles.link}>&#9776;</a>
                    </Link>
                )}
                </div>
                <div className={styles.nav}>
                { data?.siguiente && (
                    <Link href={slugEpisode(data?.anime?.slug, data?.siguiente?.number)}>
                        <a className={styles.link}><span>Siguiente</span> &#8594;</a>
                    </Link>
                )}
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <NextSeo {...SEO} />
            <main className={styles.container}>
                <h2>
                    {data?.anime?.title} - {data?.number}
                </h2>
                <ShareButtons title={SEO?.title} url={SEO?.openGraph?.url} twitterHandle={SEO?.twitter?.handle}/>
                <VideoPlayer data={data?.players}/>
                <NavCaps data={data}/>
                <Comments/>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const res = await api.get(`episodes/${context.params.slug}/${context.params.number}`)
    return {
        props: { 
            data: res.data 
        }
    }
}

export default number