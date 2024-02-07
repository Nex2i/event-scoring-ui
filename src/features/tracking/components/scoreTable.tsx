import { useState, FC } from 'react';

type RowData = {
  target: number;
  firstArrow: string;
  secondArrow: string;
};

type DynamicTableProps = {
  numRows: number;
};

export const ScoreTable: FC<DynamicTableProps> = ({ numRows }) => {
  const [rows, setRows] = useState<Array<RowData>>(
    Array.from({ length: numRows }, (_, index) => ({
      target: index + 1,
      firstArrow: '',
      secondArrow: '',
    }))
  );

  const handleInputChange = (rowIndex: number, column: 'firstArrow' | 'secondArrow', value: string) => {
    const updatedRows = rows.map((row, index) => (index === rowIndex ? { ...row, [column]: value } : row));
    setRows(updatedRows);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Target</th>
            <th>1st Arrow</th>
            <th>2nd Arrow</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.target}</td>
              <td>
                <input
                  type="text"
                  value={row.firstArrow}
                  onChange={(e) => handleInputChange(index, 'firstArrow', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.secondArrow}
                  onChange={(e) => handleInputChange(index, 'secondArrow', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
