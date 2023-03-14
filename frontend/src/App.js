import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import PageNotFound from './404';

function App() {
  const mode = useSelector((state) => state.mode);
  const token = Boolean(useSelector((state) => state.token))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/home' element={token ? <HomePage /> : <Navigate to={'/'} />}></Route>
            <Route path='/profile/:userId' element={token ? <ProfilePage /> : <Navigate to={'/'} />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
