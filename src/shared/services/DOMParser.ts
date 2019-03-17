const domParser = new DOMParser();
const DOCUMENT_TYPE = 'text/html';

export default (str: string) => {
    // TODO: handle parse error
    return domParser.parseFromString(str, DOCUMENT_TYPE);
}