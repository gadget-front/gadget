import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom";
import { getTodos, addTodo, updateTodo, deleteTodo, getOrders, updateOrder } from "../api/todosApi";
import PlusBtn from "../icon/PlusBtn.svg";
import "./TodoList.css";
import moment from 'moment';
import 'moment/locale/ko';
import StartDate from '../icon/StartDateMin.svg';
import EedDate from '../icon/EndDateMin.svg';

const  TodoList = () => {
 
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      console.log("source.droppableId : " + source.droppableId);
      console.log("destination.droppableId : " + destination.droppableId);
      console.log("source.index : " + source.index);
      console.log("destination.index : " + destination.index);
      console.log("destColumn : " + JSON.stringify(destColumn));
      console.log("sourceColumn : " + JSON.stringify(sourceColumn)); 
      console.log("destItems : " +  JSON.stringify(destItems));
      console.log("sourceItems : " +  JSON.stringify(sourceItems));

      console.log("sourceColumn.items[source.index].contentid : " + sourceColumn.items[source.index].contentid);
      console.log("destColumn.name : " + destColumn.name);

      console.log(sourceColumn.name, sourceItems.map(item => item.contentid).toString());
      console.log(destColumn.name, destItems.map(item => item.contentid));


      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });

    console.log(destColumn.name);
    console.log(sourceColumn.items[source.index].contentid);
    
    let statename = destColumn.name;
    const contentid = sourceColumn.items[source.index].contentid;
    updateTodoMutation.mutate({statename, contentid});

    const spaceid = 1;
    statename = sourceColumn.name;
    let stateindex = sourceItems.map(item => item.contentid);

    updateOrderMutation.mutate({spaceid, statename, stateindex});

    statename = destColumn.name;
    stateindex = destItems.map(item => item.contentid);
    updateOrderMutation.mutate({spaceid, statename, stateindex});
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  // const {
  //   isSuccess : orderIsSuccess,
  //   isLoading : orderIsLoaing,
  //   isError : orderIsError,
  //   error : orderError,
  //   data : orderData, 
  //   } = useQuery(['order', 1], getOrders,
  //   {
  //     // onSuccess: (orderData) => {
  //     //   console.log('firstQueryData', orderData[0].stateindex.split(","));
  //     //   let test =orderData[0].stateindex.split(",");
  //     //   console.log( typeof parseInt(test.toString()) );
  //     // },
  //     select : (orderData) => {
  //       return orderData.map(order => order.stateindex.split(","))
  //     }
  //   }
  // )

  // if(orderIsSuccess) {
  //   console.log(typeof +orderData[0][0]);
  // }

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data, 
    } = useQuery('todos', getTodos,
     {
        // enabled : !!orderData,
        onSuccess: data => data.map((item, _index) => {
          return (
            item.statename === "진행 예정" 
            ? taskStatus.requested.items.push(item)
            : item.statename === "진행 중"
            ? taskStatus.toDo.items.push(item)
            : item.statename === "완료"
            ? taskStatus.inProgress.items.push(item)
            : taskStatus.done.items.push(item)
          )
        }),
        // select : (data) => {
        //   const taskStatus = {
        //     requested: {
        //       name: "진행 예정",
        //       items: []
        //     },
        //     toDo: {
        //       name: "진행 중",
        //       items: []
        //     },
        //     inProgress: {
        //       name: "완료",
        //       items: []
        //     },
        //     done: {
        //       name: "삭제",
        //       items: []
        //     }
        //   }

        //   data.map((item, _index) => {
        //     return (
        //       item.statename === "진행 예정" 
        //       ? taskStatus.requested.items.push(item)
        //       : item.statename === "진행 중"
        //       ? taskStatus.toDo.items.push(item)
        //       : item.statename === "완료"
        //       ? taskStatus.inProgress.items.push(item)
        //       : taskStatus.done.items.push(item)
        //     )
        //   })
 
        //   return taskStatus;
    
        // }
      }
    )

    const taskStatus = {
      requested: {
        name: "진행 예정",
        items: []
      },
      toDo: {
        name: "진행 중",
        items: []
      },
      inProgress: {
        name: "완료",
        items: []
      },
      done: {
        name: "삭제",
        items: []
      }
    };

  const [columns, setColumns] = useState(taskStatus || {});

  // const [title, setTitle] = useState("");
  // const statename = useRef();

  // function handleChange(e) {
  //   console.log(e.target);
  //   // setTitle(e);
  // }


  // function onSubmit(e) {
  //   e.preventDefault();
  //   console.log({
  //     statename: e.target[0].value,
  //     title: title,
  //   });
  //   setTitle("");
  // }


  // if(isSuccess) {
  //   setColumns( (pre) => {
  //     return {...pre, 
  //       [taskStatus.requested] :  {
  //         items: taskStatus.requested.items
  //     }
  //   }
  //   });
  // }
    
  // const addTodoMutation = useMutation(addTodo, {
  //   onSuccess: () => {
  //       // Invalidates cache and refetch 
  //       queryClient.invalidateQueries("todos")
  //     }
  // })

  const updateTodoMutation = useMutation(updateTodo, {
      onSuccess: () => {
          // Invalidates cache and refetch 
          queryClient.invalidateQueries("todos")
      }
  })

  const updateOrderMutation = useMutation(updateOrder, {
      onSuccess: () => {
          // Invalidates cache and refetch 
          queryClient.invalidateQueries("todos")
          console.log("updateOrder sucess!")
      }
  })

  // const deleteTodoMutation = useMutation(deleteTodo, {
  //     onSuccess: () => {
  //         // Invalidates cache and refetch 
  //         queryClient.invalidateQueries("todos")
  //     }
  // })

  if (isLoading) { return <h2>Loading...</h2> } 
  if (isError) { return <h2>{error.message}</h2> }

  const detailPage = function (contentid) {
    // console.log(`이벤트 발생 ${event.target.childNodes[0].data}`);
    // navigate(`/todoList/${event.target.childNodes[0].data}`);
    navigate(`/todoList/${contentid}`);
  }

  const addTodo = function(state) {
    navigate(`/makeTodo/${state}`);   
  }

  return (
    <div className="todo">
      <h1 style={{ textAlign: "center" }}>할 일</h1>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        {isSuccess && <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            console.log(columnId);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  {/* <form onSubmit={onSubmit}>
                    <input ref={statename} type="hidden" value={column.name}/>
                    <input ref={title} type="text" value={title} onChange={handleChange} placeholder="제목을 입력하세요"/>
                    <button type="submit">Submit</button>
                  </form> */}
                 
                  <div className="plus-btn-container" onClick={() => addTodo(column.name)}><img className="plus-btn" src={PlusBtn} alt="이미지 없음" /></div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                           //   ? "lightblue"
                              ? "#E3F2FD"
                              : "rgba(217, 217, 217, 0.24)",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.contentid}
                                draggableId={item.contentid.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      onDoubleClick={() => detailPage(item.contentid)}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        height: "11.688rem",
                                        backgroundColor: snapshot.isDragging
                                          //? "#263B4A"
                                          ? "#b3d7fa"
                                          : "#fff",
                                        // color: "white",
                                        borderRadius: "5px",
                                        border: "solid 1px #d9d9d9",
                                        overflow: "auto",
                                        ...provided.draggableProps.style
                                      }}
                                      className="todo-list"
                                    >
                                      <div className="todo-ago">
                                        <p>{item.contentid}</p> 
                                        <p>{moment(item.wdate, "YYYY-MM-DD HH:mm:ss").fromNow()}</p>
                                      </div>
                                      <h3 className="todo-title">{item.title}</h3>
                                      {item.content} <br/>
                                      <div className="todo-date">
                                        <img src={StartDate} alt="이미지 없음"/>
                                        <p>{new Date(item.startdate).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long", timeZone: "UTC" })}</p>
                                      </div>
                                      <div className="todo-date">
                                         <img src={EedDate} alt="이미지 없음"/>
                                         {new Date(item.enddate).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long", timeZone: "UTC" })}
                                      </div>

                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      }
      </div>
    </div>
    );
}

export default TodoList;
