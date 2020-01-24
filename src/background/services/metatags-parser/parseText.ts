import Link from '../../../common/models/Link';
import MetaProp from '../../models/MetaProp';

const parser = new DOMParser();

const titleMetaProp = new MetaProp('title');
const imageMetaProp = new MetaProp('image');
const descriptionMetaProp = new MetaProp('description');

const props = [titleMetaProp, imageMetaProp, descriptionMetaProp];

const parseText = async (response: Response): Promise<Partial<Link>> => {
    const text = await response.text();
    const document = parser.parseFromString(text, 'text/html');

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
                break;
            }
        }
        return link;
    }, {});
};

export default parseText;
