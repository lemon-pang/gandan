import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Home.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Home = () => {

    const [diaryData, setDiaryData] = useState([]);

    const [nowDate, setNowDate] = useState(new Date());
    const head_title = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;


    const navigte = useNavigate();

    const handleClickEditor = () => {
        navigte('/editor')
    };


    useEffect(() => {
        try {
            const fetchData = async () => {
                const reponse = await axios.get('/data/diarys.json');
                const data = reponse.data.diarys;
                //달별로 데이터 노출시키는 함수 넣는자리 
                //해당달의 처음날짜부터~ 마지막날짜를 계산해서 ..
                const firstDay = new Date(
                    nowDate.getFullYear(), nowDate.getMonth(), 1
                ).getTime();
                const lastDay = new Date(
                    nowDate.getFullYear(), nowDate.getMonth() + 1, 0
                ).getTime();
                setDiaryData(
                    data.filter((item) => new Date(item.diarydate) >= firstDay && new Date(item.diarydate) <= lastDay)
                )
            }
            fetchData();
        } catch (errror) {
            console.error('제품 데이터 로딩 실패 : ', errror);
        }
    }, [diaryData, nowDate]);


    // 버튼누르면 전달, 다음달로 가는 함수
    const handleClickDecreseMonth = () => {
        setNowDate(
            new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate())

        );
    };
    const handleClickIncreaseMonth = () => {
        setNowDate(
            new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate())
        );
    };


    return (
        <>  
            <div className="write-btn"><Button onClick={handleClickEditor} variant="outline-secondary">글쓰기</Button></div>
            <div className="diary-date">
                <button onClick={handleClickDecreseMonth}>이전달</button>
                {head_title}
                <button onClick={handleClickIncreaseMonth}>다음달</button>
            </div>
            
            {/* <button onClick={handleClickEditor}>글쓰기</button> */}
            {diaryData.length > 0 ? (
                diaryData.map((diary, index) => {
                    const date = new Date(diary.diarydate).toLocaleDateString();
                    return (
                        <Link to={`/diary/${diary.id}`} className="diary-link">
                            <div key={index} className="diarybox">
                                <div className="photo-title">
                                    <div className="profile">
                                        <img src={diary.user.photo} />
                                        <p>{diary.user.name}</p>
                                    </div>
                                    <div>
                                        <div className="titleanddate">
                                            <h1>{diary.title}</h1>
                                            <p className="date-style">{date}</p>
                                        </div>
                                        <p className="small-title">{diary.diarymemo.length > 20 ? diary.diarymemo.slice(0, 20) + "..." : diary.diarymemo}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </Link>         
                    )
                })
            ) : (
                <p>데이터가 없습니다.</p>
            )}


        </>
    )
}

export default Home;