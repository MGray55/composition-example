import { Loading } from '../Loading';
import { ErrorDisplay } from '../ErrorDisplay';
import { NoResults } from '../NoResults';
import styles from './styles.module.scss';
import { ReactElement, useCallback } from 'react';
import { useCmsData } from '../../hooks/useCmsData.ts';
import { LOADING_STATES } from '../../hooks/useGeneralizedCrudMethods.ts';

type Props = {
    onSendMessageToSiblings: (message: string) => void;
};

const Component3 = ({ onSendMessageToSiblings }: Props) => {
    // In this component - there is no outside data being passed in.
    // The data is coming from a custom hook, but this could be any source.
    // It could be an API call, or something already on state, etc.
    // We really don't care. And it makes it easier for the custom hook implementation to change.
    const { error, data, loadingStatus, reFetchData } = useCmsData();

    const parseData = useCallback((): ReactElement => {
        const entries = [];
        const labels =
            data.Labels['Application Labels'].TtaExport.ApplicationName;
        for (const key in labels) {
            entries.push(
                <div className={styles.table}>
                    <div>{key}</div>
                    <div>{data[key]}</div>
                </div>
            );
        }
        return <div>{entries}</div>;
    }, [data]);

    const handleRetry = () => {
        reFetchData();
    };

    const handleSendMessage = () => {
        if (onSendMessageToSiblings) {
            onSendMessageToSiblings('Hello from component #3');
        }
    };

    if (loadingStatus === LOADING_STATES.LOADING) {
        return <Loading />;
    }
    if (loadingStatus === LOADING_STATES.ERROR) {
        return <ErrorDisplay message={error} onClick={handleRetry} />;
    }

    if (!data) {
        // But it would probably be better to have (loadingStatus === LOADING_STATES.NO_RESULT)
        return <NoResults />;
    }

    return (
        <div className={styles.container}>
            <div>Component3</div>
            <>{parseData()}</>
            <button onClick={handleSendMessage}>
                Send Message to Component 2?
            </button>
            <button onClick={handleRetry}>Reload Data?</button>
        </div>
    );
};

export { Component3 };
