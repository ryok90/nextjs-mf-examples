import muipkg from '@mui/material/package.json';
import styles from './table.module.css';
import Button from '@mui/material/Button';

export type TableData = {
  name: string;
  age: number;
  email: string;
};

/* eslint-disable-next-line */
export interface TableProps {
  data: TableData[];
}

export function Table({ data }: TableProps) {
  return (
    <>
      <div className="flex justify-center">
        <Button variant="outlined" color="error">
          Buttom from MUI
        </Button>
      </div>
      <h3 className="text-center font-bold mt-4">
        This is the <span className="text-yellow-700">@mui/material</span>{' '}
        version being called from remote:{' '}
        <span className={styles.redText}>[{muipkg.version}]</span>
      </h3>
      <table className={`${styles.table} mt-6`}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Age</th>
            <th className={styles.tableHeader}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className={styles.tableRow} key={row.email}>
              <td className={styles.tableCell}>{row.name}</td>
              <td className={styles.tableCell}>{row.age}</td>
              <td className={styles.tableCell}>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
