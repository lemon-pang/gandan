import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Home.css";

const Home = ({ allDiaries, setAllDiaries }) => { // ✅ setAllDiaries 추가
    const [diaryData, setDiaryData] = useState(allDiaries);
    const [nowDate, setNowDate] = useState(new Date());
    const navigate = useNavigate();

    const head_title = `${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`;

    const handleClickEditor = () => {
        navigate("/editor");
    };

    useEffect(() => {
        const firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime();
        const lastDay = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getTime();
        setDiaryData(
            allDiaries.filter((item) => new Date(item.diarydate) >= firstDay && new Date(item.diarydate) <= lastDay)
        );
    }, [nowDate, allDiaries]);

    // ✅ 삭제 함수 추가
    const handleDelete = (id) => {
        const updatedDiaries = diaryData.filter((diary) => diary.id !== id);
        setDiaryData(updatedDiaries); // ✅ 화면에서 즉시 반영
        setAllDiaries((prev) => prev.filter((diary) => diary.id !== id)); // ✅ 전체 데이터에서도 삭제
    };

    // ✅ 버튼 클릭 시 이전/다음 달 변경
    const handleClickDecreseMonth = () => {
        setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate()));
    };
    const handleClickIncreaseMonth = () => {
        setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()));
    };

    return (
        <>
            <div className="write-btn">
                <Button onClick={handleClickEditor} variant="outline-secondary">
                    글쓰기
                </Button>
            </div>
            <div className="diary-date">
                <button onClick={handleClickDecreseMonth}>이전달</button>
                {head_title}
                <button onClick={handleClickIncreaseMonth}>다음달</button>
            </div>

            {diaryData.length > 0 ? (
                diaryData.map((diary) => {
                    const date = new Date(diary.diarydate).toLocaleDateString();
                    return (
                        <div className="container">
                            <div key={diary.id} className="diarybox">
                                <Link to={`/diary/${diary.id}`} className="diary-link">
                                    <div className="photo-title">
                                        <div className="profile">
                                            <img src={diary.user.photo} alt="profile" />
                                            <p>{diary.user.name}</p>
                                        </div>
                                        <div>
                                            <div className="titleanddate">
                                                <h4>{diary.title.length > 10 ? diary.title.slice(0, 10) + "..." : diary.title}</h4>
                                                <p className="date-style">{date}</p>
                                            </div>
                                            <p className="small-title">
                                                {diary.diarymemo.length > 20 ? diary.diarymemo.slice(0, 20) + "..." : diary.diarymemo}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                {/* ✅ 삭제 버튼 추가 */}
                                <button className="exbtn" onClick={() => handleDelete(diary.id)}>x</button>
                            </div>
                        </div>    
                    );
                })
            ) : (
                <p>데이터가 없습니다.</p>
            )}
        </>
    );
};

export default Home;
