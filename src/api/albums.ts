import { API_URL } from "astro:env/server";

export async function fetchAlbumPhotos(albumId: string, perPage = 500): Promise<Photo[]> {
    let photos: Photo[] = [];
    let currentPage = 0;
    let totalPages: number | null = null;

    try {
        while (totalPages === null || currentPage < totalPages) {
            const url = new URL(`${API_URL}/ws.php`);
            url.searchParams.set('method', 'pwg.categories.getImages');
            url.searchParams.set('format', 'json');
            url.searchParams.set('cat_id', albumId.toString());
            url.searchParams.set('page', currentPage.toString());
            url.searchParams.set('per_page', perPage.toString());

            const request: Response = await fetch(url.toString());

            if (!request.ok) {
                throw new Error(`Photos fetch failed ${request.status}`);
            }

            const response = await request.json();

            if (response.stat !== 'ok' || !response.result || !response.result.paging) {
                throw new Error(`Error API`);
            }

            photos = [...photos, ...response.result.images];


            totalPages = Math.ceil(response.result.paging.total_count / perPage);


            currentPage++;
        }
    } catch (error) {
        console.error(`Error fetching photos ${albumId}:`, error);

        throw error
    }

    return photos;
}
