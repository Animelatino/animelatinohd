import moment from 'moment';
moment.locale('es');

const pathTmdb = 'https://www.themoviedb.org/t/p/';

export const imageEpisode = (image) => {
    const size = 'w500';
    return pathTmdb+size+image;
}

export const imageAnimeSearch = (image) => {
    const size = 'w154';
    return pathTmdb+size+image;
}

export const posterAnime = (image) => {
    const size = 'w300';
    return pathTmdb+size+image;
}

export const bannerAnime = (image) => {
    const size = 'w1280';
    return pathTmdb+size+image;
}

export const slugAnime = (slug) => {
    return `/anime/${slug}`;
}

export const slugEpisode = (slug, number) => {
    return `/ver/${slug}/${number}`;
}

export const slugGenre = (slug) => {
    return `/animes?genre=${slug}`;
}

export const simulCast = (object) => {
    let formats = {
        lastDay : '[Ayer]',
        sameDay : '[Hoy]',
        nextDay : '[Mañana]',
        lastWeek : 'dddd',
        nextWeek : 'dddd',
        sameElse : 'L'
    }
    let data = [];
    const diasEntreFechas = (desde, hasta) =>  {
        var dia_actual = desde;
        var fechas = [];
        while (moment(dia_actual).isSameOrBefore(hasta)) {
            fechas.push(dia_actual.format('YYYY-MM-DD'));
            dia_actual.add(1, 'days');
        }
        return fechas;
    };

    let days = diasEntreFechas(moment(),moment().add('6','day'));

    for (let index = 0; index < days.length; index++) {
        let dayName = moment(days[index]).calendar(formats);
        let dayNumber = moment(days[index]).isoWeekday();
        let item = {
            dayName: dayName,
            dayNumber: dayNumber,
            data: object[dayNumber]
        }
        data.push(item);
    }

    return data;
}

export const isNowEpisode = (date_now) => {
    let now = new Date();
    now.setHours(0,0,0,0);
    if(moment(date_now).isBetween(moment(now), moment())){
        return true;
    }else{
        return false;
    }
}