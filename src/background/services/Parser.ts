export class Parser {
    private domParser = new DOMParser();

    parseMetaTags(elements: Element[]) {
        return elements.reduce((result: any, element: Element) => {
            return Object.keys(result).filter(prop => {
                return `og:${prop}` === element.getAttribute('property')
            }).reduce((res, prop) => {
                res[prop] = element.getAttribute('content');
                return res;
            }, result);
        }, {
            title: null,
            description: null,
            url: null,
            image: null
        });
    }

    parseString(html: string) {
        const doc = this.domParser.parseFromString(html, "text/html");
        return Array.from(doc.getElementsByTagName('meta'));
    }

    parseURL(url: string) {
        return fetch(url)
            .then(response => response.text())
            .then(this.parseString.bind(this))
            .then(this.parseMetaTags)
            .catch(console.error);
    }

    static create() {
        return new Parser();
    }
}