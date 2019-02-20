export class Parser {
    private domParser = new DOMParser();

    parseURL(url: string) {
        return fetch(url)
            .then(response => response.text())
            .then(html => this.domParser.parseFromString(html, "text/html"))
            .catch(console.error);
    }

    static create() {
        return new Parser();
    }
}