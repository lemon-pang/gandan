import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // ✅ URL에서 `id`를 가져오기 위해 `useParams` 추가
import axios from "axios";


const Detail = () => {
    const { id } = useParams(); // ✅ URL에서 `id` 값을 가져옴
    const [diary, setDiary] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/diarys.json");
                const data = response.data.diarys;

                // ✅ `id` 값을 기준으로 해당 다이어리 찾기
                const selectedDiary = data.find((item) => item.id === parseInt(id));

                if (selectedDiary) {
                    setDiary(selectedDiary);
                } else {
                    console.error("해당 ID의 일기를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };

        fetchData();
    }, [id]); // ✅ `id` 값이 변경될 때마다 실행

    if (!diary) {
        return <p>데이터를 불러오는 중...</p>;
    }

    return (
        <div className="diary-detail">
            <h1>{diary.title}</h1>
            <p><strong>작성자:</strong> {diary.user.name}</p>
            <p><strong>작성 날짜:</strong> {new Date(diary.diarydate).toLocaleDateString()}</p>
            <p>{diary.diarymemo}</p>
            <img src={diary.diaryphoto} alt="diary" className="diary-photo" />
            <p><b>댓글:</b> {diary.coment}</p>

            {/* ✅ 홈으로 돌아가기 버튼 */}
            <Link to="/">홈으로 돌아가기</Link>
        </div>
    );
};

export default Detail;