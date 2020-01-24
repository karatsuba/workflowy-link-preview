export default class MetaProp {
    type: string;
    og: string;
    twitter: string;

    constructor(type: string) {
        this.type = type;
        this.og = `og:${type}`;
        this.twitter = `twitter:${type}`;
    }
}
