
let slides = document.querySelector('.bottom-form'),
slide = document.querySelectorAll('.bottom-form li'),
mainSlides =document.querySelector('.main-slide'),
mainSlide = document.querySelectorAll('.id'),
mainCount = mainSlide.length,
mainWidth = 1270,
mainMargin = 5,
currentIdx = 0,
slideCount = slide.length,
slideWidth = 120,
slideMargin = 30,
prevBtn = document.querySelector('.prev'),
nextBtn = document.querySelector('.next');

makeClone();
function makeClone(){
    for(let i = 0; i<slideCount; i++){
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);
    }
    for(let i = slideCount -1; i>=0; i-- ){
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);
    }

    updateWidth();
    setInitialPos();
    setTimeout(()=>{
        slides.classList.add('animated')
    },100);
   
}
function updateWidth(){
let currentSlides =  slide = document.querySelectorAll('.bottom-from li');
let newSlideCount = currentSlides.length;

let newWidth = (slideWidth + slideMargin)*newSlideCount - slideMargin+'px';
slides.style.width = newWidth;

}
function setInitialPos(){
let initialTranslateValue = -(slideWidth + slideMargin)*slideCount;
slides.style.transform = 'translateX('+ initialTranslateValue+'px)';

}

let timer = undefined;

function autoSlide(){
if(timer == undefined){
    timer = setInterval(()=>{
        moveSlide(currentIdx + 1);
    },3000);
}
}


autoSlide();

prevBtn.addEventListener('click',()=>{
moveSlide(currentIdx - 1);
clearInterval(timer);
timer = undefined;
autoSlide();
});
nextBtn.addEventListener('click',()=>{
moveSlide(currentIdx + 1);
clearInterval(timer)
timer = undefined;
autoSlide();
});

function stopSlide(){
clearInterval(timer);
timer = undefined;

}
// slides.addEventListener('mouseenter',()=>{
//     stopSlide();
// });
// slides.addEventListener('mouseleave',()=>{
//     autoSlide();
// });
function moveSlide(num){
slides.style.left = -num * (slideWidth + slideMargin) + 'px';
// mainSlides.style.left = -num * (mainWidth + mainMargin) + 'px';
currentIdx = num;
idx = num
if(num<0){
    idx = 5-Math.abs(num)
}else{
    idx = num
}
if(idx>4){
    idx=0
}
if(idx<0){
    idx=4
}


const mainimg = document.querySelectorAll('.id');
for(var i=0; i<mainimg.length;i++){
    mainimg[i].classList.remove('on')
}

mainimg[idx].classList.add('on')


if(currentIdx == slideCount ||currentIdx == -slideCount){
    setTimeout(()=>{
        slides.classList.remove('animated');
        slides.style.left = '0px';
        // mainSlides.classList.remove('animated');
        currentIdx = 0;
    },500);
    setTimeout(() => {
        slides.classList.add('animated');
        // mainSlides.classList.add('animated');
    },600);
}
}

// --------------------------------sub slide-----------------------------------------------------------------



let subSlides = document.querySelector('.sub-form'),
subSlide = document.querySelectorAll('.sub-form li'),
subCurrentIdx = 0,
subSlideCount = subSlide.length,
subSlideWidth = 300,
subSlideMargin = 30,
subPrevBtn = document.querySelector('.subprev'),
subNextBtn = document.querySelector('.subnext');

sunMakeClone();
function sunMakeClone(){
    for(let i = 0; i<subSlideCount; i++){
        let subCloneSlide = subSlide[i].cloneNode(true);
        subCloneSlide.classList.add('clone');
        subSlides.appendChild(subCloneSlide);
    }
    for(let i = subSlideCount -1; i>=0; i--){
        let subCloneSlide = subSlide[i].cloneNode(true);
        subCloneSlide.classList.add('clone');
        subSlides.prepend(subCloneSlide);
    }

    subUpdateWidth();
    subSetInitialPos();
    setTimeout(()=>{
        subSlides.classList.add('animated')
    },100);
   
}
function subUpdateWidth(){
let subCurrentSlides =  subSlide = document.querySelectorAll('.sub-from li');
let subNewSlideCount = subCurrentSlides.length;

let subNewWidth = (subSlideWidth + subSlideMargin)*subNewSlideCount - subSlideMargin+'px';
subSlides.style.width = subNewWidth;


}
function subSetInitialPos(){
let subInitialTranslateValue = -(subSlideWidth + subSlideMargin)*subSlideCount;
subSlides.style.transform = 'translateX('+ subInitialTranslateValue+'px)';
}

let subTimer = undefined;

function subAutoSlide(){
if(subTimer == undefined){
    subTimer = setInterval(()=>{
        subMoveSlide(subCurrentIdx + 1);
    },3000);
}
}
subAutoSlide();

subPrevBtn.addEventListener('click',()=>{
subMoveSlide(subCurrentIdx - 1);
clearInterval(subTimer)
subTimer = undefined;
subAutoSlide();
});
subNextBtn.addEventListener('click',()=>{
subMoveSlide(subCurrentIdx + 1);
clearInterval(subTimer)
subTimer = undefined;
subAutoSlide();
});

function subStopSlide(){
clearInterval(subTimer);
subTimer = undefined;

}
subSlides.addEventListener('mouseenter',()=>{
subStopSlide();
});
subSlides.addEventListener('mouseleave',()=>{
subAutoSlide();
});
function subMoveSlide(num){
subSlides.style.left = -num * (subSlideWidth + subSlideMargin) + 'px';


subCurrentIdx = num;

if(subCurrentIdx == subSlideCount ||subCurrentIdx == -subSlideCount){
    setTimeout(()=>{
        subSlides.classList.remove('animated');
        subSlides.style.left = '0px';
        subCurrentIdx = 0;
    },500);
    setTimeout(() => {
        subSlides.classList.add('animated');
    },600);
}
}


// -----------------------------마우스 이벤트

function cursor(){
imgName = document.querySelectorAll('.btm4_img, .img_name')

for(i=0;i<imgName.length; i++){
    let img
    let next_img
    let before_img
    if(i%2==0){
        img = imgName[i]
        next_img = imgName[i+1]
        img.addEventListener('mouseover',()=>{
            img.classList.add('on')
            next_img.classList.add('on')
        })}
    else{
        img = imgName[i]
        before_img = imgName[i-1]
        img.addEventListener('mouseover',()=>{
            img.classList.add('on')
            before_img.classList.add('on')
        })
        }
}
}
cursor()

function cursorout(){
imgName = document.querySelectorAll('.btm4_img, .img_name')

for(i=0;i<imgName.length; i++){
    let img
    let next_img
    let before_img
    if(i%2==0){
        img = imgName[i]
        next_img = imgName[i+1]
        img.addEventListener('mouseout',()=>{
            img.classList.remove('on')
            next_img.classList.remove('on')
        })}
    else{
        img = imgName[i]
        before_img = imgName[i-1]
        img.addEventListener('mouseout',()=>{
            img.classList.remove('on')
            before_img.classList.remove('on')
        })
        }
}
}
cursorout()

// ----------------------------------스크롤 이벤트

// function scroll_event(){
//     let nowScroll = document.documentElement.scrollTop;
//     let scroll = nowScroll;
//     console.log(scroll)
//     // 1256px 안보여하는시점
//     // 1356px 보여야하는 시점
// }
// window.addEventListener('scroll',scroll_event());


const saElementList = document.querySelectorAll('.sa');

const saFunc = function() {
for (const element of saElementList) {
if (!element.classList.contains('show')) {
  if ( 670 > element.getBoundingClientRect().top) {
    element.classList.add('show');
  }
}
}
}
const saFuncout = function() {
for (const element of saElementList) {
  if (element.classList.contains('show')) {
    if ( 670 < element.getBoundingClientRect().top) {
      element.classList.remove('show');
    }
  }
}
}

window.addEventListener('scroll', saFunc);
window.addEventListener('scroll', saFuncout)

const subBtn = document.querySelectorAll('.qr');
const subBtn_01 = function() {
for(const element of subBtn){
    if(!element.classList.contains('subShow')){
        if(600 > element.getBoundingClientRect().top){
            element.classList.add('subShow')
        }
    }
}
}
const subBtn_01out = function() {
for(const element of subBtn){
    if(element.classList.contains('subShow')){
        if(600<element.getBoundingClientRect().top){
            element.classList.remove('subShow')
        }
    }
}
}
window.addEventListener('scroll', subBtn_01);
window.addEventListener('scroll', subBtn_01out);

// -------------sub bottom
var index = 0;
var width = 0;
var bar = 0;
var rolling;
slider(0); 
function slider(n) {
 let subBtm2 = document.querySelectorAll('.sub-btm2>ul>li');

 if (index >= subBtm2.length) {
     index = 0;
 }

 if (n != undefined) {
     index = n;
 }

 for (i = 0; i < subBtm2.length; i++) {
     if (i == index) {
        subBtm2.item(i).classList.add('on')
        // subBtm2.item(i).setAttribute('class', 'main_baneer on');
     } else {
        subBtm2.item(i).classList.remove('on')
        // subBtm2.item(i).setAttribute('class', 'main_baneer');
     }
 }
 index++;
}
function sliderBtn(n) {
 clearInterval(rolling);
 slider(n);
 rolling = setInterval(slider, 3000);
}
 rolling = setInterval(slider, 3000);

//  클릭이벤트 공지사항 수강 후기---------------

 function subClick() {
    let subMf3 = document.querySelector('.sub_mf3');
    let subMf4 = document.querySelector('.sub_mf4');
    let btmNmae1 = document.querySelector('.btm_name1')
    let btmNmae2 = document.querySelector('.btm_name2')

    btmNmae1.addEventListener('click',()=>{
        btmNmae1.classList.add('on') //none
        btmNmae2.classList.remove('on') //block
        subMf3.classList.remove('on') //none
        subMf4.classList.remove('on') //block
    })
    btmNmae2.addEventListener('click',()=>{
        btmNmae1.classList.remove('on') //none
        btmNmae2.classList.add('on') //block
        subMf3.classList.add('on') //block
        subMf4.classList.add('on') //none
    })
}
subClick()
window.onload = function(){
    setTimeout(()=>{
        window.open('/test/test', '_blank', 'width=700, height=700'); return false;
    },12000)
}

setTimeout(()=>{
    let io = document.querySelector('#io')
    io.style.display = 'none';
},12000)
   