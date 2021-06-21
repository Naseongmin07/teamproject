const banner_link = {
    college: ["http://www.kiweb.or.kr/images/college/sub_visual_bg.jpg","KYUNGIL TECHNICAL COLLEGE"],
    curriculum: ["http://www.kiweb.or.kr/images/curriculum/sub_visual_bg.jpg","CURRICULUM"],
    job: ["http://www.kiweb.or.kr/images/job/sub_visual_bg.jpg","JOB INFORMATION"],
    community: ["http://www.kiweb.or.kr/images/community/sub_visual_bg.jpg","COMMUNITY"],
    consult: ["http://www.kiweb.or.kr/images/consult/sub_visual_bg.jpg","CONSULTING"],
}
const page_list = {
    college : {introduction :"인사말",history: "연혁",teachers: "교직원소개",interior: "시설소개",location: "오시는길"},
    curriculum : {curriculum :"과정안내"},
    job : {interview: "취업자인터뷰",recruit: "취업현황",portfolio: "포트폴리오"},
    community : {notice: "공지사항",review: "수강후기", story: "KI이야기",reporter: "KI기자단",professor: "교수칼럼"},
    consult : {consulting: "상담게시판",apply: "지원하기",faq: "자주묻는질문"},
}


let original_href = window.location.href
let query_index = original_href.indexOf('?')
let new_href 
if (query_index!=-1){
   new_href = original_href.slice(0,query_index)
}else{
    new_href = original_href
}
let href_split = new_href.split('/')
let current_split = href_split[href_split.length-2]
let current_split_page = href_split[href_split.length-1]

const middle_header = document.querySelector('#middle_header')
const middle_header_content = document.querySelector('.middle_header_content')

middle_header.style.backgroundImage = `url(${banner_link[current_split][0]})`
middle_header.style.backgroundSize = 'cover'
middle_header_content.innerHTML = `${banner_link[current_split][1]}`


const middle_ul = document.querySelector('.middle_ul')
let current_page_list = page_list[current_split]
let li


let object_values = Object.values(current_page_list)
let object_keys = Object.keys(current_page_list)
let href_link


for(i=0;i<object_keys.length;i++){
    a = document.createElement('a')
    href_link = `/${current_split}/${object_keys[i]}`
    a.href = href_link
    li = document.createElement('li')
    li.innerHTML = object_values[i]
    li.classList.add(object_keys[i])
    a.appendChild(li)
    middle_ul.appendChild(a)
}


const middle_right_header = document.querySelector('.middle_right_header')
middle_right_header.innerHTML = page_list[current_split][current_split_page]


const middle_left_header_title = document.querySelector('.middle_left_header_title')
middle_left_header_title.innerHTML = banner_link[current_split][1]


current_menu = document.querySelector(`.${current_split_page }`)
current_menu.style.color = '#006cdb'
current_menu.style.borderBottom = '1px solid #006cdb'



class createBoard{


    constructor(base_div, db, column_key, board_type){
        this.db = db;
        this.column_key = column_key;
        this.last_page = undefined;
        this.base_div = base_div;
        this.board_type = board_type;
    }


    init(){
        let div_result
        if(this.board_type == "board"){
            div_result = this.createTable(this.db, 1, this.column_key)
        }
        else if(this.board_type == "interview"){
            div_result = this.createInterview(this.db, 1, this.column_key)
        }
        else if(this.board_type=="portfolio"){
            div_result = this.createPortfolio(this.db, 1, this.column_key)
        }
        let ul_result = this.createUl(this.db, 1)
        let search = this.createSearch()
        this.base_div.appendChild(div_result)
        this.base_div.appendChild(ul_result)
        this.base_div.appendChild(search)
    }

    
    createInterview = function(db,page,column_key){
        let column = Object.keys(column_key)
        let key = Object.values(column_key)
        let db_slice = db.slice((page-1)*10,page*10)
        let common_div = document.createElement('div')
        common_div.className = 'common_div'


        db_slice.forEach(v=>{
            
            let div = document.createElement('div')
            let img_div = document.createElement('div')
            let img = document.createElement('img')
            let ul = document.createElement('div')
            img_div.className = "img_div"
            div.className = "interview_list"
            ul.className = "ul"
            img.src = v.img

            for(i=1; i<4; i++){

                let li = document.createElement('div')
                let div_title = document.createElement('div')
                let div_content = document.createElement('div')
                div_title.innerHTML = column[i]
                div_content.innerHTML = v[key[i]]
                li.appendChild(div_title)
                li.appendChild(div_content)
                ul.appendChild(li)

            }

            img_div.appendChild(img)
            div.appendChild(img_div)
            div.appendChild(ul)
            common_div.appendChild(div)
        })
    
        return common_div
    }


    createTable = function(db,page,column_key){
    
        let table = document.createElement('table')
        table.className = "common_board"
        let tr = document.createElement('tr')
        let column = Object.keys(column_key)
        let key = Object.values(column_key)
        let db_slice = db.slice((page-1)*10,page*10)
        
        for(i=0; i<column.length; i++){
            let td = document.createElement('td')
            td.innerHTML = column[i]
            tr.appendChild(td)
        }
    
        table.appendChild(tr)
        db_slice.forEach(v=>{
            let tr = document.createElement('tr')
            for(let i=0; i<column.length; i++){
                let td = document.createElement('td')
                if(key[i] == "title"){
                    td.className = v.contents
                    td.addEventListener('click',(event)=>{
                        while (this.base_div.hasChildNodes()) 
                            {this.base_div.removeChild(this.base_div.firstChild)}
                        // this.base_div.appendChild(event.target.className)
                    })
                }
                td.innerHTML = v[key[i]]
                tr.appendChild(td)
            }
            table.appendChild(tr)
        })
        return table
    }


    createPortfolio = function(db,page,column_key){

        let column = Object.keys(column_key)
        let key = Object.values(column_key)
        let db_slice = db.slice((page-1)*10,page*10)
        let common_div = document.createElement('div')
        common_div.className = 'common_div'
    
        db_slice.forEach(v=>{
            let div = document.createElement('div')
            let img = document.createElement('img')
            let table = document.createElement('table')
            table.className = "common_table"
            img.src = v.img
            for(i=0; i<4; i++){
                let tr
                if(i==0){
                    tr = document.createElement('tr')
                    let td = document.createElement('td')
                    td.appendChild(img)
                    tr.appendChild(td)
                }
                else{
                    tr = document.createElement('tr')
                    let b = document.createElement('b')
                    let td = document.createElement('td')
                    b.innerHTML = column[i]
                    td.appendChild(b)
                    td.innerHTML = `: ${v[key[i]]}`
                    tr.appendChild(td)
                }
                table.appendChild(tr)
                div.appendChild(table)
            }
           common_div.appendChild(div)
        })
    
        return common_div
    }


    reset_table(db,new_page){

        
        let table_result
        if(this.board_type == "board"){

            table_result = this.createTable(db, new_page, this.column_key)
        }else if(this.board_type =="interview"){

            table_result = this.createInterview(db, new_page, this.column_key)
        }else if(this.board_type == "portfolio"){

            table_result = this.createPortfolio(db, new_page, this.column_key)
        }
        let ul_result = this.createUl(db, new_page)
        let search = this.createSearch()
        this.base_div.children[1].remove()
        this.base_div.children[1].remove()
        this.base_div.children[1].remove()
        this.base_div.appendChild(table_result)
        this.base_div.appendChild(ul_result)
        this.base_div.appendChild(search)
    } 


    createUl(db, page){


        let ul = document.createElement('ul')
        ul.className = "page_ul"
        let page_end = Math.ceil(page/10)*10 + 1
        let page_start = page_end - 10
        this.last_page = Math.ceil(db.length/10)
    
        for(i=page_start; i<page_end; i++){
    
            let li = document.createElement('li')
            li.innerHTML = i
            if(i==page){
                li.className = "current"
                li.style.color = "#006cdc"
                li.style.border = "1px solid #006cdc"
            }

            li.addEventListener('click',(event)=>{
                event.target.parentNode.childNodes.forEach(v=>{
                    if (v.innerHTML==event.target.innerHTML){
                        v.style.color = '#006cdc';
                        v.style.border = "1px solid #006cdc"
                    }
                    else{
                        v.style.color = 'black'
                        v.style.border = "black"
                    }
                })
                
                this.reset_table(db, event.target.innerHTML)
            })
            
            ul.appendChild(li)

            if(i==this.last_page){
                break
            }
        }
        ul = this.createBtn(db,ul)
        return ul
    }


    createBtn(db,ul){


        let li_before = document.createElement('li')
        let li_next = document.createElement('li')
        let li_page_before = document.createElement('li')
        let li_page_next = document.createElement('li')   
        li_before.innerHTML = "<"
        li_next.innerHTML = ">"
        li_page_before.innerHTML = "<<"
        li_page_next.innerHTML = ">>"
    
        
        li_before.addEventListener('click',()=>{
    
            let page = parseInt(document.querySelector('.current').innerHTML)
            let new_page
            if(page==1){
                new_page = 1
            }else{
                new_page = page-1
            }
            this.reset_table(db, new_page)
    
        })
        li_next.addEventListener('click',()=>{
    
            let page = parseInt(document.querySelector('.current').innerHTML)
            let new_page
            if(page==this.last_page){
                new_page = this.last_page
            }else{
                new_page = page+1
            }
            this.reset_table(db, new_page)
    
        })
        li_page_before.addEventListener('click',()=>{
            
            let new_page
            let page_start
            let page = parseInt(document.querySelector('.current').innerHTML)
            
            if(page%10!=0){
                page_start = Math.floor(page/10)*10+1
            }else{
                page_start = Math.floor((page-1)/10)*10+1
            }
        
            if(page == 1){
                new_page = page
            }
            else if(page == page_start){
                new_page = page-1
            }
            else{
                new_page = page_start
            }
    
            this.reset_table(db, new_page)
        })
        
        li_page_next.addEventListener('click',()=>{
    
            let new_page
            let page = parseInt(document.querySelector('.current').innerHTML)
            let page_end = Math.ceil(page/10)*10
            
            if(page == this.last_page){
                new_page = page
            }
            else if(page == page_end){
                new_page = page+1
            }
            else{
                if(page_end > this.last_page){
                    new_page = this.last_page
                }
                else{
                    new_page = page_end
                }
            }
            
            this.reset_table(db, new_page)
        })
    
        ul.insertBefore(li_before, ul.childNodes[0])
        ul.insertBefore(li_page_before, ul.childNodes[0])
        ul.appendChild(li_next)
        ul.appendChild(li_page_next)
    
        return ul
    }

    createSearch(){
        let search_ul = document.createElement('ul')
        search_ul.className = 'search_ul'
        let select = document.createElement('select')
        let value_list = ['total', 'title', 'writer', 'contents']
        let key_list = ['전체', '제목', '작성자', '내용']
        let li_input = document.createElement('li')
        let li_select = document.createElement('li')
        let li_button = document.createElement('li')
        let input = document.createElement('input')
        let button = document.createElement('button')
        button.innerHTML = '검색'

        for(i=0; i < value_list.length; i++){
            let option = document.createElement('option')
            option.innerHTML = key_list[i]
            option.value = value_list[i]
            select.appendChild(option)
        }
        select.className = 'search_select'
        input.className = 'search_input'
        button.className = 'search_button'
        li_select.appendChild(select)
        li_input.appendChild(input)
        li_button.appendChild(button)
        search_ul.appendChild(li_select)
        search_ul.appendChild(li_input)
        search_ul.appendChild(li_button)

        return search_ul
    }
}





const database = [{category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "1", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
                {category: "notice",id: "0", title: "제목", enrollDate:"2021-05-05", writer: "nms", contents: "asdf", count: "0" },
]

const column_key = {
    번호 : "id",
    제목 : "title",
    등록일 : "enrollDate",
    작성자 : "writer",
    조회수 : "count"
}


const database2 = [{date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"},
                {date:'2020-05-02', class:"게임 기획", jokey: "24기", name: "강희은", company: "모아이 게임즈"}]


const column_key2 = {
    취업일자 : "date",
    학과 : "class",
    기수 : "jokey",
    이름 : "name",
    회사명 : "company"
}


const database3 = [{img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},
                    {img: "/image/portfolio/sample.jpg", title: "노바코어프로그래머", name : "Joy Room", count: "0", contents: "asdfasdf"},]


const column_key3 = {
    이미지: "img",
    제목: "title",
    이름: "name",
    조회수: "count",
}

const database4 = [{name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},
                    {name: "joy Room",title: "노바코어프로그래머",contents: "0",img: "/image/portfolio/sample.jpg",count: "0"},                             
                ]


const column_key4 = {
    이미지: "img",
    제목: "title",
    이름: "name",
    조회수: "count",
}


function callback(){
    let search_select = document.querySelector('.search_select')
    let search_input = document.querySelector('.search_input')
    
}

async function searchDB(){
    url = 'http://localhost3000/'
    await fetch(url,option)
}


const middle_right_bottom = document.querySelector('.middle_right_bottom')


if(href_split[href_split.length-2] == "community"|| href_split[href_split.length-1]=="faq"){
    let board = new createBoard(middle_right_bottom, database, column_key, 'board')
    board.init()

}

if(href_split[href_split.length-1]=="recruit"){
    let board = new createBoard(middle_right_bottom, database2, column_key2, 'board')
    board.init()

}

if(href_split[href_split.length-1]=="interview"){
    let board = new createBoard(middle_right_bottom, database3, column_key3, 'interview')
    board.init()

}

if(href_split[href_split.length-1]=="portfolio"){
    let board = new createBoard(middle_right_bottom, database4, column_key4, 'portfolio')
    board.init()

}















