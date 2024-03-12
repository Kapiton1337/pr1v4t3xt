import { browser } from "browser-namespace";
import { useEffect, useState } from "react";

function App() {
  const [cookies, setCookies] = useState('')
  useEffect(()=>{
    async function getCookies(){
      const data = await browser.cookies.getAll({})
      setCookies(data[0].domain);
    }
    if(!cookies) getCookies()
  })
  return (
    <div>
      {cookies}
    </div>
  );
}

export default App;