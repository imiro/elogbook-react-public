// import React, { Component } from 'react'
// import { useTable } from 'react-table'
// import { useTable, useBlockLayout } from "react-table";
// import { useSticky } from "react-table-sticky";
//  function Tes() {
//    const data = React.useMemo(
//      () => [
//        {
//          col1: 'Hello',
//          col2: 'World',
//        },
//        {
//          col1: 'react-table',
//          col2: 'rocks',
//        },
//        {
//          col1: 'whatever',
//          col2: 'you want',
//        },
//      ],
//      []
//    )
 
//    const columns = React.useMemo(
//      () => [
//        {
//          Header: 'Column 1',
//          accessor: 'col1', // accessor is the "key" in the data
//        },
//        {
//          Header: 'Column 2',
//          accessor: 'col2',
//        },
//      ],
//      []
//    )
 
//    const {
//      getTableProps,
//      getTableBodyProps,
//      headerGroups,
//      rows,
//      prepareRow,
//    } = useTable({ columns, data })
 
//    return (
//      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
//        <thead>
//          {headerGroups.map(headerGroup => (
//            <tr {...headerGroup.getHeaderGroupProps()}>
//              {headerGroup.headers.map(column => (
//                <th
//                  {...column.getHeaderProps()}
//                  style={{
//                    borderBottom: 'solid 3px red',
//                    background: 'aliceblue',
//                    color: 'black',
//                    fontWeight: 'bold',
//                  }}
//                >
//                  {column.render('Header')}
//                </th>
//              ))}
//            </tr>
//          ))}
//        </thead>
//        <tbody {...getTableBodyProps()}>
//          {rows.map(row => {
//            prepareRow(row)
//            return (
//              <tr {...row.getRowProps()}>
//                {row.cells.map(cell => {
//                  return (
//                    <td
//                      {...cell.getCellProps()}
//                      style={{
//                        padding: '10px',
//                        border: 'solid 1px gray',
//                        background: 'papayawhip',
//                      }}
//                    >
//                      {cell.render('Cell')}
//                    </td>
//                  )
//                })}
//              </tr>
//            )
//          })}
//        </tbody>
//      </table>
//    )
//  }

//  export default Tes


import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid';

// import {
//   generateRows,
//   globalSalesValues,
// } from '../../../demo-data/generator';

export default function Tes () {
  // const [columns] = useState([
  //   { name: 'region', title: 'Region' },
  //   { name: 'sector', title: 'Sector' },
  //   { name: 'channel', title: 'Channel' },
  //   { name: 'customer', title: 'Customer' },
  //   { name: 'product', title: 'Product' },
  //   { name: 'saleDate', title: 'Sale date' },
  //   { name: 'units', title: 'Units' },
  //   { name: 'amount', title: 'Sale Amount' },
  // ]);
  // // const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
  // const [rows] = useState([
  //   { region: 'region1', sector: 'S1' },
  //   { region: 'region2', sector: 'S2' },
  // ]);

  // const [tableColumnExtensions] = useState([
  //   { columnName: 'region', width: 150 },
  //   { columnName: 'sector', width: 180 },
  //   { columnName: 'channel', width: 120 },
  //   { columnName: 'product', width: 230 },
  //   { columnName: 'customer', width: 230 },
  //   { columnName: 'saleDate', width: 130 },
  //   { columnName: 'units', width: 80 },
  //   { columnName: 'amount', align: 'right', width: 140 },
  // ]);
  // const [leftColumns] = useState(['region', 'channel']);
  // const [rightColumns] = useState(['amount']);

  return (
    <div>
      tessssssssssss
      {/* <Grid
        // rows={rows}
        // columns={columns}
        rows= {[{name: 'contohnama'}]}s
        columns={[{name: 'nama'}]}
      >
        <Table
          // columnExtensions={tableColumnExtensions}
          columnExtensions={[{columnName:'name',width:150}]}
        />
        <TableHeaderRow />
        <TableFixedColumns
          leftColumns={leftColumns}
          rightColumns={rightColumns}
        />
      </Grid> */}
    </div>
  );
};
