export default class Link {
    id: string;
    description: string;
    url: string;
    title: string;
    image: string;
    fetching: boolean;

    constructor(
        id: string,
        title: string,
        description: string,
        image: string,
        url: string
    ) {
        this.id = id;
        this.url = url;
        this.description = description;
        this.title = title;
        this.image = image;

        this.fetching = false;
    }
}
