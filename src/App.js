import { useState } from 'react';
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';

function App() {

  let [shoes] = useState(data)
  let navigate = useNavigate(); // 페이지 이동을 도와주는 함수
  return (
    <div className="App">

        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShopShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link> */}
      {/* <Link to="/detail">상세페이지</Link> */}

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
          </>      
        }/>
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/about" element={<About/>}>
        <Route path="member" element={<div>멤버임</div>}/>
        <Route path="location" element={<div>위치정보임</div>}/>
        </Route>

        <Route path="/event" element={<EventPage/>}>
        <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
        <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>

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
