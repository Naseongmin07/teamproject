const galleria_container = document.querySelector('#galleria-container')
const max_image_length = 10

// let image = document.querySelectorAll('')
let url_list = ["http://www.kiweb.or.kr/nBoard/upload/file/facility/1553579106_29784_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1553577488_79841_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1553577283_34775_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1553577270_50026_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1553577258_30028_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488807_60408_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488797_11767_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488700_57704_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488700_57704_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488674_92677_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488674_92677_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488674_92677_1.jpg",
                "http://www.kiweb.or.kr/nBoard/upload/file/facility/1471488674_92677_1.jpg"]
            
let galleria_main = document.querySelector('#galleria_main')

function galleria_init(){
    url_list.forEach((v,i)=>{
        let li = document.createElement('li')
        let img = document.createElement('img')
        img.addEventListener('click',imageclickFn)
        img.src = v
        img_clone = img.cloneNode(true)
        if(i==0){
            galleria_main.appendChild(img_clone)
            img.classList.add('galleria_on')
        }
        li.appendChild(img)
        galleria_container.appendChild(li)
    })
}

function imageclickFn(event){
    let galleria_list = document.querySelectorAll('#galleria-container > li > img')
            let galleria_img = document.querySelector('#galleria_main > img')
            galleria_list.forEach((element,index)=>{
                if(element==event.target){
                    element.classList.add('galleria_on')
                    galleria_img.src = element.src
                    imagebarFn(element,index)
                }
                else{
                    element.classList.remove('galleria_on')
                }
            })
}

function imagebarFn(element,index){
    let galleria_list = document.querySelectorAll('#galleria-container > li > img')
    let ul = document.querySelector('#galleria-container')
    let targetLeft = parseInt(element.getBoundingClientRect().left);
    let targetRight = parseInt(element.getBoundingClientRect().right);
    let targetMiddle = (targetLeft+targetRight)/2
    console.log(targetLeft)
    console.log(targetRight)
    if(targetMiddle>651&targetMiddle<731){
        if(index!=0){
            if(ul.style.transform==''){
                ul.style.transform = `translateX(90px)`
            }
            else{
                let current_px = ul.style.transform.replace(/[^0-9|-]/g,'')
                let next_px = parseInt(current_px)+90
                ul.style.transform = `translateX(${next_px}px)`
            }
        }
    }
    if(targetMiddle>1461&targetMiddle<1541){
        if(index!=galleria_list.length){
            if(ul.style.transform==''){
                ul.style.transform = `translateX(-90px)`
            }
            else{
                let current_px = ul.style.transform.replace(/[^0-9|-]/g,'')
                let next_px = parseInt(current_px)-90
                ul.style.transform = `translateX(${next_px}px)`
            }
        }
    }
}

galleria_init()