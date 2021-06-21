let data = [{CourseName: "(증강현실)가상증강현실 응용SW개발자 양성과정", startDate:"2020-05-05", endDate:"2020-05-20", time:"09:00~18:00", extrapay:"100% 전액국비지원",tag:"#가상증강현실 #게임개발",
            img:"/image/course/sample.png", hit:"0", registrationDate:"2020-05-05", onoff:"현재모집중", currentDate:"2020-03-03"}, {CourseName: "(증강현실)가상증강현실 응용SW개발자 양성과정", startDate:"2020-05-05", endDate:"2020-05-20", time:"09:00~18:00", extrapay:"100% 전액국비지원",tag:"#가상증강현실 #게임개발",
            img:"/image/course/sample.png", hit:"0", registrationDate:"2020-05-05", onoff:"현재모집중", currentDate:"2020-03-03"},{CourseName: "(증강현실)가상증강현실 응용SW개발자 양성과정", startDate:"2020-05-05", endDate:"2020-05-20", time:"09:00~18:00", extrapay:"100% 전액국비지원",tag:"#가상증강현실 #게임개발",
            img:"/image/course/sample.png", hit:"0", registrationDate:"2020-05-05", onoff:"현재모집중", currentDate:"2020-03-03"},{CourseName: "(증강현실)가상증강현실 응용SW개발자 양성과정", startDate:"2020-05-05", endDate:"2020-05-20", time:"09:00~18:00", extrapay:"100% 전액국비지원",tag:"#가상증강현실 #게임개발",
            img:"/image/course/sample.png", hit:"0", registrationDate:"2020-05-05", onoff:"현재모집중", currentDate:"2020-03-03"},{CourseName: "(증강현실)가상증강현실 응용SW개발자 양성과정", startDate:"2020-05-05", endDate:"2020-05-20", time:"09:00~18:00", extrapay:"100% 전액국비지원",tag:"#가상증강현실 #게임개발",
            img:"/image/course/sample.png", hit:"0", registrationDate:"2020-05-05", onoff:"현재모집중", currentDate:"2020-03-03"},{CourseName: "(증강현실)가상증강현실 응용SW개발자 양성과정", startDate:"2020-05-05", endDate:"2020-05-20", time:"09:00~18:00", extrapay:"100% 전액국비지원",tag:"#가상증강현실 #게임개발",
            img:"/image/course/sample.png", hit:"0", registrationDate:"2020-05-05", onoff:"현재모집중", currentDate:"2020-03-03"}]

const board = document.querySelector('.middle_right_bottom')
const href = location.href
queryString = href.split('?')[1]



if(queryString==undefined){
    data.forEach((v,index)=>{

        let crclList = document.createElement('div')
        let title = document.createElement('h4')
        let crclImg = document.createElement('div')
        let Img = document.createElement('img')
        let crclCon = document.createElement('div')
        let li_duration = document.createElement('li')
        let li_time = document.createElement('li')
        let li_pay = document.createElement('li')
        let ul_content = document.createElement('ul')
        let ul_tag = document.createElement('ul')
        let button_area = document.createElement('div')
        let btn_blue = document.createElement('a')
        let btn_white = document.createElement('a')
        
        crclList.className = "crcl_list"
        crclImg.className = "crcl_img"
        crclCon.className = "crcl_con"
        title.className = "main_title"
        ul_tag.className = "ul_tag"
        button_area.className = "button_area"
        btn_blue.className = "btn_blue"
        btn_white.className = "btn_white"

        title.innerHTML = v.CourseName
        title_clone = title.cloneNode(true)
        title_clone.className = "sub_title"

        btn_blue.innerHTML = "지원하기"
        btn_blue.addEventListener('click',()=>{
            window.location.href = "http://localhost:3000/consult/apply"
        })
        btn_white.innerHTML = "과정자세히보기"
        btn_blue.href = "/consult/apply"
        btn_white.href = `/curriculum/curriculum?mode=${index}`
        
        Img.src = v.img

        li_duration.innerHTML = `교육기간 ${v.startDate} ~ ${v.endDate}`
        li_time.innerHTML = `교육시간 ${v.time}`
        li_pay.innerHTML = `교육수당 ${v.extrapay}`

        ul_content.appendChild(li_duration)
        ul_content.appendChild(li_time)
        ul_content.appendChild(li_pay)

        let taglist = v.tag.replace(/ /gi,"").split('#')
        for(i=1;i<taglist.length;i++){
            let tags = document.createElement('li')
            let a = document.createElement('a')
            a.href = "#"
            a.innerHTML = `#${taglist[i]}`
            tags.appendChild(a)
            ul_tag.appendChild(tags)
        }
        
        button_area.appendChild(btn_blue)
        button_area.appendChild(btn_white)
        crclCon.appendChild(title_clone)
        crclCon.appendChild(ul_content)
        crclCon.appendChild(ul_tag)
        crclCon.appendChild(button_area)
        crclImg.appendChild(Img)
        crclList.appendChild(title)
        crclList.appendChild(crclImg)
        crclList.appendChild(crclCon)
        board.appendChild(crclList)
    })
    
}else{
    let result = data[queryString.split('=')[1]]
    let table = document.createElement('table')
    let title_tr = document.createElement('tr')
    let sub_tr = document.createElement('tr')
    let title_th = document.createElement('th')
    let title_td = document.createElement('td')
    let regtitle = document.createElement('th')
    let regdate = document.createElement('td')
    let hittitle = document.createElement('th')
    let hit = document.createElement('td')

    table.className = "table"
    title_th.className = "title_th"
    title_td.className = "title_td"
    regtitle.className = "regtitle"
    regdate.className = "regdate"
    hittitle.className = "hittitle"
    hit.className = "hit"
    title_tr.className = "title_tr"
    sub_tr.className = "sub_tr"

    title_th.innerHTML = "제목"
    title_td.innerHTML = result.CourseName
    regtitle.innerHTML = "등록일"
    regdate.innerHTML = result.currentDate
    hittitle.innerHTML = "조회수"
    hit.innerHTML = result.hit

    title_tr.appendChild(title_th)
    title_tr.appendChild(title_td)
    sub_tr.appendChild(regtitle)
    sub_tr.appendChild(regdate)
    sub_tr.appendChild(hittitle)
    sub_tr.appendChild(hit)


    table.appendChild(title_tr)
    table.appendChild(sub_tr)
    board.appendChild(table)
}