import { ErrorDisplay } from '../ErrorDisplay';
import { Loading } from '../Loading';
import styles from './styles.module.scss';
import { ReactElement, useCallback } from 'react';

type Props = {
    data?: object;
    isLoading: boolean;
    isError: boolean;
    // This is just an example custom action below
    onRequestReFetch?: (payload?: object | string) => void;
    onSimulateError?: () => void;
    message?: string;
};

const Component2 = ({
    isLoading,
    isError,
    data,
    onRequestReFetch,
    onSimulateError,
    message,
}: Props) => {
    const parseData = useCallback((): ReactElement => {
        const entries = [];
        for (const key in data) {
            entries.push(
                <div className={styles.table}>
                    <div>{key}</div>
                    <div>{data[key]}</div>
                </div>
            );
        }
        return <div>{entries}</div>;
    }, [data]);

    const handleSimulateError = () => {
        if (onSimulateError) {
            onSimulateError();
        }
    };

    const handleRetry = () => {
        if (onRequestReFetch) {
            onRequestReFetch();
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorDisplay onClick={handleRetry} />;
    }

    return (
        <div className={styles.container}>
            <div>Component2 - Tta</div>
            {message && <div>{`Got your message: ${message}`}</div>}
            <>{parseData()}</>
            <button onClick={handleRetry}>Reload Data?</button>
            <button onClick={handleSimulateError}>Simulate Error?</button>
        </div>
    );
};

export { Component2 };
