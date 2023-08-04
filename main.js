//7일간보이지않기(쿠키)
let currentCookie=document.cookie;
let cookieCheck=currentCookie.indexOf('violet');
//console.log(cookieCheck)


if(cookieCheck>-1){
    document.querySelector('.cookie').style.display="none";
}else{
    document.querySelector('.cookie').style.display="block";
}


document.querySelector('.day_7').addEventListener("click",()=>{
    let date=new Date();
    date.setDate(date.getDate() + 7); //getDate 오늘날짜 뽑아짐

    let setCookie= "CookieName=violet;";
        setCookie += "expires="+ date.toUTCString();
        //console.log(setCookie)

    document.cookie=setCookie;
})


document.querySelector('.close').addEventListener('click',function(e){
    e.preventDefault();

    //console.log(this)
    this.parentElement.style.display="none";
})






//SVG 스퀘어
$('.animate').scrolla({
    // default
    mobile: false, // 모바일 버전에서 활성화
    once: false, // 스크롤시 한 번 또는 여러번 실행 설정
    animateCssVersion: 4 // animate.css 버전 (3 or 4)
});



//전체화면 세로,가로 스크롤 조절
gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector(".top");

//SMOOTH SCROLL
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed"
});

////////////////////////////////////
// ScrollTrigger 사용을 위해 gsap 라이브러리의 플러그인을 등록합니다.
window.addEventListener("load", function () {
    let pinWrap = document.querySelector(".horizon");
    let pinWrapWidth = pinWrap.scrollWidth /*  - window.innerWidth */ ;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  
    gsap.to(".horizon", {
      scrollTrigger: {
        scroller: window, // 스크롤 대상 (window)
        scrub: true,
        trigger: ".horizon-wrap",
        pin: true,
        start: "top top",
        end: "+=" + pinWrapWidth, // 트리거 요소의 너비만큼 가로로 이동
      },
      x: -horizontalScrollLength,
      ease: "none",
    });
  
  });



//intro - name
$(function() {
  var text = $(".name");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      text.removeClass("hidden");
    } else {
      text.addClass("hidden");
    }
  });
});


//intro - name 사라지게
let introName=()=>{
  let introName=document.querySelector('.name_wrap');
  pageYOffset>800?introName.style.opacity="0":introName.style.opacity="1";
}
window.addEventListener("scroll",introName)



//scroll icon 사라지게
let scrollIcon=()=>{
  let scrollIcon=document.querySelector('.scroll_icon');
  pageYOffset>580?scrollIcon.style.opacity="0":scrollIcon.style.opacity="1";
}
window.addEventListener("scroll",scrollIcon)



//profile 오른쪽 text splitting
let hero=document.querySelector('.hero');
let heroTitles=document.querySelectorAll('.hero_row_text>h2');
let heroSubTitles=document.querySelectorAll('.hero_row_text>h4');
let heroSeparator=document.querySelectorAll('.hero_row_speparator');
let heroMedia=document.querySelector('.hero_media');
let onenter=false;


const initHero=()=>{
    gsap.set(heroTitles,{y:'101%', opacity:1});
    gsap.set(heroSubTitles,{opacity:0});
    gsap.set(heroSeparator,{width:0});
    gsap.set('.cell',{opacity:1});

    showHero();
}
const showHero=()=>{
    var tl = gsap.timeline();
    tl.to(heroTitles, {y: 0,duration: 1,ease: "expo.out",stagger:0.2})
    tl.to(heroSubTitles, {opacity: 1, duration: 1,ease: "expo.in",stagger:0.2},-0.2)
    tl.to(heroSeparator, {width: '100%', duration: 1.5,ease: "expo.in",stagger:0.2},-0.2)
    tl.fromTo('.cell',{height:0,scale:0.5},{duration:1.25, height:'100%',scale:1,stagger:0.025,ease:'expo.inOut'})

};

const splitAnimation=()=>{
    Splitting({
        target:heroMedia,
        by:'cells',
        image:true,
        rows: 5
    })
}


const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!onenter && entry.isIntersecting) {
      splitAnimation();
      initHero();
      showHero();
      onenter = true;
      observer.unobserve(entry.target);
    }
  });
};

window.addEventListener('load', () => {
  const observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '-300px 0px', // Trigger 300px before the element enters the viewport
  });
  observer.observe(hero);
});



//프로필 오른쪽 클릭이미지+배경
let wrap=document.querySelector('.newspaper');
let imgs=document.querySelectorAll('.newspaperWrap .hb');

wrap.addEventListener('mouseenter',()=>{
  for(let i=0; i<imgs.length; i++){
      imgs[i].style.transform=`translate(80px)`;
      imgs[i].style.transition='0.5s';
  }
})

wrap.addEventListener('mouseleave',()=>{
    for(let i=0; i<imgs.length; i++){
        imgs[i].style.transform=`translate(0px)`;
        imgs[i].style.transition='0.5s';
    }
})



//introduce_img_slide
let buttons=document.querySelectorAll('button');
let contentWrap=document.querySelectorAll('.contentWrap');
let imgArr=document.querySelectorAll('img');
let title=document.querySelector('h2');
let pageNum=0;
let totalNum=0;
totalNum=contentWrap.length; //3



buttons[0].addEventListener('click',function(){
    preFunc();
})
buttons[1].addEventListener('click',function(){
    nextFunc();
})

function preFunc(){
    if(pageNum>0){
        pageNum--;
    }else{
        pageNum=totalNum - 1;
    }
    pageSetFunc();
}
function nextFunc(){
    if(pageNum<totalNum -1){
        pageNum++;
    }else{
        pageNum=0;
    }

    pageSetFunc();
}

function pageSetFunc(){
    imgArr.forEach((img)=>{
        img.classList.remove('active');
    })
    contentWrap[pageNum].querySelectorAll('img').forEach((img)=>{
        img.classList.add('active');
    })

    title.innerHTML=`PAGE:${pageNum + 1}`;
}

pageSetFunc();





//about 탭
let tabBtns = document.querySelectorAll('.tab_tit ul li');
let tabWraps = document.querySelectorAll('.tab_tit_desc .tab_wrap');

tabBtns.forEach((tabBtn, index) => {
    tabBtn.addEventListener('click', (e) => {
        e.preventDefault();
        tabWraps.forEach((tabWrap, i) => {
            if (index === i) {
                tabWrap.style.opacity = '1';
                tabWrap.style.transform = 'translateY(20px)';
            } else {
                tabWrap.style.opacity = '0';
                tabWrap.style.transform = 'translateY(-50px)';
            }
        });
    });
});




//스킬바
let executed = false;
let executed3 = false;

    $(window).scroll(function() {
        let $scroll = $(this).scrollLeft();
        let $offset = $('.sec_03').offset().left - 1000;
        let $skillBars = $('.chart');

        if ($scroll > $offset) {
            if (!executed) {
                executed = true;

                $('.easypiechart .container .box h2, .easypiechart .container .box h3').css('display', 'block');
                pieChart();

                $skillBars.each(function() {
                    let current = $(this);
                    let target = current.attr('data-percent');

                    $({ rate: 0 }).animate({ rate: target }, {
                        duration: 2500,
                        progress: function() {
                            let now = this.rate;
                            current.data('easyPieChart').update(now); // Update the progress of the easyPieChart
                            current.siblings('h3').text(Math.ceil(now) + "%");
                        }
                    });
                });
            }
        }


    if ($scroll > $offset) {
      if (!executed3) {
          $('.skill-per').each(function(){
              let $this = $(this);
              let per = $this.attr('per');
              let num = $this.attr('num'); // num 속성의 값을 가져옴
              
              $({aniValue:0}).animate({aniValue: per}, {
                  duration: 1000,
                  step: function(){
                      $this.css({ width: this.aniValue + "%" });
                  },
                  complete: function() {
                      $this.next('.skill-text').text(Math.ceil(per * num) + "년");
                  }
              });
          });
          executed3 = true;
      }
  }

});

    function pieChart() {
        $('.chart').easyPieChart({
            //easypiechart 깃헙 복붙
            barColor: '#9166b2',
            scaleColor: false,
            trackColor: '#2e1942',
            lineWidth: 12,
            size: 100,
            animate: 2000,
            lineCap: "round", // butt, round, square 중 선택가능
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.ceil(percent) + "%");
            }
        });
    }




//fix_menu
let fixBtn=document.querySelector('.fix_menu');
let showCont=document.querySelector('.menu_cont');

fixBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const currentOpacity = showCont.style.opacity;

  if (currentOpacity === '1') {
    showCont.style.opacity = '0';
    showCont.style.transform = 'translateY(-20%)';
  } else {
    showCont.style.opacity = '1';
    showCont.style.transform = 'translateY(0%)';
  }
})

$(document).ready(function() {
  let sec1Offset = $('.horizon-wrap .sec_01').offset().top - 300;
  let fixMenuWrap = $('.fix_menu_wrap');

  $(window).scroll(function() {
    let scrollTop = $(this).scrollTop();
    

    if (scrollTop > sec1Offset) {
      fixMenuWrap.show();
    } else {
      fixMenuWrap.hide();
    }
  });
});





//WEB slick
let hCont = $('.cider_bottle');
let hBtn = $('.history_btn li');
let hIndex;

hCont.slick({
  dots: true,
});

// 버튼을 클릭하면 해당 index를 찾아서 가기
hBtn.click(function (e) {
    e.preventDefault();
    
    let target = $(this);
    let index = target.index();
    //console.log(index)

    if (index == 0) {
        hIndex = 0
    } else if (index == 1) {
        hIndex = 1
    } else if (index == 2) {
        hIndex = 2
    } else if (index == 3) {
        hIndex = 3
    } else if (index == 4) {
        hIndex = 4
    } else if (index == 5) {
      hIndex = 5
    } else if (index == 6) {
      hIndex = 6
    } else if (index == 7) {
      hIndex = 7
    } else if (index ==8) {
      hIndex = 8
    }
    //console.log(hIndex)
    hCont.slick('slickGoTo', hIndex);

    hBtn.removeClass('active')
    target.addClass('active')
})

hCont.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    //console.log(nextSlide);
    if (nextSlide >= 0 && nextSlide <= 0) {
        hBtn.removeClass('active')
        hBtn.eq(0).addClass('active')
    } else if (nextSlide >= 1 && nextSlide <= 1) {
        hBtn.removeClass('active')
        hBtn.eq(1).addClass('active')
    } else if (nextSlide >= 2 && nextSlide <= 2) {
        hBtn.removeClass('active')
        hBtn.eq(2).addClass('active')
    } else if (nextSlide >= 3 && nextSlide <= 3) {
        hBtn.removeClass('active')
        hBtn.eq(3).addClass('active')
    } else if (nextSlide >= 4 && nextSlide <= 4) {
        hBtn.removeClass('active')
        hBtn.eq(4).addClass('active')
    } else if (nextSlide >= 5 && nextSlide <= 5) {
      hBtn.removeClass('active')
      hBtn.eq(5).addClass('active')
    } else if (nextSlide >= 6 && nextSlide <= 6) {
      hBtn.removeClass('active')
      hBtn.eq(6).addClass('active')
    } else if (nextSlide >= 7 && nextSlide <= 7) {
      hBtn.removeClass('active')
      hBtn.eq(7).addClass('active')
    } else if (nextSlide >= 8 && nextSlide <= 8) {
      hBtn.removeClass('active')
      hBtn.eq(8).addClass('active')
    }


});



//etc tit
let allText=document.querySelectorAll('.text-etc');
let delay=0;

//allText.forEach(function(el,idx){}); //el(각각의 아이템), idx(아이템의 인덱스번호)
allText.forEach((el,idx)=>{
    el.style.animationDelay=`${delay}s`;
    el.style.zIndex=allText.length - idx;
    el.classList.add('base-ani');

    delay += 0.15;
});



document.getElementById('five').addEventListener('mousemove',(e)=>{
    let innerWidth=window.innerWidth; //viewport의 넓이값
    let innerHeight=window.innerHeight; //viewport의 넓이값
    let clientX=e.clientX;
    let clientY=e.clientY;
    //console.log(clientX,clientY)

    let percentX=clientX/innerWidth;
    //console.log(percentX)
    let maxRangeX=innerWidth*0.15;
    let minX=innerWidth/2 - maxRangeX;
    let maxX=innerWidth/2 + maxRangeX;
    let difX=maxX - minX;
    let pxOffset=difX*percentX;

    let left=minX + pxOffset;


    let percentY=clientY/innerHeight;
    //console.log(percentX)
    let maxRangeY=innerHeight*0.1;
    let minY=innerHeight/20 - maxRangeY;
    let maxY=innerHeight/20 + maxRangeY;
    let difY=maxY - minY;
    let pxOffsetY=difY*percentY;

    let top=minY + pxOffsetY;



    allText.forEach((el,idx)=>{
        //el.animate([],{})

        el.animate([
            {top:`${top}px`, left:`${left}px`}
        ],{
            duration:100, fill:'forwards', delay:idx * 50
        })
    })
})



//시간
setInterval(function(){
  let today=new Date();

  let hh=addZero(today.getHours());//시
  let mm=addZero(today.getMinutes());//분
  let ss=addZero(today.getSeconds());//초
  let YY=today.getFullYear();

  document.querySelector("#hours").innerHTML=hh;
  document.querySelector("#min").innerHTML=mm;
  document.querySelector("#sec").innerHTML=ss;
  //console.log(ss)

  function addZero(num){
      return(num<10?"0"+num:''+num) //10보다 작은면 "0"을 addZero값에 넣어라
  }

},1000)





//디자인 스티키영역
let scrollBody = document.querySelector('.design'),
    scrollHeight, //스크롤의 높이값
    sectionOffsetTop, //영역(top_box)의 높이값 = design 머리가 닿는 지점
    sectionScrollTop,
    scrollRealHeight, //실제로 스크롤 해야할 높이
    winScrollTop, //스크롤바의 높이를 담을 변수
    scrollPercent, //스크롤 백분율값
    percent;


let inMobile;
function scrollFuc(){
    setProperty();

    if(inMobile){
        contentInMobile();
    }else{
        contentIn();
    }
}


function setProperty(){
    scrollHeight=scrollBody.offsetHeight; //.design의 높이값 
    sectionOffsetTop=scrollBody.offsetTop; //문서에서 .design 위까지의 높이값
    scrollRealHeight=scrollHeight - window.innerHeight;
    winScrollTop=pageYOffset;
    sectionScrollTop=winScrollTop - sectionOffsetTop; //내 영역안에서 스크롤 얼마나 내렸는지 확인값
    scrollPercent=sectionScrollTop/scrollRealHeight;
    percent=scrollPercent*100;
    console.log(percent)

    contentIn();
}


function contentIn(){
    let deviceImg=document.querySelectorAll('.slidee div');
    let imgWidth=deviceImg[0].offsetWidth; // figure 하나의 넓이값


    if(percent>=460 && percent<540){
        document.querySelector('.design div.de01').classList.add('active')
        imgChange(imgWidth*0)
    }
    if(percent>=540 && percent<580){
        document.querySelector('.design div.de02').classList.add('active')
        imgChange(imgWidth*1)
    }
    if(percent>=580){
        document.querySelector('.design div.de03').classList.add('active')
        imgChange(imgWidth*2)
    }

    if(percent<460){
        document.querySelector('.design div.de01').classList.remove('active')
        document.querySelector('.design div.de02').classList.remove('active')
        document.querySelector('.design div.de03').classList.remove('active')
    }
}



function imgChange(moveX){
    let img=document.querySelector('.slide_wrap .slidee');
    img.style.transform=`translateX(${-moveX}px)`
}




window.addEventListener('scroll',function(){
    scrollFuc();
})
window.addEventListener('resize',function(){
    scrollFuc();
})

scrollFuc();




//라이트갤러리 01
let slideIndex=1;


function openModal1(){
    document.getElementById('myModal1').style.display="block";
}

function closeModal1(){
    document.getElementById('myModal1').style.display="none";
}

function plusSlides(n){
    showSlides(slideIndex += n)
}


//현재 페이지 연결
function currentSlide(n){
    showSlides(slideIndex = n)
}
function showSlides(n){
    let slides = document.getElementsByClassName('mySlides1');
    let dots = document.getElementsByClassName('demo');


    console.log(n)
    console.log('slides.length',slides.length)
    if(n>slides.length){slideIndex=1}
    if(n<1){slideIndex = slides.length}

    for(let i=0; i<slides.length; i++){
        slides[i].style.display="none";
    }
    for(let i=0; i<dots.length; i++){
        dots[i].classList.remove('active'); // active붙은 이미지는 opacity1 효과
    }

    slides[slideIndex - 1].style.display="block";

}




//라이트갤러리 02
let slideIndex2=1;

function openModal2(){
    document.getElementById('myModal2').style.display="block";
}

function closeModal2(){
    document.getElementById('myModal2').style.display="none";
}

function plusSlides2(n){
    showSlides2(slideIndex2 += n)
}


//현재 페이지 연결
function currentSlide2(n){
    showSlides2(slideIndex2 = n)
}
function showSlides2(n){
    let slides2 = document.getElementsByClassName('mySlides2');
    let dots2 = document.getElementsByClassName('demo2');


    if(n>slides2.length){slideIndex2=1}
    if(n<1){slideIndex2 = slides2.length}

    for(let i=0; i<slides2.length; i++){
        slides2[i].style.display="none";
    }
    for(let i=0; i<dots2.length; i++){
        dots2[i].classList.remove('active'); // active붙은 이미지는 opacity1 효과
    }

    slides2[slideIndex2 - 1].style.display="block";

}




//라이트갤러리 03
let slideIndex3=1;

function openModal3(){
    document.getElementById('myModal3').style.display="block";
}

function closeModal3(){
    document.getElementById('myModal3').style.display="none";
}

function plusSlides3(n){
    showSlides3(slideIndex3 += n)
}


//현재 페이지 연결
function currentSlide3(n){
    showSlides3(slideIndex3 = n)
}
function showSlides3(n){
    let slides3 = document.getElementsByClassName('mySlides3');
    let dots3 = document.getElementsByClassName('demo3');


    if(n>slides3.length){slideIndex3=1}
    if(n<1){slideIndex3 = slides3.length}

    for(let i=0; i<slides3.length; i++){
        slides3[i].style.display="none";
    }
    for(let i=0; i<dots3.length; i++){
        dots3[i].classList.remove('active'); // active붙은 이미지는 opacity1 효과
    }

    slides3[slideIndex3 - 1].style.display="block";

}






//contact
(function(){
	$(".flex-slide").each(function(){
		$(this).hover(function(){
			$(this).find('.flex-title').css({
				transform: 'rotate(0deg)',
				top: '10%'
			});
			$(this).find('.flex-about').css({
				opacity: '1'
			});
		}, function(){
			$(this).find('.flex-title').css({
				transform: 'rotate(90deg)',
				top: '15%'
			});
			$(this).find('.flex-about').css({
				opacity: '0'
			});
		})
	});
})();


