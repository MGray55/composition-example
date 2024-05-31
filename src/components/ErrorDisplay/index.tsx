import styles from './styles.module.scss';
import { MouseEventHandler } from 'react';

type Props = {
    message?: string;
    onClick?: MouseEventHandler | undefined;
};
const ErrorDisplay = ({ message, onClick }: Props) => {
    return (
        <div className={styles.container}>
            ErrorDisplay
            <div className={styles.message}>
                {message || 'There was a problem'}
            </div>
            <button onClick={onClick}>Try again? </button>
        </div>
    );
};

export { ErrorDisplay };
