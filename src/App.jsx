import { useReducer } from 'react'
import './App.css'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core';
import CodeBlock from './CodeBlock';

function App() {
  return (
    <>
      <CurrentTime />
      <CodeBlock />
    </>
  )
}

const CurrentTime = () => {
  const [, forceUpdate] = useReducer(count => count + 1, 0)

  const date = new Date()
  const msPerMinute = 60 * 1000

  const currentTime = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric'
  })

  const nextMinute = Math.floor(+date / msPerMinute + 1) * msPerMinute

  useEffect((() => {
    const timeout = setTimeout(forceUpdate, nextMinute - Date.now())
    return () => clearTimeout(timeout)
  }), [date])

  return <span>{currentTime}</span>
}
export default App
