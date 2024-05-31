import { useGeneralizedCrudMethods } from './useGeneralizedCrudMethods.ts';
import { API_URL } from '../constants';

/**
 * Can be used like any other React hook, but makes an aync call to an API.
 * If this
 */
const useCmsData = () => {
    const errorNotificationFn = (error: string) => {
        console.error(`Exception in useCMSData: ${error}`);
    };

    const { data, error, loadingStatus, reFetchData } =
        useGeneralizedCrudMethods(API_URL, errorNotificationFn);

    return {
        data,
        error,
        loadingStatus,
        reFetchData,
    };
};

export { useCmsData };
