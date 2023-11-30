import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from "./$types";
import { writeFileSync } from "fs";
import slugify from 'slugify';
import { db } from '$lib/server/database';
import { getTagIds } from "$lib/server/services";
import type { Tag } from "@prisma/client";

export const load = (async ({ locals, params }) => {
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
            tagcsv: video.tags.map((tag: Tag, i: number) => i == 0 ? tag.name : ' ' + tag.name)
        }
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData());

        const title = data.title as string;
        const content = data.content as string;
        const tagcsv = data.tagcsv as string;
        const file = data.file as File;

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: 'Field <strong>Title</strong> cannot be blank.'
            });
        }

        const video = await db.video.findUnique({
            where: {
                id: Number(params.id)
            }
        });


        let filename = video?.photo;

        if (file.size > 0) {
            const date = new Date().toISOString()
                .replaceAll('-', '')
                .replaceAll(':', '')
                .replace(/T/, '')
                .replace(/\..+/, '');

            filename = date + '-' + slugify(file.name.toLowerCase());

            writeFileSync(`static/images/${filename}`, Buffer.from(await file.arrayBuffer()));
        }


        const ids = await getTagIds(tagcsv);

        await db.video.update({
            where: { id: Number(params.id) },
            data: {
                title: title.trim(),
                photo: filename,
                slug: slugify(title.toLowerCase()),
                content: content.trim(),
                tags: {
                    set: [...ids]
                }
            }
        });

        throw redirect(302, `/${video?.id}/${video?.slug}`);
    }
} satisfies Actions;
