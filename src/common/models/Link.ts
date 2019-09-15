export default class Link {
    id: string;
    url: string;
    fetching: boolean;
    description?: string;
    title?: string;
    imageUrl?: string;

    constructor(id: string, url: string, title?: string, description?: string, imageUrl?: string) {
        this.id = id;
        this.url = url;
        this.fetching = false;
        this.description = description;
        this.title = title;
        this.imageUrl = imageUrl;
    }
}
