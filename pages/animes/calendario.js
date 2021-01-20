import React, { useState } from "react";
import { NextSeo } from 'next-seo';
import { api } from '../../lib/api';
import Layout from '../../components/Layout';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { getDayName, getNowDay } from '../../helpers/Strings';
import ListAnimes from "../../components/ListAnimes";
import styles from '../../styles/Calendario.module.css';

const Calendario = (props) => {
    const [data, setData] = useState(props?.data);

    const SEO = {
        title: `Calendario animes | Animes en emision • ${process.env.SITENAME}`,
        description: `Calendario animes | Animes en emision`,
        openGraph: {
            type: 'website',
            locale: 'es_LA',
            url: `${process.env.URLPAGE}/animes`,
            title: `Calendario animes | Animes en emision • ${process.env.SITENAME}`,
            description: `Calendario animes | Animes en emision`,
            images: [{
                url: `https://i.imgur.com/Iof3uSm.jpg`,
                width: 640,
                height: 360,
                alt: `Calendario animes | Animes en emision • ${process.env.SITENAME}`,
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
            <main className={styles.container}>
                <NextSeo {...SEO} />
                <h2 className={styles.title}>Calendario Anime</h2>
                <Accordion preExpanded={'d-'+getNowDay()}>
                    {Object.entries(data)?.map((item, idx) => (
                    <AccordionItem uuid={'d-'+item[0]} key={idx}>
                        <AccordionItemHeading className={styles.AccordionItem}>
                            <AccordionItemButton className={styles.AccordionItemButton}>
                                { getDayName(item[0]) }
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <ListAnimes data={item[1]} />
                        </AccordionItemPanel>
                    </AccordionItem>
                    ))}
                </Accordion>
            </main>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await api.get(`animes/simulcast`);
    return {
        props: {
            data: res.data
        }
    }
}


export default Calendario