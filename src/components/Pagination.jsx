import React from 'react'
import { Pagination } from 'react-bootstrap'

const JobPagination = ({ page, setPage, hasNextPage}) => {
  return (
    <Pagination>
        {page !== 1 && <Pagination.Prev onClick={()=>setPage(page - 1)}/> }
        {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
        {page > 2 && <Pagination.Ellipsis />}
        {page > 2 && <Pagination.Item>{ page-1 }</Pagination.Item>}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasNextPage && <Pagination.Item>{ page+1 }</Pagination.Item>}
        {hasNextPage &&<Pagination.Next onClick={()=>setPage(page+1)}/> }
    </Pagination>
  )
}

export default JobPagination