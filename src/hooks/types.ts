import { HTTPError } from 'ky';

type HTTPErrorResponseWithData = Response & { data?: string };
type HTTPErrorWithData = HTTPError & { response: HTTPErrorResponseWithData };

export { type HTTPErrorWithData };
