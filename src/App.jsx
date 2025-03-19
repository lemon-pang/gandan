import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import DiaryEditor from './components/DiaryEditor';
import axios from 'axios';
import './App.css';


function App() {
    const [allDiaries, setAllDiaries] = useState([]); // ✅ 전체 일기 데이터

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get('/data/diarys.json');
                const data = response.data.diarys;
                setAllDiaries(data);
            };
            fetchData();
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
        }
    }, []);

    return (
        <div className='container'>
            <BrowserRouter>
                <Routes>
                    {/* ✅ `allDiaries`와 `setAllDiaries`를 Detail에 전달 */}
                    <Route path="/" element={<Home allDiaries={allDiaries} setAllDiaries={setAllDiaries} />} />
                    <Route path="/diary/:id" element={<Detail allDiaries={allDiaries} setAllDiaries={setAllDiaries} />} />
                    <Route path="/editor" element={<DiaryEditor setAllDiaries={setAllDiaries} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
