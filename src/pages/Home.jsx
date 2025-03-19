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
            <div className="home-top">
                <div className="diary-date">
                    <p className="btn-prev"><button onClick={handleClickDecreseMonth}>이전달</button></p>
                    <h2>{head_title}</h2>
                    <p className="btn-next"><button onClick={handleClickIncreaseMonth}>다음달</button></p>
                </div>
                <div className="write-btn">
                    <Button onClick={handleClickEditor} variant="outline-secondary">
                        글쓰기
                    </Button>
                </div>
            </div>
            <div className="diary-wrap">
                {diaryData.length > 0 ? (
                    diaryData.map((diary) => {
                        const date = new Date(diary.diarydate).toLocaleDateString();
                        return (
                            <div key={diary.id} className="diarybox">
                                <Link to={`/diary/${diary.id}`} className="diary-link">
                                    <div className="profile-date">
                                        <div className="profile">
                                            <p className="photo"><img src={diary.user.photo} alt="profile" /></p>
                                            <p className="name">{diary.user.name}</p>
                                        </div>
                                        <div className="date-style">{date}</div>
                                    </div>
                                    <div className="diary-list-photo">
                                        <img src={diary.diaryphoto} />
                                    </div>
                                    <div className="photo-title">
                                        <h3>{diary.title.length > 10 ? diary.title.slice(0, 10) + "..." : diary.title}</h3>
                                        <p className="small-title">
                                            {diary.diarymemo.length > 20 ? diary.diarymemo.slice(0, 20) + "..." : diary.diarymemo}
                                        </p>
                                    </div>
                                </Link>
                                {/* ✅ 삭제 버튼 추가 */}
                                <p className="exbtn"><button onClick={() => handleDelete(diary.id)}>x</button></p>
                            </div>
                        );
                    })
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>
        </>
    );
};

export default Home;
