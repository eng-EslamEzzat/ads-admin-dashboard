import React from 'react'
import { useDispatch } from 'react-redux';
import {

} from 'bootstrap';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { removeModel } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const AdsModels = () => {
  const {adsModels} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (model) =>{
    removeModel(dispatch, model)
  }
  const updateHandler = (id) =>{
    navigate(`/create/${id}`)
  }
  return (
    <>
        <Container style={{margin:"10vh auto"}}>
        <Row xs={1} md={2} lg={4} className="g-4">
        {adsModels.map((model, idx) => (
        <Col key={model.id}>
            <Card>
                {model.image?
                  <Card.Img variant="top" src={model.image} />:
                  <video 
                  controls 
                  src={model.video} />
                }
                <Card.Body>
                <Card.Title>Ads Model #{idx}</Card.Title>
                <Card.Text>
                    From: {model.from_time}, <br/>
                    To: {model.to_time}
                </Card.Text>

                <Button variant="warning" onClick={()=>updateHandler(model.id)}>Update</Button>{' '}
                <Button variant="danger" onClick={()=>deleteHandler(model)}>Delete</Button>
                </Card.Body>
            </Card>
        </Col>
        ))}
        </Row>
        </Container>
    </>
  )
}

export default AdsModels