let category_list = 
            [{boardName: "학교소개", category:"인사말", url:"/college/introduction" },
            {boardName: "학교소개", category:"연혁", url:"/college/history" },
            {boardName: "학교소개", category:"교직원소개", url:"/college/teachers" },
            {boardName: "학교소개", category:"시설소개", url:"/college/interior" },
            {boardName: "학교소개", category:"오시는길", url:"/college/location" },
            {boardName: "교육과정", category:"과정안내", url:"/curriculum/curriculum" },
            {boardName: "교육과정", category:"전체일정", url:"/scheduler" },
            {boardName: "취업정보", category:"취업자인터뷰", url:"/job/interview" },
            {boardName: "취업정보", category:"취업현황", url:"/job/recruit" },
            {boardName: "취업정보", category:"포트폴리오", url:"/job/portfolio" },
            {boardName: "커뮤니티", category:"공지사항", url:"/community/notice" },
            {boardName: "커뮤니티", category:"수강후기", url:"/community/review" },
            {boardName: "커뮤니티", category:"KI이야기", url:"/community/story" },
            {boardName: "커뮤니티", category:"KI기자단", url:"/community/reporter" },
            {boardName: "커뮤니티", category:"교수칼럼", url:"/community/professor" },
            {boardName: "상담신청", category:"상담게시판", url:"/consult/consulting" },
            {boardName: "상담신청", category:"지원하기", url:"/consult/apply" },
            {boardName: "상담신청", category:"자주묻는질문", url:"/consult/faq"}]


const header_menu_ul = document.querySelector('#header_menu_ul')
const snb_bar_area = document.querySelector('#snb_bar_area')

let before_boardName = undefined
let main_ul
let main_li
let content_ul
let content_li
let content_a

for(i=0; i<category_list.length;i++){
    [boardName, category, url] = Object.values(category_list[i])

    content_ul = document.createElement('ul')
    content_li = document.createElement('li')
    content_a = document.createElement('a')

    content_a.href = url
    content_a.innerHTML = category
    content_li.appendChild(content_a)
    content_ul.appendChild(content_li)
    
    if(before_boardName == boardName){
        main_li.appendChild(content_ul)
    }else{
        let header_li = document.createElement('li')
        let header_a = document.createElement('a')
        header_a.href = url
        header_a.innerHTML = boardName
        header_li.appendChild(header_a)
        header_menu_ul.appendChild(header_li)
        main_ul = document.createElement('ul')
        if(i==0){
            main_li = document.createElement('li')
            main_li.appendChild(content_ul)
        }else{
            main_li = document.createElement('li')
            main_li.appendChild(content_ul)
        }
        main_ul.appendChild(main_li)
        snb_bar_area.appendChild(main_ul)

    }
    before_boardName = boardName
}


let headersnbbar = document.querySelector('#header_snb_bar') 

snbbaronFn = function(){
    
    headersnbbar.setAttribute('class','snbbaron')
}

snbbaroutFn = function(){

    headersnbbar.setAttribute('class','snbbarout')
}
