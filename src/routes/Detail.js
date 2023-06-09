/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';


import { Context1 } from './../App.js'
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";


// css 파일 안가도됨
let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

let Box = styled.div`
    background : grey;
    paddinf : 20px;
`


function Detail(props){
    let {재고} = useContext(Context1) // 보관함 해채해줌

    // 유저가 :id에 파라미터 입력한 겂을 가져옴
    let {id} = useParams();
    let 찾은상품 = props.shoes.find(x => x.id == id)
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [탭, 탭변경] = useState(0);
    let dispatch = useDispatch()



    useEffect(()=>{
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))
    }, [])

    // html 렌더링 후에 동작
    // 어려운 연산작업들, 서버에서 데이터 가져오는 작업, 타이머 장착하는거
    useEffect(()=>{
        let a = setTimeout(()=>{ setAlert(false) }, 2000)
        console.log(2)
        // useEffect 실행되기 전 
        return ()=>{
           // 기존 데이터(타이머 등) 제거해주세요~
           console.log(1)
           clearTimeout(a)
        }
    }, []) // [count]라는 state가 변할 때만 실행됨, []는 mount시 1회 코드실행

    return (
        <div className="container">
            {
                alert == true 
                ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                  </div>
                  : null
            }

            {count}
            <button onClick={()=> { setCount(count+1) }}>버튼</button>
            <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="orange">버튼</YellowBtn>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
                    }}>주문하기</button> 
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{ 탭변경(1) }}eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{ 탭변경(2) }}eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
            </Nav>   

            <TabContent 탭={탭}/>         
        </div> 
    )
}
function TabContent({탭}){
    // if(탭 == 0){
    //     return <div>내용0</div>
    // }
    // if(탭 == 1){
    //     return <div>내용1</div>
    // }
    // if(탭 == 2){
    //     return <div>내용2</div>
    // }
    // 탭 변경될때마다 안의 코드 실행

    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)
    useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 100)

        // return 가장 먼저
        return ()=>{
            setFade(' ')
        }
    }, [탭])
    return (<div className={'start ' + fade}>
        { [<div>{재고}</div>,<div>내용1</div>,<div>내용2</div>][탭] }
    </div>)
}


export default Detail;