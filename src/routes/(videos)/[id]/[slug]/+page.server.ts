import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import { redirect } from "@sveltejs/kit";
import { marked } from "marked";

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const video = await db.video.findFirst({
        where: {
            AND: [
                { author: { id: locals.user.id } },
                { id: Number(params.id) },
            ]
        },
        include: { tags: true }
    });

    if (!video) {
        throw redirect(302, '/');
    }

    return {
        video: {
            ...video,
            contentToHtml: marked.parse((video?.content as string).replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""))
        }
    };
}) satisfies PageServerLoad;
