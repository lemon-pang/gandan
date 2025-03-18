import Detail from './pages/Detail'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import DiaryEditor from './components/DiaryEditor'

function App() {


  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home />}  />
        <Route path="/diary/:id" element={<Detail />} /> {/* 상세 페이지 경로 추가 */}
        <Route path="/editor" element={<DiaryEditor />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
