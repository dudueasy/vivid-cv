
let content1 = `/*
* 你好, 我是Apolo
* 我将以动画的形式来介绍我自己
* 只用文字介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/

* {
    transition: all 1s;
}

html {
    background: #f5f5f5;
    font-size: 16px;
}

#code {
    border: 1px solid black;
    padding: 16px;
}

/* 我需要一点代码高亮 */

.token.comment {
    color: #905;
}

.token.selector {
    color: #690;
}

.token.punctuation {
    color: #999;
}

.token.property {
    color: #905;
}
.token.function {
    color: #DD4A68;
}

/* 加点3d效果 */
#code {
    transform: rotate(360deg)
}

/* 不玩了, 我来介绍一下我自己吧 */
/* 我需要一张卡纸 */

`


let content2 = `
#code {
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}

#paper {
    position: fixed;
    width: 50%;
    right: 0;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

#paper .content {
    padding: 16px;
    height: 100%;
    width: 100%;
    background: black;
    overflow:auto;
} 

#paper h1{
    color: wheat;
}

#paper p {
    color:wheat;
}

/* 我要开始写简历了 */
`

let mdContent = `# 自我介绍

我叫Apolo
我是90后
生日保密
学校保密

# 联系方式

联系方式保密

# 技能介绍
略

# 项目介绍
略

# 应聘岗位
希望应聘前端岗位
`


let style = document.querySelector('head #style')
let elementContainer = document.querySelector('#container')
let pre = elementContainer.querySelector('pre')


appendContent(
    pre,
    '',
    content1,
    () => {

        createPaper(elementContainer,()=>{writeMarkDown(mdContent)})

    })


// 向dom元素添加内容的函数,
// 同时向style标签和指定的dom元素 ( htmlContainer ) 写入新内容 (newContent)
//// 其中向 dom 元素写入的内容是经过 prism 语法高亮库 加工过的内容.
// 最后通过接收函数 fn 作为参数
function appendContent(htmlContainer, currentContent, newContent, fn = () => {
}) {
    let counter = 0
    let timer = setInterval(() => {

        console.log('showing result')
        counter += 1
        let currentResult = currentContent + newContent.substring(0, counter)

        // 向 style 标签插入文本
        style.innerHTML = currentResult

        prismResult = Prism.highlight(currentResult, Prism.languages.css);
        htmlContainer.innerHTML = prismResult
        htmlContainer.scrollTop = htmlContainer.scrollHeight

        if (counter >= newContent.length) {
            clearInterval(timer)
            fn()
        }
    }, 1)
}

// 创建两个dom元素, div#paper 和 div>div.content
// 调用appendContent 函数向指定 dom 元素添加内容.
function createPaper(container,fn) {

    let paper = document.createElement('div')
    paper.id = 'paper'

    let content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    container.appendChild(paper)

    appendContent(pre, content1, content2,fn)

}

// 向函数体中定义的DOM 元素写入内容.
function writeMarkDown( content, fn=()=>{}) {
    let paper = document.querySelector('#paper .content')
    let counter = 0
    timer = setInterval(() => {

        counter += 1
        let currentResult = marked(content.substring(0, counter))

        paper.innerHTML = currentResult
        paper.scrollTop = paper.scrollHeight

        if (counter >= content.length) {
            clearInterval(timer)
            fn()
        }
    }, 1)

}
