function copyimg(){

    let banner_ul = document.querySelector(".swiper-wrapper") //ul  
    let banner_li = document.querySelectorAll('.swiper-slide')  //li
        while(true){
            banner_li_length = document.querySelectorAll('.swiper-slide').length  //li
            if(banner_li_length>=10){
                break
            }
            for(i=0;i<banner_li.length;i++){
                let clone=banner_li[i].cloneNode(true); 
                banner_ul.appendChild(clone);
            }
    }   
}
copyimg()


new Swiper('.swiper-container', {

	slidesPerView : 7, // 동시에 보여줄 슬라이드 갯수
	spaceBetween : 30, // 슬라이드간 간격
	slidesPerGroup : 1, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음

	// 그룹수가 맞지 않을 경우 빈칸으로 메우기
	// 3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듬
	loopFillGroupWithBlank : true,

	loop : true, // 무한 반복

    autoplay: {
        delay: 3000,
    },

	pagination : { // 페이징
		el : '.swiper-pagination',
		clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
	},
	navigation : { // 네비게이션
		nextEl : '.next_img', // 다음 버튼 클래스명
		prevEl : '.before_img', // 이번 버튼 클래스명
	},
});


function calendar_load(){

    let Year = document.querySelector('.year')
    let Month = document.querySelector('.month')
    let calendarBox = document.querySelector('#calendar_box')
    let setYearString = Year.innerHTML
    let setMonthString = Month.innerHTML
    let setDay = 1; 
    let setYear
    let setMonth
    if(setYearString==''){
        let today = new Date()
        setYear = today.getFullYear()
        setMonth = today.getMonth() +1
        Year.innerHTML = `${setYear}년`
        Month.innerHTML = `${setMonth}월`
    }else{
        setYear = setYearString.slice(0,setYearString.length-1)
        setMonth = setMonthString.slice(0,setMonthString.length-1)
    }
    let dt = new Date(`${setYear}-${setMonth}-${setDay}`)
    let dt2 = new Date(setYear, setMonth,0)
    let lastDay = dt2.getDate();
    let weekDay = dt.getDay();
    let calendar = document.createElement('table')
    calendar.setAttribute('id','calendar')
    let week = document.createElement('tr')
    let dayarray = ['일','월','화','수','목','금','토']

    for(i=0; i<7; i++){
        let day = document.createElement('td')
        day.classList.add('top')
        day.innerHTML = dayarray[i]
        week.appendChild(day)
    }
    calendar.appendChild(week)

    week = document.createElement('tr')
    for(i=0; i < lastDay + weekDay; i++){
        let day = document.createElement('th')
        day.classList.add('bottom')
        let p = document.createElement('p')
        if(i < weekDay){
            week.appendChild(day)
            continue
        }else{
            p.innerHTML = String(i+1-weekDay).padStart(2,0)
            day.appendChild(p)
            week.appendChild(day)
            if((i+1)%7==0){
                calendar.appendChild(week)
                week = document.createElement('tr')
            }
        }
    }
    calendar.appendChild(week)
    calendarBox.appendChild(calendar)

}
calendar_load()

function nextMonthFn(){
    let year = document.querySelector('.year')
    let month = document.querySelector('.month')
    let intYear = parseInt(year.innerHTML.slice(0,year.innerHTML.length-1))
    let intMonth = parseInt(month.innerHTML.slice(0,month.innerHTML.length-1))
    if(intMonth == 12){
        intYear += 1
        intMonth = 1
    }else{
        intMonth += 1
    }
    year.innerHTML = `${intYear}년`
    month.innerHTML = `${intMonth}월`
    clearCalendar()
    calendar_load()
}

function beforeMonthFn(){
    let year = document.querySelector('.year')
    let month = document.querySelector('.month')
    let intYear = parseInt(year.innerHTML.slice(0,year.innerHTML.length-1))
    let intMonth = parseInt(month.innerHTML.slice(0,month.innerHTML.length-1))
    if(intMonth == 1){
        intYear -= 1
        intMonth = 12
    }else{
        intMonth -= 1 
    }
    year.innerHTML = `${intYear}년`
    month.innerHTML = `${intMonth}월`
    clearCalendar()
    calendar_load()
}

function clearCalendar(){
    let calendarBox = document.querySelector('#calendar_box')
    calendarBox.removeChild(calendarBox.childNodes[1])
}

let flag1 = false
function programFn(){
    let program = document.querySelector('.program')
    let subMenu = document.querySelector('.sub_menu_program')
    let loading = document.querySelector('.loading_program')
    let container = document.querySelector('.container_program')
    if(flag1==false){
        subMenu.classList.add('submenuon')
        container.style.display = "block"
        program.style.display = "block"
        loading.classList.add('loadon')
        flag1 = true
    }else{
        subMenu.setAttribute('class','content_sub_menu sub_menu_program')
        container.style.display = "none"
        program.style.display = "none"
        loading.setAttribute('class','loading_program')
        flag1 = false
    }
}

let flag2 = false
function introduceFn(){
    let program = document.querySelector('.introduce')
    let subMenu = document.querySelector('.sub_menu_introduce')
    let loading = document.querySelector('.loading_introduce')
    let container = document.querySelector('.container_introduce')
    if(flag2==false){
        subMenu.classList.add('submenuon')
        container.style.display = "block"
        program.style.display = "block"
        loading.classList.add('loadon')
        flag2 = true
    }else{
        subMenu.setAttribute('class','content_sub_menu sub_menu_introduce')
        container.style.display = "none"
        program.style.display = "none"
        loading.setAttribute('class','loading_introduce')
        flag2 = false
    }
}

let flag3 = false
function snsFn(){
    let snsArea = document.querySelector('.sns_area')
    if(flag3==false){
        snsArea.style.display="block"
        snsArea.classList.add('snson')
        flag3 = true
    }else{
        snsArea.style.display="none"
        snsArea.setAttribute('class','sns_area')
        flag3 = false
    }
}

function containerFn(event){
    let snsArea = document.querySelector('.sns_area')
    if(event.target.id.length>0){
        snsArea.style.display="none"
        snsArea.setAttribute('class','sns_area')
        flag3 = false
    }
}


const beforeMonthbtn = document.querySelector('.before_btn')

const nextMonthbtn = document.querySelector('.next_btn')

const subMenuProgram = document.querySelector('.sub_menu_program')

const subMenuIntroduce = document.querySelector('.sub_menu_introduce')

const sns= document.querySelector('.sns')

const container= document.querySelector('#container')

sns.addEventListener('click',snsFn)

beforeMonthbtn.addEventListener('click', beforeMonthFn)

nextMonthbtn.addEventListener('click', nextMonthFn)

subMenuProgram.addEventListener('click',programFn)

subMenuIntroduce.addEventListener('click',introduceFn)

container.addEventListener('click',containerFn)









