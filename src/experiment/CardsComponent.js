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
	nrm, diagnosis, kegiatan, tindakan } = item
	return (
	<Card>
		<CardBody className="p-0"> 
		<Row noGutters="true">
			<Col xs="5" className="bg-light p-1">
				<CardText className="small">{ tanggal }</CardText>
				<CardTitle className="text-center">{ stase }</CardTitle>
				<CardText className="px-1">
					<Badge color="info">{lokasi}</Badge> <br/>
					<Badge color="info">{wahana}</Badge>
				</CardText>
			</Col>
			<Col xs="7" >
				<CardText className="pt-1">{nama} ({gender == "pr" ? "Pr" : "Lk"}, {usia} {satuanusia})</CardText>
				<CardText>{diagnosis}</CardText>
				<CardText> {kegiatan == "tindakan" ? ("Tindakan: " + tindakan) : "Anamnesis/PF/Edukasi"}</CardText>
			</Col>
		</Row>
	</CardBody>
	</Card>
	)
}
