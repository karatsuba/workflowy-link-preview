import Link from '../../common/models/Link';
import MetaProp from '../models/MetaProp';
import fetchFromCache from './fetchFromCache';

// parse url and return parsed metatags data
export default (url: string) =>
    fetchFromCache(url)
        .then(handleResponse)
        .catch(handleError);

const parser = new DOMParser();

const titleMetaProp = new MetaProp('title');
const imageMetaProp = new MetaProp('image');
const descriptionMetaProp = new MetaProp('description');

const handleResponse = (response: Response) => {
    if (!response.ok) {
        throw new Error("Can't fetch URL");
    }
    const contentType = response.headers.get('Content-Type')!;
    return contentType.includes('image')
        ? handleResponseAsImage(response)
        : handleResponseAsText(response);
};

const handleResponseAsText = async (response: Response) => {
    const text = await response.text();
    const document = parser.parseFromString(text, 'text/html');
    const props = [titleMetaProp, imageMetaProp, descriptionMetaProp];
    const metatags = Array.from(document.getElementsByTagName('meta')).filter(tag => {
        const property = tag.getAttribute('property') || '';
        const name = tag.getAttribute('name') || '';
        return props.map(p => p.og).includes(property) || props.map(p => p.twitter).includes(name);
    });
    return metatags.reduce((link: Partial<Link>, element: Element) => {
        const tagProp = element.getAttribute('property') || '';
        const tagName = element.getAttribute('name') || '';
        const tagContent = element.getAttribute('content') || '';
        switch (tagProp || tagName) {
            case titleMetaProp.og:
            case titleMetaProp.twitter: {
                link.title = tagContent;
                break;
            }
            case imageMetaProp.og:
            case imageMetaProp.twitter: {
                link.imageUrl = tagContent;
                break;
            }
            case descriptionMetaProp.og:
            case descriptionMetaProp.twitter: {
                link.description = tagContent;
            }
        }
        return link;
    }, {});
};

const handleResponseAsImage = (response: Response): Promise<Partial<Link>> =>
    Promise.resolve({
        url: response.url,
        imageUrl: response.url
    });

const handleError = (error: Error) => Promise.reject(error);
