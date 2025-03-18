import { useState } from "react";
import { Link } from "react-router-dom";

const DiaryEditor = () => {
    // 이미지 상태 관리
    const [image, setImage] = useState(null);

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

    return (
        <div>
            <h2>일기 작성</h2>
            제목<input type="text" /> <br />

            {/* ✅ 이미지 파일 업로드 */}
            <label>사진 추가</label>
            <input 
                type="file"
                accept="image/*" // ✅ 이미지 파일만 선택 가능하도록 설정
                onChange={handleImageChange} // ✅ 파일 선택 시 실행
            />
            <br />

            {/* ✅ 이미지 미리보기 (이미지가 있으면 표시) */}
            {image && (
                <div>
                    <p>미리보기</p>
                    <img 
                        src={image} 
                        alt="미리보기" 
                        style={{ width: "200px", height: "auto", marginTop: "10px" }} 
                    />
                    <br />
                    <button onClick={handleResetImage}>파일 초기화</button>
                </div>
            )}

            <textarea placeholder="일기를 작성해주세요"/>
            <Link to="/">홈으로 돌아가기</Link>
        </div>
    );
};

export default DiaryEditor;
