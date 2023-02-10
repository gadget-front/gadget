// import React from 'react'
// import { getTodos } from "../api/todosApi";
// import { useQuery, useMutation, useQueryClient } from "react-query"

// const taskStatus = {
//   requested: {
//     name: "진행 예정",
//     items: []
//   },
//   toDo: {
//     name: "진행 중",
//     items: []
//   },
//   inProgress: {
//     name: "완료",
//     items: []
//   },
//   done: {
//     name: "삭제",
//     items: []
//   }
// };

// const {
//   isSuccess,
//   isLoading,
//   isError,
//   error,
//   data, 
//   } = useQuery('todos', getTodos,
//    {
//       onSuccess: data => data.map((item, _index) => {
//         return (
//           item.statename === "진행 예정" 
//           ? taskStatus.requested.items.push(item)
//           : item.statename === "진행 중"
//           ? taskStatus.toDo.items.push(item)
//           : item.statename === "완료"
//           ? taskStatus.inProgress.items.push(item)
//           : taskStatus.done.items.push(item)
//         )
//       })
//     }
//   )
