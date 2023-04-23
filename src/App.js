import { createContext, useEffect, useState } from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import axios from 'axios'
import { useQueries, useQuery } from 'react-query';

export let Context1 = createContext()

function App() {

  let obj = {name : 'kim'}
  // obj, array로 저장하려면 JSON 사용
  localStorage.setItem('data', JSON.stringify(obj))
  let 꺼낸거 = localStorage.getItem('data')
  
  console.log(JSON.parse(꺼낸거).name);

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  })

  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수

  // ajax 요청
  //  axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
  //    a.빈값
  //  })

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    }) 
  )
  useEffect(()=>{
    console.log('result',result.data);

  })
  
  // return (
  //   <div>
  //   {result.data}
  //   {result.isLoading}
  //   {result.arror}
  //   </div>
  // )

  
  return (
    <div className="App">

        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShopShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link> */}
      {/* <Link to="/detail">상세페이지</Link> */}
      {result.data && result.data.name}
      {result.isLoading && '로딩중'}
      {result.error && '에러남'}
      <Routes>
        <Route path="/" element={
          <>
                <div className="main-bg" /*style={{backgroundImage : 'url('+ bg +')'}}*/></div>
                <div className='container'>
                  <div className='row'>
                    {/* <Card shoes={shoes[0]} i={1}></Card>
                    <Card shoes={shoes[1]} i={2}></Card>
                    <Card shoes={shoes[2]} i={3}></Card> */}
                    {
                      shoes.map((a, i)=> {
                        return (
                          <Card shoes={shoes[i]} i={i}></Card>
                        )
                      })
                    }
                  </div>
                </div>
                <button onClick={()=> { 
                  // ajax 이용한 GET 요청
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((결과)=>{ 
                    console.log(결과.data) 
                    let copy = [...shoes, ...결과.data];
                    setShoes(copy);
                  })
                  .catch(()=>{
                    console.log('실패')
                  })
                  


                }}>더보기</button>
          </>      
        }/>
        <Route path="/detail/:id" element={
        <Context1.Provider value={{재고}}>
        <Detail shoes={shoes}/>
        </Context1.Provider>
        } />
        <Route path="/about" element={<About/>}>
        <Route path="member" element={<div>멤버임</div>}/>
        <Route path="location" element={<div>위치정보임</div>}/>
        </Route>

        <Route path="/event" element={<EventPage/>}>
        <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
        <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>


        <Route path="/cart" element={ <Cart/>}/>
        {/* 그 이외의 페이지(404표시를 위한)<Route path="*" element={<div>없는페이지요</div>}/>  */}
      </Routes>

    </div>
  );
}
function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function EventPage(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return (
    <div className='col-md-4'>
    <img src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width="80%"/>
    <h4> {props.shoes.title}</h4>
    <p>{props.shoes.price}</p>
  </div>
  )
}

export default App;
