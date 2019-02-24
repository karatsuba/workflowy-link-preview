import { Link } from "./Link";

export class Links {
    private links: Map<string, Link> = new Map();

    public setLink(link: Link) {
        this.links.set(link.getId(), link);
    }

    public setLinks(links: HTMLCollectionOf<Element>) {
        Array.from(links)
            .map(Link.create)
            .forEach(link => {
                console.log('LINK', link);
                this.setLink(link)
            });

        console.log('LINKS HERE:', this.getLinks());
    }

    public getLinks() {
        return this.links.entries();
    }
}