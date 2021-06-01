import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import { 
  EditingState, 
  PagingState, 
  IntegratedPaging, 
  RowDetailState,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { withStyles } from '@material-ui/core/styles';
// import {  } from '@devexpress/dx-react-grid';

import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableFixedColumns,
  TableEditRow,
  TableEditColumn,
  TableRowDetail,
  TableColumnReordering,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

// import {
//   generateRows,
//   globalSalesValues,
//   defaultColumnValues,
// } from './demo-data/generator';
import edit from '../assets/images/logbook/edit.png'
import remove from '../assets/images/logbook/delete.png'



const styles = theme => ({
    tableStriped: {
      '& thead': {
        backgroundColor: '#004445',
        border: '1px solid #FFFFFF !important',
      },
      '& thead div': {
        justifyContent: 'center'
      },
      '& thead span': {
        color: 'white'
      },

      '& tbody td': {
        textAlign:'center',
        border: '1px solid #EDF0F5'
      },

      '& tbody tr:nth-of-type(odd)': {
        backgroundColor: '#FFFDFF',
      },
      '& tbody tr:nth-of-type(even)': {
        backgroundColor: '#DBF1FF',
      },
    },
  });

  const TableComponentBase = ({ classes, ...restProps }) => (
    <Table.Table
      {...restProps}
      className="logbook-table-content"
      // className={classes.tableStriped}
    />
    
  );

  const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
      {...restProps}
      // style={{
      //   backgroundColor: 'red',
      //   ...style,
      // }}
    >
      <span
        // style={{
        //   color: 'white',
        // }}
      >
        <NavLink to="/logbook-entry"><img src={edit}></img></NavLink>
        <img src={remove} ></img>
      </span>
    </Table.Cell>
  );
  
  const Cell = (props) => {
    const { column } = props;
    if (column.name === 'action') {
      return <HighlightedCell {...props} />;
    }
  return <Table.Cell {...props} />;
  };

const TableHeaderContent = ({ children, ...restProps }) => (
  <TableEditColumn.HeaderCell
    // column={column}
    {...restProps}
  >
    {children}
    {/* {column.name === 'nrm' ? ( */}
      <div>Action</div>
    {/* ) : null} */}
  </TableEditColumn.HeaderCell>
);

const commandMessage = {deleteCommand:"Hapus"}  

  export const TableComponent = withStyles(styles, { name: 'TableComponent' })(TableComponentBase);

const RowDetail = ({ row }) => (
  <div>
    Details for
    {' '}
    {row.region}
    {' '}
    from
    {' '}
    {row.sector}
  </div>
);


const getRowId = row => row.id;

export default function logbookTable ()  {
//   const [columns] = useState([
//     { name: 'region', title: 'Region' },
//     { name: 'sector', title: 'Sector' },
//     { name: 'channel', title: 'Channel' },
//     { name: 'customer', title: 'Customer' },
//     { name: 'product', title: 'Product' },
//     { name: 'saleDate', title: 'Sale date' },
//     { name: 'units', title: 'Units' },
//     { name: 'amount', title: 'Sale Amount' },
//   ]);
  const [columns] = useState([
    // { name: 'test2', title: 'test2' },
    // { name: 'test', title: 'test' },
    { name: 'noentry', title: 'No. Entry' },
    { name: 'nrm', title: 'NRM' },
    { name: 'tanggal', title: 'Tanggal' },
    { name: 'stase', title: 'Stase' },
    { name: 'lokasiRS', title: 'Lokasi RS' },
    { name: 'ruangan', title: 'Ruangan' },
    { name: 'inisialPasien', title: 'Inisial Pasien' },
    { name: 'jenisKelamin', title: 'Jenis Kelamin' },
    { name: 'usia', title: 'Usia' },
    { name: 'diagnosis', title: 'Diagnosis' },
    { name: 'kompetensiDiagnosis', title: 'Kompetensi Diagnosis' },
    { name: 'jenisTindakan', title: 'Jenis Tindakan' },
    { name: 'jenisKeterampilan', title: 'Jenis Keterampilan' },
    { name: 'kompetensiKeterampilan', title: 'Kompetensi Keterampilan' },
    { name: 'catatan', title: 'Catatan' },
    { name: 'action', title: 'Action' },
  ]);
  // const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
//   const [rows, setRows] = useState(generateRows({
//     columnValues: { id: ({ index }) => index, ...globalSalesValues },
//     length: 8,
//   }));
  const [rows, setRows] = useState([
    {id: ({ index }) => index,
      noentry: '105986',
     nrm: '487441',
     tanggal: '07/05/2016',
     stase : 'Bedah dan ATLS',
     lokasiRS: 'RSCM',
     ruangan: 'Poliklinik',
     inisialPasien: 'IT',
     jenisKelamin: 'Perempuan',
     usia: '15',
     diagnosis: 'Text',
     kompetensiDiagnosis: '4A, 4A',
     jenisTindakan: 'Observasi',
     jenisKeterampilan: 'Text',
     kompetensiKeterampilan: '1, 2',
     catatan: 'Tidak ada gejala'
  },
  {id: ({ index }) => index,
    noentry: '105987',
     nrm: '487441',
     tanggal: '07/05/2016',
     stase : 'Bedah dan ATLS',
     lokasiRS: 'RSCM',
     ruangan: 'Poliklinik',
     inisialPasien: 'IT',
     jenisKelamin: 'Perempuan',
     usia: '15',
     diagnosis: 'Text',
     kompetensiDiagnosis: '4A, 4A',
     jenisTindakan: 'Observasi',
     jenisKeterampilan: 'Text',
     kompetensiKeterampilan: '1, 2',
     catatan: 'Tidak ada gejala'


  },
  {id: ({ index }) => index,
    noentry: '105988',
     nrm: '487441',
     tanggal: '07/05/2016',
     stase : 'Bedah dan ATLS',
     lokasiRS: 'RSCM',
     ruangan: 'Poliklinik',
     inisialPasien: 'IT',
     jenisKelamin: 'Perempuan',
     usia: '15',
     diagnosis: 'Text',
     kompetensiDiagnosis: '4A, 4A',
     jenisTindakan: 'Observasi',
     jenisKeterampilan: 'Text',
     kompetensiKeterampilan: '1, 2',
     catatan: 'Tidak ada gejala',

  },
  {id: ({ index }) => index,
    noentry: '105989',
     nrm: '487441',
     tanggal: '07/05/2016',
     stase : 'Bedah dan ATLS',
     lokasiRS: 'RSCM',
     ruangan: 'Poliklinik',
     inisialPasien: 'IT',
     jenisKelamin: 'Perempuan',
     usia: '15',
     diagnosis: 'Text',
     kompetensiDiagnosis: '4A, 4A',
     jenisTindakan: 'Observasi',
     jenisKeterampilan: 'Text',
     kompetensiKeterampilan: '1, 2',
     catatan: 'Tidak ada gejala'


  }
  ]);


  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

//   const [tableColumnExtensions] = useState([
//     { columnName: 'region', width: 150 },
//     { columnName: 'sector', width: 180 },
//     { columnName: 'channel', width: 120 },
//     { columnName: 'product', width: 230 },
//     { columnName: 'customer', width: 230 },
//     { columnName: 'saleDate', width: 130 },
//     { columnName: 'units', width: 80 },
//     { columnName: 'amount', align: 'right', width: 140 },
//   ]);

  const [tableColumnExtensions] = useState([
    // { columnName: 'tes2', width: 200 },
    // { columnName: 'tes', width: 200 },
    { columnName: 'noentry', width: 200, backgroundColor:'#000000 !important'},
    { columnName: 'nrm', width: 200 },
    { columnName: 'tanggal', width: 200 },
    { columnName: 'stase', width: 200 },
    { columnName: 'lokasiRS', width: 200 },
    { columnName: 'ruangan', width: 200 },
    { columnName: 'inisialPasien', width: 200 },
    { columnName: 'jenisKelamin', width: 200 },
    { columnName: 'usia', width: 200},
    { columnName: 'diagnosis', width: 200 },
    { columnName: 'kompetensiDiagnosis', width: 200 },
    { columnName: 'jenisTindakan', width: 200 },
    { columnName: 'jenisKeterampilan', width: 200 },
    { columnName: 'kompetensiKeterampilan', width: 200 },
    { columnName: 'catatan', width: 200 },
    { columnName: 'action', width: 200 },
  ]);
  const [leftColumns] = useState([TableRowDetail.COLUMN_TYPE,'noentry']);
  const [rightColumns] = useState([TableEditColumn.COLUMN_TYPE]);


  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
         <EditingState
          onCommitChanges={commitChanges}
        />
        <RowDetailState
          defaultExpandedRowIds={[2,5]}
        />
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <IntegratedPaging />
        <SortingState
          defaultSorting={[]}
        />
        <IntegratedSorting />
        {/* <DragDropProvider /> */}
        <Table columnExtensions={tableColumnExtensions} 
            tableComponent={TableComponent}
            cellComponent={Cell}
        />
         {/* <TableColumnReordering
          defaultOrder={['noentry','nrm','tanggal','stase','lokasiRS','ruangan','inisialPasien', 'jenisKelamin','usia', 'diagnosis','kompetensiDiagnosis','jenisTindakan', 'jenisKeterampilan','catatan','kompetensiKeterampilan',TableEditColumn.COLUMN_TYPE,TableRowDetail.COLUMN_TYPE]}
        /> */}
        <PagingPanel />
        <TableHeaderRow  />
        <TableRowDetail
          contentComponent={RowDetail}
        />
        {/* <TableEditRow tableComponent={TableComponent}/>
        <TableEditColumn
          headerCellComponent={TableHeaderContent} 
          // commandComponent={commandContent}
          // showAddCommand
          showEditCommand
          showDeleteCommand
          messages={commandMessage}
        /> */}
        <TableFixedColumns
          leftColumns={leftColumns}
          rightColumns={rightColumns}
          // cellComponent={Cell}
        /> 
       
      </Grid>
    </Paper>
  );
};