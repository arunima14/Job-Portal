import React, { useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

const JobCard = ({ job }) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <Card className='mb-3'>
    <Card.Body>
        <div className='d-flex justify-content-between'>
            <div>
                <Card.Title>
                    {job.role} - <span className='text-muted font-weight-light'> {job.company_name}</span>
                </Card.Title>
                <Card.Subtitle className='text-muted mb-2'>
                    {new Date(job.date_posted).toLocaleDateString()}
                </Card.Subtitle>
                <Badge variant='secondary' className='ms-2'> {job.employment_type} </Badge>
                <Badge variant='secondary' className='ms-2'> {job.location} </Badge>
            </div>
            {/* <img src={job.logo} alt={job.company_name} className='d-none d-md-block' height='50' /> */}
        </div>

        <Card.Text>
            <Button 
                variant='primary' className='me-2'
                onClick={() => setDetailsOpen(!detailsOpen)} >
                    {detailsOpen ? 'Hide Details' : 'View Details'}
                </Button>
                <Button variant='primary' className='me-2' onClick={() => window.open(job.url, '_blank') } >Apply now</Button>
        </Card.Text>       
        <Collapse in={detailsOpen}>
            <div className='mt-4' >
                <ReactMarkdown children={job.text} />
            </div>
        </Collapse>
    </Card.Body>
    </Card>
  )
}

export default JobCard