import React from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FetchJobs from './fetchJobs';

// const handleSearch = () => {
//     const { jobs, loading, error, hasNextPage } = FetchJobs(params, page);
//   };

const SearchBar = ({ params, onParamChange}) => {
  return (
    <Form className='mb-4'>
        <Row className='align-items-end'>
            <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={onParamChange} value={params.text} name='description' type='text' />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Location</Form.Label>
                <Form.Control onChange={onParamChange} value={params.location} name='location' type='text' />
            </Form.Group>

            <Form.Group as={Col} xs='auto' className='ml-2'>
                <Form.Check onChange={onParamChange} value={params.employment_type} name='employment_type' id='employment_type' label='Only fulltime' type='checkbox'  className='mb-2'/>
            </Form.Group>

            {/* <Form.Group as={Col}>
                <Button variant="primary" onClick={()=> {handleSearch}}>Update Search</Button>
            </Form.Group> */}
        </Row>
    </Form>
  )
}

export default SearchBar