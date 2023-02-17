import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { selectWorkSpace } from '../api/todosApi';
import './Group.css';
import MakeGroup from '../icon/MakeGroup.svg';

const Group = () => {

  const navigate = useNavigate();
  const [workSpace, SetWorkSpace] = useState([]);

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data, 
    } = useQuery(['workSpace', sessionStorage.getItem("userid")], selectWorkSpace,
      {
        onSuccess: data => SetWorkSpace(data.data)
      }
    )
  console.log(data);  

  useEffect(() => {

  }, [workSpace]);

  if(isLoading) {
    return <h3>loading...</h3>
  }
  return (
      <>
          <div className="group-container">
            <div className="group-area">
              <div className='group-header'>
                <h3>그룹 선택</h3>
                <img src={MakeGroup} alt="" onClick={ () => navigate("/groupMake")}/>
              </div>
              {workSpace && 
                workSpace?.map((space) => {
                return <div key={space.spaceid} className="group-room" onClick={ e => console.log(e)}> <h3>{space.spacename}</h3> <h4>그룹 인원 : {space.count}</h4></div>
                })
              }
            </div>
          </div>
      </>
    )
}

export default Group
