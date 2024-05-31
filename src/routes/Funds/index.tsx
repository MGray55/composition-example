import { useEffect, useState } from 'react';
import ky from 'ky';
import { Component1 } from '../../components/Component1';
import { Component2 } from '../../components/Component2';
import styles from './styles.module.scss';
import { DataResponse } from './types/data';
import { SomeOtherComponent } from '../../components/SomeOtherComponent';
import { Component3 } from '../../components/Component3';
import { API_URL } from '../../constants';

const Funds = () => {
    const [isErrorForA, setErrorForA] = useState(false);
    const [isErrorForB, setErrorForB] = useState(false);
    // Default isLoading to true, so feedback is displayed until data call is complete.
    const [isLoadingDataA, setLoadingDataA] = useState(true);
    const [isLoadingDataB, setLoadingDataB] = useState(true);
    // Use undefined as initial state for data. NOT null!
    const [dataForComponent1, setDataForComponent1] = useState<
        object | undefined
    >(undefined);
    const [dataForComponent2, setDataForComponent2] = useState<
        object | undefined
    >(undefined);
    const [messageForSiblings, setMessageForSiblings] = useState<
        string | undefined
    >(undefined);

    const asyncLoadDataForComponent1 = async () => {
        const json: DataResponse = await ky
            .get(API_URL, {
                retry: {
                    limit: 1,
                    methods: ['get'],
                    statusCodes: [413, 404],
                    backoffLimit: 1000,
                },
            })
            .json();
        setLoadingDataA(false);
        if (json) {
            setDataForComponent1(json.Currencies);
        } else {
            setDataForComponent1(undefined);
        }
    };

    const asyncLoadDataForComponent2 = async () => {
        const json: DataResponse = await ky
            .get(API_URL, {
                retry: {
                    limit: 1,
                    methods: ['get'],
                    statusCodes: [413, 404],
                    backoffLimit: 1000,
                },
            })
            .json();
        setLoadingDataB(false);
        setErrorForB(false);
        if (json) {
            setDataForComponent2(
                json.Labels['Application Labels'].TtaExport.ApplicationName
            );
        } else {
            setDataForComponent2(undefined);
        }
    };

    useEffect(() => {
        asyncLoadDataForComponent1().catch(() => {
            setLoadingDataA(false);
            setErrorForA(true);
        });
        asyncLoadDataForComponent2().catch(() => {
            setLoadingDataB(false);
            setErrorForB(true);
        });
    }, []);

    const handleComponent1Click = async () => {
        // Do something like set a property here that would call trigger an action somewhere else, or fetch new data.
        setLoadingDataA(true);
        await asyncLoadDataForComponent1();
    };

    const handleComponent3HasAMessage = (message: string) => {
        // This allows you to communicate between components, while being decoupled.
        // Without putting state inside the component or adding useContext
        setMessageForSiblings(message);
    };
    const handleComponent2SimulateError = () => {
        setErrorForB(true);
    };
    const handleComponent2DataReFetch = async () => {
        setLoadingDataB(true);
        await asyncLoadDataForComponent2();
    };
    return (
        <div className={styles.container}>
            <Component1
                data={dataForComponent1}
                isLoading={isLoadingDataA}
                isError={isErrorForA}
                onClick={handleComponent1Click}
            />
            <Component2
                data={dataForComponent2}
                isLoading={isLoadingDataB}
                isError={isErrorForB}
                onRequestReFetch={handleComponent2DataReFetch}
                onSimulateError={handleComponent2SimulateError}
                message={messageForSiblings}
            />
            <Component3 onSendMessageToSiblings={handleComponent3HasAMessage} />
            <SomeOtherComponent />
        </div>
    );
};

export { Funds };
