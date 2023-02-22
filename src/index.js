import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRouter';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

  // document.cookie = "safeCookie1=foo; SameSite=Lax"; 
  // document.cookie = "safeCookie2=foo";  
  // document.cookie = "crossCookie=bar; SameSite=None; Secure";

  let persistor = persistStore(store);

root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId='500664645859-g132g5tgks2cvsvsph5q8rbuq0o8sivv.apps.googleusercontent.com'> 
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<div>loading....</div>}>
            <Routes>
              <Route path='/login' element={<Login />}/>
              {/* <Route path="/*" element={<PrivateRoute component={<App/>} authenticated={token}/>}/> */}
              <Route path="/*" element={<PrivateRoute component={<App/>}/>}/>
            </Routes>
          </Suspense>
        <ReactQueryDevtools initialIsOpen />
       </BrowserRouter>  
      </PersistGate>
    </Provider> 
    </QueryClientProvider>
  </GoogleOAuthProvider>
  // </React.StrictMode> 

);

/* <Suspense fallback={<div>loading....</div>}>
            <Routes>          
                <Route path='/todo-list' element={<TodoList />}/>
                <Route path="/todoList/:contentId" element={<TodoDetail/>} />
                <Route path="/makeTodo/:state" element={<MakeTodoContent/>} />
                <Route path='/board' element={<Board />}/>
                <Route path= {pathdetail} element={<BoardDetail />} />
                <Route path='/chatting' element={<Chatting />} />
                <Route path='/calender' element={<Calender />} />
                <Route path='*' element={<NoChice />} />
            </Routes>
        </Suspense> */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
