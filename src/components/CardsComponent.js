import React from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle,
		 Container, Row, Col, Badge } from 'reactstrap'


export const ResponsiveCardsComponent = (props) => {
	const { data } = props
  return (
    <Container className="d-block d-lg-none">
		  {data.map(item => <SingleCardComponent item={item} key={item.id} />)}
    </Container>
  )
}

const SingleCardComponent = ({ item }) => {
  const { id, stase, tanggal,
	lokasi, wahana,
	nama, gender, usia, satuanusia,
	nrm, diagnosis, kegiatan, tindakan, kode } = item
	return (
	<Card>
		<CardBody className="p-0"> 
		<Row noGutters>
			<Col xs="5" className="bg-light p-1">
				<CardText className="small text-center mb-2 mt-3">{ tanggal }</CardText>
				<CardTitle className="text-center">{ stase }</CardTitle>
				<CardText className="px-1 text-center">
					<Badge color="info">{lokasi}</Badge> <br/>
					<Badge color="info">{wahana}</Badge>
				</CardText>
			</Col>
			<Col xs="7" >
				<CardText className="pt-1 mb-1">
					<Badge className="small" secondary>Identitas:</Badge><br/>
					{nama} ({gender == "pr" ? "Pr" : "Lk"}, {usia} {satuanusia})
				</CardText>
				<CardText className="mb-1">
					<Badge className="small" secondary>Diagnosis:</Badge><br/><strong>{diagnosis}</strong>
				</CardText>
				<CardText> 
				{kegiatan == "tindakan" ?
						<>Tindakan:   { tindakan } <Badge color="warning" className="small text-wrap">{kode}</Badge></> 
					  : "Anamnesis/PF/Edukasi"}
				</CardText>
			</Col>
		</Row>
	</CardBody>
	</Card>
	)
}
