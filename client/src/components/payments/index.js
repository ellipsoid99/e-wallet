import PaymentSecure from "./PaymentSecure";
import styles from "./Payment.module.scss";

const PaymentsComponent = () => {
  return (
    <div className={`${styles.wrapper} gradientBase`}>
      <div className={styles.formContainer}>
        <PaymentSecure />
      </div>
    </div>
  );
};

export default PaymentsComponent;
