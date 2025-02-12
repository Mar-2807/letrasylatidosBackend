import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import WelcomePage from './pages/WelcomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RegisterTeachersPage from './pages/RegisterTeachersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LoginTeachersPage from './pages/LoginTeachersPage.jsx'
import ForosPage from './pages/ForosPage.jsx';
import ForosFormPage from './pages/ForosFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HomePage from './pages/HomePage.jsx';
import ForoPage from './pages/ForoPage.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import { ForoProvider } from './context/ForosContext.jsx';

import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <ForoProvider>
        <BrowserRouter>
          <Navbar />
          <main className='container mx-auto'>
            <Routes>
              <Route path='/' element={< WelcomePage />} />
              <Route path='/about' element={< AboutPage />} />
              <Route path='/contact' element={< ContactPage />} />
              <Route path='/login' element={< LoginPage />} />
              <Route path='/login-teachers' element={< LoginTeachersPage />} />
              <Route path='/register' element={< RegisterPage />} />
              <Route path='/register-teachers' element={< RegisterTeachersPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/home' element={< HomePage />} />
                <Route path='/crear-foro' element={< ForosFormPage />} />
                <Route path='/foros' element={< ForosPage />} />
                <Route path='/foros/:id' element={< ForoPage />} />
                <Route path='/profile' element={< ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ForoProvider>
    </AuthProvider>
  )
}

export default App;