import { Loading } from '../Loading';
import { ErrorDisplay } from '../ErrorDisplay';
import { NoResults } from '../NoResults';
import styles from './styles.module.scss';
import { ReactElement, useCallback } from 'react';

type Props = {
    data?: object;
    isLoading: boolean;
    isError: boolean;
    onClick: (payload?: object | string) => void;
    // This is just an example custom action below
    // onRequestReFetch?: (payload?: object | string) => void;
};

const Component1 = ({ isLoading, isError, data, onClick }: Props) => {
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

    const handleRetry = () => {
        if (onClick) {
            onClick();
        }
    };

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <ErrorDisplay onClick={handleRetry} />;
    }

    if (!data) {
        return <NoResults />;
    }

    return (
        <div className={styles.container}>
            <div>Component1 - Currencies</div>
            <>{parseData()}</>
            <button onClick={onClick}>Reload Data?</button>
        </div>
    );
};

export { Component1 };
