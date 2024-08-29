import styles from "./input.module.scss";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: InputProps) => {
  return <input className={`${styles.input} input`} {...props} />;
};

export default Input;
