import React from 'react';
import styles from './DataTable.module.scss';

interface Column<T = unknown> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T = unknown> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

const DataTable = <T extends Record<string, unknown>>({ 
  data, 
  columns, 
  className = "" 
}: DataTableProps<T>) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`row-${index}`}>
                {columns.map((column) => (
                  <td key={column.key} className="align-middle">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : String(row[column.key] || '')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable; 