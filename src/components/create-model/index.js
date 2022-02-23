import React, { useRef, useState } from 'react'
import { Col, Container, FloatingLabel, Form, FormText, Row, Button, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addModel } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import './styles.css'

const CreateModel = () => {
    const [dateFrom, setDateFrom] = useState(() => new Date())
    const [dateTo, setDateTo] = useState(() => new Date())
    const [mediaFile, setMediaFile] = useState('')
    const ref = useRef();
    const dispatch = useDispatch();
    // const param = useParams();
    // const {state} = useLocation();
    const [srcBlob,setSrcBlob] = useState(null);
    const navigate = useNavigate();

    const fileHandler = (file) =>{
        if(!file) {
            setMediaFile('');
            return;
        }
        setMediaFile(file)
        setSrcBlob(URL.createObjectURL(file))
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        addModel(dispatch, {
            id: uuidv4(),
            image: mediaFile.type.slice(0,5) === 'image'? srcBlob: null,
            video: mediaFile.type.slice(0,5) === 'video'? srcBlob: null,
            from_time: dateFrom.toLocaleString(),
            to_time: dateTo.toLocaleString()
        })
        ref.current.value = null
        setMediaFile('')
        setSrcBlob('')
        navigate('/')
    }

    return (
    <Container>
     <Row xs={1} md={2} lg={4} className="justify-content-md-center">
        <Col>
        <Card>
        {mediaFile&&mediaFile.type.slice(0,5) === 'image'?
            <Card.Img className="img-thumbnail"  src={srcBlob} />:
            srcBlob&&<video 
            controls className="img-thumbnail"
            src={srcBlob} />
        }
    </Card><br/><br/>
    </Col>
    </Row>
    <Form onSubmit={submitHandler}>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2" >
        FROM
        </Form.Label>
        <Col sm="10">
        <DatePicker
            className="form-control"
            selected={dateFrom}
            value={dateFrom}
            placeholderText="Enter the Date"
            onChange={(d)=>setDateFrom(d)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"/>
        </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        TO
        </Form.Label>
        <Col sm="10">
        <DatePicker
            className="form-control"
            selected={dateTo}
            value={dateTo}
            placeholderText="Enter the Date"
            onChange={(d)=>setDateTo(d)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"/>
        </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="formFile" className="mb-3">
        <Form.Label column sm="2">
            UPLOAD MEDIA
        </Form.Label>
        <Col sm="10">
            <Form.Control type="file" ref={ref}
                onChange={(e)=>fileHandler(e.target.files[0] || null)} size="lg" 
                accept="image/*, video/*"/>
        </Col>
    </Form.Group>
    <Row>
    <Col sm="2"></Col>
    <Col sm="10" className="d-grid">
    <Button variant="primary" type="submit"  size="lg">
        Submit
    </Button>
    </Col>
    </Row>
    </Form>
    </Container>
    )
}

export default CreateModel