import React from 'react';

function StatisticLine({ text, value, percent }) {
  return (
    <tr>
      <td>{text} </td>
      <td>
        {value.toFixed(2)} {percent ? '%' : ''}
      </td>
    </tr>
  );
}

export default StatisticLine;
