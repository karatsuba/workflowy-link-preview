import Link from '../../../common/models/Link';

const parseImage = (response: Response): Promise<Partial<Link>> =>
    Promise.resolve({
        url: response.url,
        imageUrl: response.url
    });

export default parseImage;
