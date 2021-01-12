import React, { useState } from "react";
import AnimeCard from '../../components/AnimeCard';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';

const Calendario = (props) => {
    const [data, setData] = useState(props?.data);
    
    const getNowDay = () => {
        var d = new Date();
        return d.getDay() + 1;
    }

    const getDay = (day) => {

        switch (day) {
            case '1':
                    return 'Domingo'
                break;
            case '2':
                    return 'Lunes'
                break;
            case '3':
                    return 'Martes'
                break;
            case '4':
                    return 'Miercoles'
                break;
            case '5':
                    return 'Jueves'
                break;
            case '6':
                    return 'Viernes'
                break;
            case '7':
                    return 'Sábado'
                break;
            default:
                return 'No definido'
                break;
        }
    }

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
            <main className="TopAnimesPage">
                <NextSeo {...SEO} />
                <h2 className="titlePage">Calendario Anime</h2>
                <Accordion allowMultipleExpanded allowZeroExpanded preExpanded={'d-'+getNowDay()}>
                    {Object.entries(data)?.map((item, idx) => (
                    <AccordionItem uuid={'d-'+item[0]} key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                { getDay(item[0]) }
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="listAnimes">
                            {item[1]?.map((item, idx) => (
                                <AnimeCard anime={item} key={idx} />
                            ))}
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    ))}
                </Accordion>
            </main>
        </Layout>
    );
}

Calendario.getInitialProps = async() => {
    const response = await fetch(`${process.env.APIPAGE}/web/animes/simulcast`)
    const dataJson = await response.json();
    return { data: dataJson };
}

export default Calendario