import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
~~~c
int main(void) {
printf("Hello, world")
}
~~~
`
const CodeBlock = () => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeMathjax]}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={
        {
          code(props) {
            console.log('props', props)
          }
        }
      }


    >
      {markdown}
    </ReactMarkdown>
  )
}

export default CodeBlock
