import React from 'react';
import '../../styles/components.css';

const Table = ({ columns, data, onRowClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} style={{ width: column.width }}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>
              Aucune donnée disponible
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr
              key={row._id || index}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
