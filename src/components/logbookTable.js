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
import { red } from '@material-ui/core/colors';



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

  const fixedStyles = theme => ({
    tableStriped: {
      '& thead': {
        backgroundColor: '#004445',
        border: '1px solid #FFFFFF !important',
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

  const HighlightedFixedCell = ({ value, style, ...restProps}) => (
    // alert(row),
    <TableFixedColumns.Cell
      {...restProps}
      style={{
        // backgroundColor: 'initial', 
        // color: 'blue',
        // cursor:'pointer',

        ...style,
      }}
    >
      <span
        // style={{
        //   color: 'white',
        //   cursor:'pointer',
        // }}
      >
      </span>
    </TableFixedColumns.Cell>
  );

  const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
      {...restProps}
      style={{
        // backgroundColor: 'red',
        color: 'blue',

        ...style,
      }}
    >
      <span
        style={{
          color: 'white',
          cursor:'pointer',
        }}
      >
        <NavLink to="/logbook-entry"><img src={edit}></img></NavLink>
        <img src={remove} onClick="" className="delete-row-icon"></img>
      </span>
    </Table.Cell>
  );

  const HighlightedRowDetailCell = ({ row, value, style, ...restProps }) => (
    <TableRowDetail.Cell
      {...restProps}
      style={{
        backgroundColor: '#DCE0E9',
        // position:'relative',
        // height:'300px',
        // overflow:'hidden',
        ...style,
      }}
    >
      <span
        // style={{
        //   color: 'white',
        // }}
      >
        <div className="row-detail">
          <div className="row-detail-column">
            <div className="row-detail-label">NRM</div>
            <div>{row.nrm}</div>
            <div className="row-detail-label">Tanggal</div>
            <div>{row.tanggal}</div>
            <div className="row-detail-label">Inisisal Pasien</div>
            <div>{row.inisialPasien}</div>
          </div>
          <div className="row-detail-column">
            <div className="row-detail-label">Jenis Kelamin</div>
            <div>{row.jenisKelamin}</div>
            <div className="row-detail-label">Usia</div>
            <div>{row.usia}</div>
            <div className="row-detail-label">Stase</div>
            <div>{row.stase}</div>
          </div>
          <div className="row-detail-column">
            <div className="row-detail-label">Lokasi RS</div>
            <div>{row.lokasiRS}</div>
            <div className="row-detail-label">Ruangan</div>
            <div>{row.ruangan}</div>
            <div className="row-detail-label">Diagnosis</div>
            <div>{row.diagnosis}</div>
          </div>
          <div className="row-detail-column">
            <div className="row-detail-label">Kompetensi Diagnosis</div>
            <div>{row.kompetensiDiagnosis}</div>
            <div className="row-detail-label">Jenis Tindakan</div>
            <div>{row.jenisTindakan}</div>
            <div className="row-detail-label">Keterampilan</div>
            <div>{row.jenisKeterampilan}</div>
          </div>
          <div className="row-detail-column">
            <div className="row-detail-label">Kompetensi Keterampilan</div>
            <div>{row.kompetensiKeterampilan}</div>
            <div className="row-detail-label">Catatan</div>
            <div>{row.catatan}</div>
          </div>
        </div>
      </span>
    </TableRowDetail.Cell>
  );
  
  

  const fixedCell = (props) => {
    
    const column  = props;
      // alert(column.position)
      if (column.side === 'right') {
        return <HighlightedFixedCell {...props} />;
     }
    
    
  return <TableFixedColumns.Cell {...props} />;
  };

  const Cell = (props) => {
    
    const {column}  = props;
    if (column.name === 'action') {
       return <HighlightedCell {...props} />;
    }
  return <Table.Cell {...props} />;
  };

  const rowDetailCell = (props) => {
    const { column } = props;
    // if (column.name === 'action') {
      return <HighlightedRowDetailCell {...props} />;
    // }
  return <TableRowDetail.Cell {...props} />;
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


const getRowId = row => row.id;

export default function logbookTable ()  {
  const [columns] = useState([
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

  const tes = (e) => {
    alert(getRowId(e))
  }

  const stylesDetailRow = {
    
      backgroundColor: '#f5f5f5',
  };

  const TableRow = ({ row, ...restProps }) => (
    <TableRowDetail.Row
      {...restProps}
      style={{
        // backgroundColor:'#000000',
        // color:'#red',
        // cursor:'pointer'
        ...stylesDetailRow[row],
      }}
    />
  );
  
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
  const [leftColumns] = useState([TableRowDetail.COLUMN_TYPE,TableRowDetail.ROW_TYPE,'noentry']);
  const [rightColumns] = useState(['action']);
  

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
         {/* <EditingState
          onCommitChanges={commitChanges}
        /> */}
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
          // contentComponent={RowDetail}
          // rowComponent = {TableRow}
          cellComponent ={rowDetailCell}
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
          // rightColumns={rightColumns}
          // cellComponent={fixedCell}
        /> 
       
      </Grid>
    </Paper>
  );
};