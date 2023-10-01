import { useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TasksPage } from './app/TasksPage/TasksPage';
import { darkTheme, lightTheme } from './themes/themes';
import { Layout } from './Layout';
import { Header } from './components/Header';
import { LoginPage } from './app/AuthPage/LoginPage';
import { Registration } from './app/AuthPage/Registration';
import { AuthGuard } from './components/AuthGuard';
import { AuthProvider } from './components/AuthProvider';
import Camera2 from './components/camera/camera2';

const isDarkThemeKey = 'isDarkTheme';

function App() {
  const [ isDarkTheme, setIsDarkTheme ] = useState(() => {
    return localStorage.getItem(isDarkThemeKey) === 'false';
  });
  const [ locale, setLocale ] = useState(i18next.language);
  const [ openMenu, setOpenMenu ] = useState(false);

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((isDarkTheme) => {
      localStorage.setItem(isDarkThemeKey, `${isDarkTheme}`);

      return !isDarkTheme;
    });
  }, [ isDarkTheme ]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu((openMenu) => {
      return !openMenu;
    });
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(i18next.language);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // @ts-ignore
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <Header
                isDarkTheme={isDarkTheme}
                onThemeToggle={handleChangeTheme}
                openMenu={openMenu}
                onMenuToggle={handleCloseMenu}
              />

              <Routes>
                <Route path="/" element={<Navigate to="/todo" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/registration" element={<Registration />} />
                <Route path="/hack/:collectorId" element={<Camera2 />} />

                <Route element={<AuthGuard />}>
                  <Route path="/todo" element={<TasksPage />} />
                </Route>
              </Routes>
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
