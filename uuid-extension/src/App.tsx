import { browser } from "browser-namespace";
import { useEffect, useState } from "react";

function App() {
  const [cookies, setCookies] = useState('')
  useEffect(()=>{
    console.log('1')
    async function getCookies(){
      const data = await browser.cookies.getAll({})
      console.log(data)
      console.log(2)
      setCookies(data[0].name);
    }
    if(!cookies) getCookies()
  })
  return (
    <div>
      Привет
      {cookies}
    </div>
  );
}

export default App;