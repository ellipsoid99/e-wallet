import PaymentProgress from "./PaymentProgress";
import PaymentForm from "./PaymentForm";
import styles from "./Payment.module.scss";

const PaymentsComponent = () => {
    return (
        <div className={`${styles.wrapper} gradientBase`}>
            <div className={styles.formContainer}>
                <PaymentForm />
            </div>
            <div className={styles.otherContainer}>
                <PaymentProgress />
            </div>
        </div>
    );
};

export default PaymentsComponent;
