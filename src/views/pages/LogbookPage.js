import React from 'react';
import { Table, Container, Row,
          Card, CardBody, Badge } from 'reactstrap'

const LogbookPage = (props) => {
  const data = [
    {
      id: 1,
      stase: "Bedah",
      tanggal: "2020-11-04",
      lokasi: "IGD",
      identitas: "Tn X, 51 tahun",
      nrm: "00-11-2345",
      diagnosis: "VL",
      kegiatan: "Tindakan (Hecting)",
      created_at: "2020-11-05"
    }
  ]

  return (
    <React.Fragment>
      <TableComponent data={data} />
      <ResponsiveCardsComponent data={data} />
    </React.Fragment>
  )
}

const TableComponent = function (props) {
  return (
    <Table className="d-none d-lg-block">
      <thead>
        <tr>
          <th>#</th>
          <th>Stase</th>
          <th>Tanggal</th>
          <th>Tempat</th>
          <th>Identitas</th>
          <th>NRM</th>
          <th>Diagnosis</th>
          <th>Kegiatan</th>
          <th>Tanggal input</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map(
            row => <SingleTableRow data={row} />
          )
        }
      </tbody>
    </Table>
  );
};

const ResponsiveCardsComponent = (props) => {
  return (
    <Container className="d-block d-lg-none">
      <SingleCardComponent />
      <SingleCardComponent />
    </Container>
  )
}

const SingleCardComponent = (props) => {
  return (
    <Card>
      <CardBody>
      <h4>
        <Badge color="primary" pill>IPD</Badge>
        <Badge color="success" pill>Poliklinik</Badge>
        <Badge color="info" pill>RSCM</Badge>
        <Badge color="light">14 Nov 2020</Badge>
      </h4>
      </CardBody>
      <CardBody>
        Tn. X, 27 tahun <br/>
        DM tipe 2
      </CardBody>
    </Card>
  )
}

const SingleTableRow = function ({ data }) {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.stase}</td>
      <td>{data.tanggal}</td>
      <td>{data.lokasi}</td>
      <td>{data.identitas}</td>
      <td>{data.nrm}</td>
      <td>{data.diagnosis}</td>
      <td>{data.kegiatan}</td>
      <td>{data.created_at}</td>
    </tr>
  )
}

export default LogbookPage;
