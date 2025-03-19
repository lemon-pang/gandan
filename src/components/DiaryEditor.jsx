import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";  // ✅ 추가
import './DiaryEditor.css';


const DiaryEditor = ({ setAllDiaries }) => {
    const navigate = useNavigate();
    // 이미지 상태 관리
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 파일 선택 시 실행되는 함수
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // ✅ 사용자가 선택한 파일 가져오기
        if (file) {
            const reader = new FileReader(); // ✅ FileReader 생성
            reader.onloadend = () => {
                setImage(reader.result); // ✅ 파일을 읽은 후 상태에 저장
            };
            reader.readAsDataURL(file); // ✅ 파일을 읽어서 URL로 변환
        }
    };

    // 파일 초기화 (이미지 제거)
    const handleResetImage = () => {
        setImage(null); // ✅ 이미지 상태 초기화
    };

    //✨😃😃저장 버튼 클릭시 새로운 데이터추가.
    const handleSave = () => {
        if (!title || !content) {
            alert("제목과 내용을 입력하세요!");
            return;
        }

        const newDiary = {
            id: Date.now(), // 고유 ID 생성
            diarydate: new Date().toISOString(), //  현재 날짜
            title,
            diarymemo: content,
            diaryphoto: image, //  업로드된 이미지
            user: {
                name: "뽀블리", // 기본 사용자 
                photo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg48GxlSXF_4b4XZmtOALPhe3mD5iREyN-Ks6Q2hdviWeDHOcG_AUOS3nn2i-E9g5jD1_7-2o9PZF5MUQEanceM7b07viAr9M6h4C7jDqGhKdF0LzHzn2IBS_A2Fvpv605wIRf9ohIPiv-HStNDjk8JdN2hU-0GTI-OsjRraMo1HnGkTALf6v7qBbHufj04/s400/pose_galpeace_schoolgirl.png" // ✅ 기본 프로필 이미지
            }
        };

        setAllDiaries((prevDiaries) => [newDiary, ...prevDiaries]); // ✅ 기존 데이터 앞에 추가
        navigate("/"); // ✅ 저장 후 홈으로 이동
    };

    return (
        <div className="diarywrite">
            <div className="diarywrite-inner">
                <h2 className="writecss">일기 작성</h2>
                <div className="write-title">
                    <p className="diarytitlecss">제목</p>
                    <input type="text" placeholder="제목을 써주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="upload-container">
                    {/* ✅ 이미지 파일 업로드 */}
                    <div className="file-upload">
                        <label>사진 추가</label>
                        <input
                            type="file"
                            accept="image/*" // ✅ 이미지 파일만 선택 가능하도록 설정
                            onChange={handleImageChange} // ✅ 파일 선택 시 실행
                        />
                    </div>

                    {/* ✅ 이미지 미리보기 (이미지가 있으면 표시) */}
                    {image && (
                        <div className="preview-container">
                            <img
                                src={image}
                                alt="미리보기"
                            />
                            <p className="reset-btn"><button onClick={handleResetImage}>파일 초기화</button></p>
                        </div>
                    )}
                </div>
                <div className="write-content">
                    <p className="diarytitlecss">일기</p>
                    <textarea placeholder="일기를 작성해주세요" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="save-btn"><button onClick={handleSave}>저장</button></div>
                <div className="go-home"><Link to="/">홈으로 돌아가기</Link></div>
            </div>
        </div>
    );
};

export default DiaryEditor;
