import React from 'react'
import { Card, CardBody, CardHeader, CardText,
		 Container, Badge } from 'reactstrap'


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
		  <CardBody>
		  <Badge color="primary" >{stase}</Badge>
		  <Badge color="success" >{lokasi}</Badge>
		  <Badge color="info" >{wahana}</Badge>
		  <Badge color="light">{tanggal}</Badge>
		  <CardText>
				{nama} ({gender == "pr" ? "Pr" : "Lk"}, {usia} {satuanusia})
				 <br/>
				  {diagnosis}
				  <br/>
				  {kegiatan == "tindakan" ? ("Tindakan: " + tindakan) : "Anamnesis/PF/Edukasi"}
		  </CardText>
      </CardBody>
    </Card>
  )
}
