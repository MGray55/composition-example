import { useEffect, useState } from 'react';
import ky from 'ky';
import { LOADING_STATE } from 'hooks/constants';
import { HTTPErrorWithData } from 'hooks/types.ts';

/**
 * This custom hook lets you call async endpoint in a general way for re-use.
 * @param url
 * @param request - JSON payload
 * @param errorNotificationFn
 */
const useDataFetchPost = (
    url: string,
    request: object,
    errorNotificationFn?: (errorMessage: string | unknown) => void
) => {
    const [data, setData] = useState<object | undefined>(undefined);
    const [error, setError] = useState<unknown | undefined>(undefined);
    const [loadingStatus, setLoadingStatus] = useState<string>(
        LOADING_STATE.LOADING
    );

    if (!url || url.length === 0) {
        throw 'No URL argument passed to useGeneralizedCrudMethods';
    }

    const formatErrorString = (e: HTTPErrorWithData, url: string) => {
        const errorString =
            e?.response?.status === 404
                ? `${e?.message} URL:  ${url} Status Code: 404`
                : `${e?.message} Response:  ${e?.response?.data || e.toString()} Status Code: ${e?.response?.status}`;
        console.error(errorString);
        return errorString;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoadingStatus(LOADING_STATE.LOADING);
                const data: object = await ky(url, {
                    method: 'POST',
                    json: JSON.stringify(request),
                });
                if (data) {
                    setData(data);
                }
                setLoadingStatus(LOADING_STATE.SUCCESS);
            } catch (e: unknown) {
                setError(formatErrorString(e as HTTPErrorWithData, url));
                setLoadingStatus(LOADING_STATE.ERROR);
                if (errorNotificationFn) {
                    errorNotificationFn(e);
                }
            }
        };
        getData();
    }, [url]);

    const reFetchData = () => {
        const getData = async () => {
            try {
                setLoadingStatus(LOADING_STATE.LOADING);
                const data: object = await ky
                    .get(url, {
                        retry: {
                            limit: 2,
                            methods: ['get'],
                            statusCodes: [413],
                            backoffLimit: 1000,
                        },
                    })
                    .json();
                if (data) {
                    setData(data);
                }
                setLoadingStatus(LOADING_STATE.SUCCESS);
            } catch (e: unknown) {
                setError(formatErrorString(e as HTTPErrorWithData, url));
                setLoadingStatus(LOADING_STATE.ERROR);
            }
        };
        getData();
    };

    return {
        data,
        error,
        loadingStatus,
        reFetchData,
    };
};

export { useDataFetchPost };
