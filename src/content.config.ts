import { API_URL } from "astro:env/server";
import {defineCollection, z} from "astro:content";
import toSlug from "@utils/toSlug";

const getParentId = (uppercats: albumRaw['uppercats']): string | null => {
    const ids: string[] = uppercats.split(',');
    return ids.length >= 2 ? ids[ids.length - 2] : null
}

const albums = defineCollection({
    loader: async () => {


        try {
            const url = new URL(`${API_URL}/ws.php`);
            url.searchParams.set('method', 'pwg.categories.getList');
            url.searchParams.set('format', 'json');
            url.searchParams.set('recursive', 'true');
            url.searchParams.set('thumbnail_size', 'large');

            const request: Response = await fetch(url.toString());

            if (!request.ok) {
                throw new Error(`Album fetch failed ${request.status}`);
            }

            const response = await request.json();

            if (response.stat !== 'ok' || !response.result) {
                throw new Error(`Error API ${JSON.stringify(response)}`);
            }

            return response.result.categories.map((album: albumRaw) => ({
                id: album.id.toString(),
                slug: toSlug(album.name) + '-' + album.id,
                name: album.name,
                parentId: getParentId(album.uppercats),
                childrenCount: album.nb_categories,
                thumbnail: album.tn_url,
                published: album.date_last
            }))

        } catch (error) {
            console.error(`Error fetching albums`, error);

            return '';
        }
    },
    schema: z.object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        parentId: z.union([z.string(), z.null()]),
        thumbnail: z.string().url(),
        published: z.coerce.date()
    })
})

export const collections = {
    albums
}