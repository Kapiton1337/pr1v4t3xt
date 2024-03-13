import { Button, createMuiTheme, Grid, ThemeProvider, Typography, Box } from '@material-ui/core';
import { browser } from 'browser-namespace';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMemo, useState, useEffect } from 'react';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [cookies, setCookies] = useState([])
  async function getCookies(){
    const data = await browser.cookies.getAll({})
    setCookies(data);
  }
  async function removeDomainCookie(){
    browser.cookies.remove({url: browser.tabs[0].url})
    getCookies();
  }

  useEffect(()=>{
    getCookies()
  }, [cookies])

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          h1: {
            fontSize: 16,
            fontWeight: 400,
          },
          body1: {
            fontFamily: 'monospace',
            fontSize: 18,
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component='main' padding={2} display='flex'>
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
          <Grid item>
            <Typography variant='h1'>Cookies list</Typography>
          </Grid>

          <Grid item>
            <Typography variant='body1' style={{ userSelect: 'all' }}>
              {browser.tabs[0].url}
              {cookies.map(el=> <div>{el.domain}</div>)}
            </Typography>
          </Grid>

          <Grid item>
            <Button onClick={()=>getCookies()} variant='contained' color='primary'>
              Update cookie list
            </Button>
            <Button onClick={()=>removeDomainCookie()} variant='contained' color='primary'>
              Delete cookie
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;