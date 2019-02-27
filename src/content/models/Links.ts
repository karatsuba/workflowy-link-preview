import { Link } from "./Link";

export class Links {
    private links: Map<string, Link> = new Map();

    constructor(links: Element[]) {
        links.map(Link.create)
            .forEach(link => {
                this.setLink(link)
            });
    }

    static create(links: Element[] = []) {
        return new Links(links);
    }

    static merge(oldLinks: Links, newLinks: Links) {
        const links = new Map<string, Link>([...oldLinks.getLinks(), ...newLinks.getLinks()]);
        return Links.create().setLinks(links)
    }

    public setLink(link: Link) {
        this.links.set(link.getId(), link);
    }

    public setLinks(links: Map<string, Link>) {
        this.links = links;
        return this;
    }

    public getLinks() {
        return this.links.entries();
    }

    public getSize() {
        return this.links.size;
    }
}