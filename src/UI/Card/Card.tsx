import styles from './Card.module.scss';

type CardProps = {
  headerContent?: JSX.Element;
  bodyContent?: JSX.Element;
  height?: number;
};

function Card({ headerContent, bodyContent, height }: CardProps) {
  return (
    <div className={styles.card} style={{ height: height }}>
      <div className={styles['card__header']}>{headerContent}</div>
      <div className={styles['card__body']}>{bodyContent}</div>
    </div>
  );
}

export default Card;
