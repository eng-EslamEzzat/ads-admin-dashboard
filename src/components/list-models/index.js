import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeModel } from '../../redux/actions';
import './styles.css'

// another view for list ads models
const ListModels = () => {
    // get all ads models to render them 
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
    <Container>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Screen Media</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Oprations</th>
                </tr>
            </thead>
            <tbody>
            {
                adsModels&& adsModels.map(model=>(
                    <tr key={model.id}>
                    <td>{model.id.slice(0,8)}</td>
                    <td>
                    <Row>
                    <Col>
                    {model.image?
                        <img variant="top" width="20%"
                        src={model.image} alt="ads screen"/>:
                        <video 
                        controls width="20%"
                        src={model.video} />
                        }
                    </Col>
                    </Row>
                    </td>
                    <td>{model.from_time}</td>
                    <td>{model.to_time}</td>
                    <td>
                    <div className="d-grid gap-3">
                    <Button variant="warning" onClick={()=>updateHandler(model.id)}>Update</Button>{' '}
                    <Button variant="danger" onClick={()=>deleteHandler(model)}>Delete</Button>
                    </div>
                    </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
        <div className="d-grid">
        <Button  variant="dark" size="lg" onClick={()=>navigate('/create')}>ADD NEW MODEL</Button>
        </div>
    </Container>
    )
}

export default ListModels