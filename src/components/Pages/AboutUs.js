import styles from "../../styles/AboutUs.module.css";

function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>About Us</h1>
      </div>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi
        praesentium autem dolorum commodi delectus voluptatem dicta, quibusdam
        officiis hic sapiente, mollitia quaerat dolorem voluptatum. Rederit
        laborum dolor voluptate voluptatem! <br /> <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi
        praesentium autem dolorum commodi delectus voluptatem dicta, quibusdam
        officiiem dolorum commodi delectus voluptatem dicta, quibusdam ofderit
        laborum dolor voluptate voluptatem! <br />
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi
        praesentium autem dolorum commodi delectus voluptatem dicta, quibusdam
        officierit laborum dolor voluptate voluptatem!
      </div>
    </div>
  );
}

export default AboutUs;
