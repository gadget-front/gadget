import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { getTodoContent } from '../api/todosApi';

function TodoDetail() {
  const params = useParams();
  console.log(params.contentId);

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data, 
    } = useQuery(['todo', params.contentId], getTodoContent,
     {
        
     }
    )

  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <h2>{error}</h2>
  }

  if(isSuccess) {
    console.log(data.data);
  }

  return (
      <>
          <div keys={params.contentId}>
            {data.data.statename} <br/>
            {data.data.wdate} <br/>
            {data.data.title} <br/>
            {data.data.content} <br/>
            {data.data.startdate} <br/>
            {data.data.enddate} <br/>
          </div>
      </>
  )
}

export default TodoDetail