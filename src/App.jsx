import { useReducer } from "react";
import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import CodeBlock from "./CodeBlock";
import Nav from "./Nav";
import Lorem from "./Lorem";
import { useState } from "react";
import { useRef } from "react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const bottomRef = useRef(null)

  const bottomStyle = {
    position: "fixed",
    bottom: 15,
    right: 5,
    backgroundColor: 'red',
    padding: "5px"
  }
  console.log(isScrolled)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsScrolled(!entry.isIntersecting)
      })
    }, {
      rootMargin: '0px 0px',
      root: null // use the browser viewport as the root element
    })
    observer.observe(bottomRef.current)

    return () => observer.disconnect()
  }, [])
  return (
    <>
      <Nav setIsScrolled={setIsScrolled} />
      <CurrentTime />
      <CodeBlock />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      <Lorem />
      {
        isScrolled && 
      <span style={bottomStyle} onClick={() => bottomRef.current.scrollIntoView({
        behevior: "instant"
        
      })}>To Bottom</span>
      }
      <div ref={bottomRef} />
    </>
  );
}

const CurrentTime = () => {
  const [, forceUpdate] = useReducer((count) => count + 1, 0);

  const date = new Date();
  const msPerMinute = 60 * 1000;

  const currentTime = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });

  const nextMinute = Math.floor(+date / msPerMinute + 1) * msPerMinute;

  useEffect(() => {
    const timeout = setTimeout(forceUpdate, nextMinute - Date.now());
    return () => clearTimeout(timeout);
  }, [date]);

  return <span>{currentTime}</span>;
};
export default App;
