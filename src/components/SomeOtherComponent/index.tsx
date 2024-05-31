import styles from './styles.module.scss';
const SomeOtherComponent = () => {
    return (
        <div className={styles.flexGrid}>
            <div className={styles.col}>1</div>
            <div className={styles.col}>2</div>
            <div className={styles.col}>3</div>
        </div>
    );
};

export { SomeOtherComponent };
