import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detail.css";

const Detail = ({ allDiaries, setAllDiaries }) => {
    const { id } = useParams();
    const [diary, setDiary] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [editedImage, setEditedImage] = useState("");

    useEffect(() => {
        const selectedDiary = allDiaries.find((item) => item.id === parseInt(id));

        if (selectedDiary) {
            setDiary(selectedDiary);
            setEditedText(selectedDiary.diarymemo);
            setEditedImage(selectedDiary.diaryphoto);
            setComments(selectedDiary.comments || (selectedDiary.coment ? [selectedDiary.coment] : []));
        }
    }, [id, allDiaries]);

    if (!diary) {
        return <p>데이터를 불러오는 중...</p>;
    }

    // ✅ "수정하기" 버튼 클릭 시 편집 모드 활성화
    const handleEdit = () => {
        setIsEditing(true);
    };

    // ✅ 파일 선택 시 이미지 미리보기 변경
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ "저장" 버튼 클릭 시 데이터 업데이트
    const handleSaveEdit = () => {
        const updatedDiary = {
            ...diary,
            diarymemo: editedText,
            diaryphoto: editedImage,
        };

        setAllDiaries((prevDiaries) =>
            prevDiaries.map((item) =>
                item.id === parseInt(id) ? updatedDiary : item
            )
        );

        setDiary(updatedDiary);
        setIsEditing(false);
    };

    // ✅ "댓글 등록" 버튼 클릭 시 실행되는 함수
    const handleCommentSubmit = () => {
        if (comment.trim() === "") return; // ✅ 빈 댓글 방지

        console.log("입력된 댓글: ", comment); // ✅ 콘솔에서 확인

        const newComment = {
            id: Date.now(),
            text: comment,
        };

        const updatedComments = [...comments, newComment.text]; // ✅ 기존 댓글 + 새 댓글 추가
        setComments(updatedComments);
        setComment("");

        // ✅ 전체 데이터 업데이트하여 댓글 유지
        setAllDiaries((prevDiaries) =>
            prevDiaries.map((item) =>
                item.id === parseInt(id) ? { ...item, comments: updatedComments } : item
            )
        );
    };

    return (
        <div className="diary-detail">
            <div className="detail-inner">
                <h1 className="titlecss">{diary.title}</h1>
                <div className="diary-info">
                    <div className="info">
                        <p><strong>작성자:</strong> {diary.user.name}</p>
                        <p><strong>작성 날짜:</strong> {new Date(diary.diarydate).toLocaleDateString()}</p>
                    </div>

                    {/* ✅ 수정 버튼 (편집 모드 전환) */}
                    {!isEditing ? (
                        <button onClick={handleEdit}>수정하기</button>
                    ) : (
                        <button onClick={handleSaveEdit}>저장</button>
                    )}
                </div>
                <div className="diary-photo">
                    {/* ✅ 사진 수정 */}
                    {isEditing ? (
                        <>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            {editedImage && <img src={editedImage} alt="미리보기" />}
                        </>
                    ) : (
                        diary.diaryphoto && <img src={diary.diaryphoto} alt="diary" />
                    )}
                </div>
                <div className="diarymemo">
                    {/* ✅ 글 수정 */}
                    {isEditing ? (
                        <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="edit-textarea"
                        />
                    ) : (
                        <p>{diary.diarymemo}</p>
                    )}
                </div>

                {/* ✅ 댓글 리스트 */}
                <h3 className="comment-title">댓글</h3>
                <ul className="comment-list">
                    {comments.length > 0 ? (
                        comments.map((cmt, index) => <li key={index}>
                            <p className="cmt">{cmt}</p>
                        </li>)
                    ) : (
                        <li>댓글 없음</li>
                    )}
                </ul>

                {/* ✅ 댓글 입력 */}
                <div className="coment">
                    <input
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {/* ✅ onClick 추가해서 댓글 저장 가능하게 변경 */}
                    <button onClick={handleCommentSubmit}>등록</button>
                </div>

                {/* ✅ 홈으로 돌아가기 */}
                <div className="go-home"><Link to="/">홈으로 돌아가기</Link></div>
            </div>

        </div>
    );
};

export default Detail;
