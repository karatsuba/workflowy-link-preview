export class Parser {
    private domParser = new DOMParser();

    parseMetaTags(elements: HTMLMetaElement[]) {
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

    parseHTML(html: string) {
        const elements = this.parseString(html);
        return this.parseMetaTags(elements);
    }

    parseImage(url:string) {
        return {
            url,
            image: url
        }
    }


    parseURL(url: string) {
        return fetch(url)
            .then(response => {
                const contentType: string = response.headers.get("Content-Type")!;

                if (contentType.includes('image')) {
                    return this.parseImage(url)
                } else {
                    return response.text().then(this.parseHTML.bind(this));
                }

            })
            .catch(console.error);
    }

    static create() {
        return new Parser();
    }
}