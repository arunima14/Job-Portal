import './App.css';
import React, { useState } from 'react';
import FetchJobs from './components/fetchJobs.jsx';
import { Container } from 'react-bootstrap';
import JobCard from './components/JobCard';
import JobPagination from './components/Pagination';
import SearchBar from './components/SearchBar';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = FetchJobs(params, page);

  const handleParamChange = (e) => {
  const param = e.target.name;
  const value = e.target.value;
  setPage(1);
  setParams( prevParams => {
    return { ...prevParams, [param]: value }
  })
}


  return (
    <Container className='my-4'>
    <h1 className='mb-4'> Job Portal</h1>
    <SearchBar params={params} handleParamChange={handleParamChange} />
    <JobPagination page={page} setPage={setPage} hasNextPage={true} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error, try refreshing!</h1>}
      {jobs.map(job => {
        return (
          <JobCard key={job.id} job={job} />
        )
      })}
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
