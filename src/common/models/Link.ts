export default class Link {
    id: string;
    description: string;
    url: string;
    title: string;
    imageUrl: string;
    fetching: boolean;

    constructor(
        id: string,
        title: string,
        description: string,
        imageUrl: string,
        url: string
    ) {
        this.id = id;
        this.url = url;
        this.description = description;
        this.title = title;
        this.imageUrl = imageUrl;

        this.fetching = false;
    }
}
