import styles from "./Button.module.css";
import Link from "next/link";

export type ButtonProps = {
  imgSrc: string;
  href: string;
};

function Button({ imgSrc, href }: ButtonProps) {
  return (
    <Link href={href}>
      <button className={styles.btn}>
        <img src={imgSrc} />
      </button>
    </Link>
  );
}

export default Button;
