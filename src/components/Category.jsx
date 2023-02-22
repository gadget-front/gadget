import axios from 'axios';
import React, { Suspense, lazy, useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardWrite from './BoardWrite';

import './Category.css';
import ErrorPage from './ErrorPage';
import { MainPage } from './MainPage';

const Group = lazy(() => import('./Group'));
const GroupMake = lazy(() => import(('./GroupMake')));
const MakeTodoContent = lazy(() => import('./MakeTodoContent'));
const TodoDetail = lazy(() => import('./TodoDetail'));
const TodoUpdate = lazy(() => import('./TodoUpdate'));
const Board = lazy(() => import('./Board'));
const Calender = lazy(() => import('./Calender'));
const BoardDetail = lazy(()=> import('./BoardDetail'));
const BoardModify = lazy(()=>import('./BoardModify'));
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
                <Route path='/board/:spaceid/list/:bcodeid' element={<Board />}/>
                <Route path= '/board/:spaceid/detail/:boardid' element={<BoardDetail />} />
                <Route path= '/board/:spaceid/modify/:boardid' element={<BoardModify />} />
                <Route path='/board/:spaceid/write/:bcodeid' element={<BoardWrite />}/>
                <Route path='/chatting' element={<Chatting />} />
                <Route path='/calender/:spaceid' element={<Calender />} />
                <Route path='/todo-update/:contentId' element={<TodoUpdate />} />
                <Route path='/group' element={<Group/>} /> 
                <Route path='/groupMake' element={<GroupMake/>}/>
                <Route path='/main' element={<MainPage/>} />
                <Route path='*' element={<ErrorPage/>} />
            </Routes>
        </Suspense>
    </div>
  )
}
