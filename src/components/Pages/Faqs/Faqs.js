import styles from "../../../styles/Faqs.module.css";
import { BsFillTriangleFill } from "react-icons/bs";
import faqsArr from "./faqsArr";
function Faqs() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>FAQs</h1>
      </div>
      <div className={styles.content}>
        {faqsArr.map((faq, index) => {
          return (
            <details key={index} className={styles.details}>
              <summary>
                <i>{faq.question}</i>
                <BsFillTriangleFill className={styles.tri} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          );
        })}
      </div>
    </div>
  );
}

export default Faqs;