/* eslint-disable react/prop-types */
import styles from "./CSS/PrimaryButton.module.css";

export default function PrimaryButton({
  children,
  padding,
  radius = "8px",
  onClick,
  className,
}) {
  const btnStyle = { padding: padding, borderRadius: radius }; //pass padding as props

  return (
    <>
      <button
        className={`${styles.primaryButton} ${className}`}
        style={btnStyle}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
