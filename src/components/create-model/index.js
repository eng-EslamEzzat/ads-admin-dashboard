import React, { useRef, useState } from 'react'
import { Col, Container, Form, Row, Button, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addModel, updateModel } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import './styles.css'

const CreateModel = () => {
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null)
    const [mediaFile, setMediaFile] = useState('')
    const [srcBlob,setSrcBlob] = useState(null);
    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // variables for udating 
    const param = useParams();
    const {adsModels} = useSelector(state => state);
    // if there is model so there is param so the user want to update an model
    const [[model]] = useState(()=>adsModels.filter(model=>model.id === param.id)||null)    

    // when selected an file from the device
    const fileHandler = (file) =>{
        // if there is not file return nothing
        if(!file) {
            setMediaFile('');
            return;
        }
        // else: set mediafile hook as the file 
        setMediaFile(file)
        // conver the file into blob and and declared srcblob hook by it 
        setSrcBlob(URL.createObjectURL(file))
    }

    // when submit after creating a new model
    const submitHandler = (e) =>{
        // for no refreshing after submit 
        e.preventDefault();

        // for handling any errors while submiting
        try{
            addModel(dispatch, {
                // create an id for the model using uuid
                id: uuidv4(),
                image: mediaFile.type.slice(0,5) === 'image'? srcBlob: null,
                video: mediaFile.type.slice(0,5) === 'video'? srcBlob: null,
                from_time: dateFrom.toLocaleString(),
                to_time: dateTo.toLocaleString()
            })
        }
        catch(err){
            alert("error: you seems you forgot to fill an input")
            console.log(err)
        }

        // clearing file inputs after submit
        ref.current.value = null
        setDateFrom(null)
        setDateTo(null)
        setMediaFile('')
        setSrcBlob('')
        navigate('/')
    }

    // when submit after updating existing model
    const updateHandler = (e) =>{
        e.preventDefault();
        try{
            updateModel(dispatch, {
                id: param.id,
                image: mediaFile.type.slice(0,5) === 'image'? srcBlob: null,
                video: mediaFile.type.slice(0,5) === 'video'? srcBlob: null,
                from_time: dateFrom.toLocaleString(),
                to_time: dateTo.toLocaleString()
            })
        }
        catch(err){
            alert("error: you seems you forgot to fill an input")
            console.log(err)
        }
        ref.current.value = null
        setDateFrom(null)
        setDateTo(null)
        setMediaFile('')
        setSrcBlob('')
        navigate('/')
    }

    // if user wants to update an existing model    
    if(model){
        return (
            <Container>
            <Row xs={1} md={2} lg={4} className="justify-content-md-center">
                <Col>
                <Card>
                {srcBlob?<>
                    {mediaFile&&mediaFile.type.slice(0,5) === 'image'?
                        <Card.Img className="img-thumbnail"  src={srcBlob} />:
                        srcBlob&&<video 
                        controls className="img-thumbnail"
                        src={srcBlob} />
                    }
                </>:
                <>
                {model.image?
                  <Card.Img variant="top" className="img-thumbnail" 
                  src={model.image} />:
                  <video controls className="img-thumbnail"
                  src={model.video} />
                }
                </>}
            </Card><br/><br/>
            </Col>
            </Row>
            <Form onSubmit={updateHandler}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2" >
                FROM
                </Form.Label>
                <Col sm="10">
                {/* use datePicker to handel date and time */}
                <DatePicker
                    className="form-control"
                    selected={dateFrom || new Date(model.from_time)}
                    value={dateFrom || new Date(model.from_time)}
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
                    selected={dateTo || new Date(model.to_time)}
                    value={dateTo || new Date(model.to_time)}
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
                    {/* use ref to remove the value of input after submit */}
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