import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createWorkSpace } from '../api/todosApi';
import './GroupMake.css';

const GroupMake = () => {
  const creator = sessionStorage.getItem("userid");

  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchBar = useRef();
  const groupName = useRef();
  const [choiceUser, setChoiceUser] = useState([{username: sessionStorage.getItem("name"), userid: creator}]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/gadget/user/search")
          .then((usersList) => {setUsers(usersList.data); console.log(users);});
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/gadget/user/search");
        // setUsers(res.data);
        setUsers(res.data.filter(user => user.userid !== creator));
      } catch(e) {
        console.log(e);
      }
    } 
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(() =>
      users.filter((user) => user.username.toLowerCase().includes(searchField.toLowerCase())
      )
    );
    console.log(searchBar.current.value);
  }, [searchField, users, choiceUser]);

  const addUser = (user) => {
    console.log(user)
    setSearchField("");
    searchBar.current.value = ""
    setChoiceUser([...choiceUser, user]);
  }

  const submit = () => {
    createWorkSpaceMutation.mutate({ userid : choiceUser.map(user => user.userid).toString(), spacename : groupName.current.value});      
  }

  const createWorkSpaceMutation = useMutation(createWorkSpace, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        navigate('/group');
    }
  })

  return (
      <div className="create-group">
        <div className="create-group-info">
          <div className="group-title">
            <h3>그룹생성</h3>
          </div>
          <div className="group-info">
            <label>그룹명</label>
            <input type="text" placeholder='그룹명' className="border" ref={groupName}></input>
          </div>
          <div className="group-info">
            <label>초대인원</label>
            <input
            type="search"
            placeholder="초대인원"
            onChange={(e) => {console.log(e.target.value); setSearchField(e.target.value)}}
            ref={searchBar}
            className="border"
            ></input>
            {searchField && 
            // Users users={filteredUsers} setSearchField={setSearchField} />
            <div className="search-area">
            {filteredUsers.map((user) => {
              return  <div className="search-user" key={user.userid} onClick={() => addUser(user)}>
                        <img className="profile-min" src={user.imgurl} alt=""/>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                      </div>
                  }
            )}
            </div>
          }
          </div>
          {/* <Users users={filteredUsers} /> */}
          <div>
            <ul className="add-user">
              {choiceUser.map((user) => {
                  return <li key={user.userid}>{user.username}</li>
              })}
            </ul>
          </div>
          <div className="group-btn">
            <button onClick={submit}>완료</button>
            <button onClick={() => navigate('/group')}>취소</button>
          </div>
        </div>
      </div>
  )
}

export default GroupMake