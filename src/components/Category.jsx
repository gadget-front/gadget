import axios from 'axios';
import React, { Suspense, lazy, useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardDetail from './BoardDetail';

import './Category.css';
import MakeTodoContent from './MakeTodoContent';
import { NoChice } from './NoChice';
import TodoDetail from './TodoDetail';
import TodoUpdate from './TodoUpdate';

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
                <Route path="/todoList/:contentId" element={<TodoDetail/>} />
                <Route path="/makeTodo/:state" element={<MakeTodoContent/>} />
                <Route path='/gadget/board/:bcodeid' element={<Board />}/>
                <Route path= '/gadget/board/:spaceid/detail/:boardid' element={<BoardDetail />} />
                <Route path='/chatting' element={<Chatting />} />
                <Route path='/calender' element={<Calender />} />
                <Route path='/todo-update/:contentId' element={<TodoUpdate />} />
                <Route path='*' element={<NoChice />} />
            </Routes>
        </Suspense>
    </div>
  )
}
