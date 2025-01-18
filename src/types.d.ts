declare interface Photo {
    id: number;
    name: string;
    element_url: string;
    download_url: string;
    derivatives: {
        [key: string]: {
            url: string;
            width: number;
            height: number;
        };
    };
}
declare interface albumRaw {
    readonly id: number,
    readonly name: string,
    readonly uppercats: string,
    readonly nb_categories: number,
    readonly tn_url: string,
    readonly date_last: string,
}