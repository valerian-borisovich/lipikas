import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database';

import { Innertube, UniversalCache } from 'youtubei.js';
import { getVideos } from '$lib';
import { countries } from '$lib/constants';

/*
export const load1 = (async ({ url }) => {
    const gl = url.searchParams.get('gl') ?? 'ID'

    const youtube = await Innertube.create({
        lang: 'en',
        cache: new UniversalCache(false),
        generate_session_locally: true,
        location: gl,
    })

    const feed = await youtube.getTrending()
    const videos = getVideos(feed.videos)

    return { gl, countries, videos }
}) satisfies PageServerLoad;

export const load2 = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const page = Number(url.searchParams.get('page') ?? '1');

    const videos = await db.video.findMany({
        where: { author: { id: locals.user.id } },
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc' }]
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = videos.length < 10 ? 0 : page + 1;

    return { videos, prevPage, nextPage };
}) satisfies PageServerLoad;
*/

export const load = (async ({ locals, url }) => {
    if (!locals.user) { throw redirect(302, '/login'); }
    const page = Number(url.searchParams.get('page') ?? '1');
    const videos = await db.video.findMany({
        where: { author: { id: locals.user.id } },
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc' }]
    });
    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = videos.length < 10 ? 0 : page + 1;

    /*   */
    const gl = url.searchParams.get('gl') ?? 'RU';
    const youtube = await Innertube.create({
        lang: 'en',
        cache: new UniversalCache(false),
        generate_session_locally: true,
        location: gl,
    });
    const feed = await youtube.getTrending();
    const videos = getVideos(feed.videos);

    return { videos, prevPage, nextPage, gl, countries, videos };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ url, cookies }) => {
        const theme = url.searchParams.get('theme');
        const redirectTo = url.searchParams.get('redirectTo');
        if (theme) { cookies.set('theme', theme, { path: '/', maxAge: 60 * 60 * 24 * 365 });}
        throw redirect(303, redirectTo ?? '/');
    }
} satisfies Actions;
