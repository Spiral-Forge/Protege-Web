import styles from "../../../styles/Faqs.module.css";
import { BsFillTriangleFill } from "react-icons/bs";
import { faqQuestionAnswers } from "../staticPagesData";

function Faqs() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>FAQs</h1>
      </div>
      <div className={styles.content}>
        {faqQuestionAnswers.map((faq, index) => {
          return (
            <details key={index} className={styles.details}>
              <summary>
                <div className={styles.qno}><p align="center">{index+1}</p></div>
                <div><p className={styles.question}>{faq.question}</p></div>
              </summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>
          );
        })}
      </div>
    </div>
  );
}

export default Faqs;
