import { useParams } from "react-router-dom";
import styled from 'styled-components'

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
    
    // 유저가 :id에 파라미터 입력한 겂을 가져옴
    let {id} = useParams();
    return (
        <div className="container">
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
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}


export default Detail;