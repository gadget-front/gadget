import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import BoardDetail from './BoardDetail';

import './Category.css';
import { NoChice } from './NoChice';

const Board = lazy(() => import('./Board'));
const Calender = lazy(() => import('./Calender'));
const Chatting = lazy(() => import('./Chatting'));
const TodoList = lazy(() => import('./TodoList'));

export const Category = () => {
  return (
    <div className='catagory-area'>
        <Suspense fallback={<div>loading....</div>}>
            <Routes>          
                <Route path='/todo-list' element={<TodoList />}/>
                <Route path='/board' element={<Board />}/>
                <Route path='/board/:id' element={<BoardDetail />} />
                <Route path='/chatting' element={<Chatting />} />
                <Route path='/calender' element={<Calender />} />
                <Route path='*' element={<NoChice />} />
            </Routes>
        </Suspense>
    </div>
  )
}

