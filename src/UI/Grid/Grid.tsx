import styles from './Grid.module.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */
type GridProps = {
  items: any[];
  component: React.FC<{ item: any }>;
  identifier: string;
};

function Grid({ items, component: Component, identifier }: GridProps) {
  return (
    <ul className={styles['grid']}>
      {items.map((item) => (
        <li className={styles['grid__item']} key={item[identifier]}>
          <Component item={item} />
        </li>
      ))}
    </ul>
  );
}

export default Grid;
