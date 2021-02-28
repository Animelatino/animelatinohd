import { api } from '../lib/api';
import { slugAnime, slugEpisode } from '../helpers/Functions';

const pages = [
    ['/','1.0','hourly'],
    ['/animes','0.8','weekly'],
    ['/animes/latino','0.8','weekly']
];

const createSitemap = (data) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${pages?.map((page) => {
            return `
                <url>
                    <loc>${`${process.env.URL}${page[0]}`}</loc>
                    <priority>${page[1]}</priority>
                    <changefreq>${page[2]}</changefreq>
                </url>
            `
        }).join('')}
        ${data?.capitulos?.map((capitulo) => {
            return `
                <url>
                    <loc>${`${process.env.URL}${slugEpisode(capitulo?.slug,capitulo?.number)}`}</loc>
                    <priority>${capitulo?.status === 1 ? '0.8' : '0.6'}</priority>
                    <changefreq>${capitulo?.status === 1 ? 'weekly' : 'yearly'}</changefreq>
                </url>
            `
        }).join('')}
        ${data?.animes?.map((anime) => {
            return `
                <url>
                    <loc>${`${process.env.URL}${slugAnime(anime?.slug)}`}</loc>
                    <priority>${anime?.status === 1 ? '0.8' : '0.6'}</priority>
                    <changefreq>${anime?.status === 1 ? 'weekly' : 'yearly'}</changefreq>
                </url>
            `
        }).join('')}
    </urlset>
`;

export async function getServerSideProps(context) {
    const res = await api.get(`sitemap`)
    context.res.setHeader('Content-Type', 'text/xml')
    context.res.write(createSitemap(res.data))
    context.res.end()
    return { props: {} }
}

const Page = () => null
export default Page