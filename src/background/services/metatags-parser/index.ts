import Link from '../../../common/models/Link';
import fetchFromCache from '../fetchFromCache';
import parseText from './parseText';
import parseImage from './parseImage';

const handleResponse = (response: Response): Promise<Partial<Link>> => {
    if (!response.ok) {
        throw new Error("Can't fetch URL");
    }

    const contentType = response.headers.get('Content-Type');

    if (!contentType) {
        throw new Error("Can't fetch URL");
    }
    return contentType.includes('image') ? parseImage(response) : parseText(response);
};

const handleFailure = (error: Error): Promise<never> => Promise.reject(error);

// parse url and return parsed metatags data
export default async function parse(url: string): Promise<Partial<Link>> {
    try {
        const response = await fetchFromCache(url);
        return handleResponse(response);
    } catch (error) {
        return handleFailure(error);
    }
}
