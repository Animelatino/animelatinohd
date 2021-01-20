const pathTmdb = 'https://www.themoviedb.org/t/p/';

export const imageEpisode = (image) => {
    const size = 'w500';
    return pathTmdb+size+image;
}

export const posterAnime = (image) => {
    const size = 'w300';
    return pathTmdb+size+image;
}

export const bannerAnime = (image) => {
    const size = 'w780';
    return pathTmdb+size+image;
}

export const slugAnime = (slug) => {
    return `/anime/${slug}`;
}

export const slugEpisode = (slug, number) => {
    return `/ver/${slug}/${number}`;
}
