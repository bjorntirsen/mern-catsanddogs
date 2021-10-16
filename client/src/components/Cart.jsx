import React from "react";
import styles from "../styles/Cart.module.css";
import Button from "./Button";

export default function Cart() {
  return (
   <body className={styles.body}>
     <div className={styles.cart_container}>

       <div className={styles.header}>
         <h2 >Shopping Cart</h2>
         <h5 className={styles.action}>Remove all</h5>
       </div>

       <div className={styles.cart_items}>
          <div className={styles.image_box}>
            <img className={styles.img} src="https://static.zara.net/photos///2021/I/0/1/p/0653/289/712/2/w/1126/0653289712_2_1_1.jpg?ts=1632311345187"   alt="product" />
          </div>
          <h1 className={styles.title}>Product Name</h1>
          <div className={styles.counter}>
            <div className={styles.btn}>+</div>
            <div className={styles.count}>1</div>
            <div className={styles.btn}>-</div>
          </div>
          <div className={styles.prices}>
            <div className={styles.amount}>$2.99</div>
            <div className={styles.remove}>Remove</div>
           </div>
        </div>

        <div className={styles.cart_items}>
          <div className={styles.image_box}>
            <img className={styles.img} src="https://static.zara.net/photos///2021/I/0/1/p/0653/288/505/2/w/1738/0653288505_1_1_1.jpg?ts=1632311327730"   alt="product" />
          </div>
          <h1 className={styles.title}>Product Name</h1>
          <div className={styles.counter}>
            <div className={styles.btn}>+</div>
            <div className={styles.count}>1</div>
            <div className={styles.btn}>-</div>
          </div>
          <div className={styles.prices}>
            <div className={styles.amount}>$5.99</div>
            <div className={styles.remove}>Remove</div>
           </div>
        </div>
       
       
        <div className={styles.checkout}>
        <div className={styles.total}>
          <div>
            <div className={styles.totalprice}>Total</div>
            <div className={styles.items}>2 items</div>
          </div> 
          <div className={styles.total_amount}>$8.98</div>
        </div>
        <div className={styles.button}>
        <Button type="primary" text="Checkout" />
        </div>
       </div>
     </div>
   </body>
  );
}

