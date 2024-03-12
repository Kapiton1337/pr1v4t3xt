import { browser } from "browser-namespace";
import { useEffect, useState } from "react";

function App() {
  const [cookies, setCookies] = useState([])
  useEffect(()=>{
    async function getCookies(){
      const data = await browser.cookies.getAll({})
      setCookies(data);
    }
    if(cookies.length === 0) getCookies()
  })
  return (
      <div>
        {cookies.map(el => (el.domain === ".google.com") && <div>{el.domain}:{el.name}</div>)}
      </div>
  );
}

export default App;