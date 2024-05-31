import { useEffect, useState } from 'react';
import ky from 'ky';

const LOADING_STATES = {
    LOADING: 'Loading',
    SUCCESS: 'Success',
    ERROR: 'Error',
};

/**
 * This custom hook lets you call ansync endpoint in a general way for re-use.
 * @param url
 * @param errorNotificationFn
 */
const useGeneralizedCrudMethods = (
    url,
    errorNotificationFn?: (errorMessage: string) => void
) => {
    const [data, setData] = useState<object | undefined>(undefined);
    const [error, setError] = useState<unknown | undefined>(undefined);
    const [loadingStatus, setLoadingStatus] = useState<string>(
        LOADING_STATES.LOADING
    );

    if (!url || url.length === 0) {
        throw 'No URL argument passed to useGeneralizedCrudMethods';
    }

    const formatErrorString = (e, url: string) => {
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
                setLoadingStatus(LOADING_STATES.LOADING);
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
                setLoadingStatus(LOADING_STATES.SUCCESS);
            } catch (e) {
                setError(formatErrorString(e, url));
                setLoadingStatus(LOADING_STATES.ERROR);
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
                setLoadingStatus(LOADING_STATES.LOADING);
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
                setLoadingStatus(LOADING_STATES.SUCCESS);
            } catch (e) {
                setError(formatErrorString(e, url));
                setLoadingStatus(LOADING_STATES.ERROR);
            }
        };
        getData();
    };

    return {
        data,
        loadingStatus,
        error,
        reFetchData,
    };
};

export { LOADING_STATES, useGeneralizedCrudMethods };
