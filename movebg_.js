//가로스크롤 - 스크롤 텍스트

(function(){
    let galleryWrapper=document.querySelectorAll('.hero_gallery_wrapper');
    
    let scroll={
        current:[],
        target:[],
        ease:0.05,
        speed:0.25,
        limit:[]
    }
    
    
    let init=()=>{
        onResize();
        initAnimation();
    }  
    
    
    let onResize=()=>{
        galleryWrapper.forEach((wrapper,index)=>{
            let galleryWidth=wrapper.getBoundingClientRect().width; //넓이값 뽑아내기
            //console.log(galleryWidth)
            scroll.limit[index]=galleryWidth - window.innerWidth;
        })
    }
    
    let initAnimation=()=>{
        galleryWrapper.forEach((wrapper,index)=>{
            scroll.current[index]=0;
            scroll.target[index]=0;
        })
    }
    
    
    let onscroll=function(e){
        let speed=e.deltaY; //마우스휠을 올릴때와 내릴때 값
        //console.log(speed)
    
        galleryWrapper.forEach((wrapper,index)=>{
            if(index%2==0){
                scroll.target[index] += speed * scroll.speed; //스크롤 속도조절
            }else{
                scroll.target[index] -= speed * scroll.speed; //스크롤 속도조절
            }
        })
        return speed;
    }
    
    function clamp(max,number){
        return Math.min(number,max);
    }
    
    function lerp(p1,p2,p3){
        return p1+(p2 - p1)*p3;
    }
    
    let update=()=>{
        galleryWrapper.forEach((wrapper,index)=>{
            scroll.target[index]=clamp(scroll.limit[index],scroll.target[index])
            //console.log(scroll.target)
            scroll.current[index]=lerp(scroll.current[index],scroll.target[index],scroll.ease)
            scroll.current[index]=parseFloat(scroll.current[index].toFixed(2)) //parseFloat 실수
            //console.log(scroll.current)
            wrapper.style.transform=`translate3d(${-scroll.current[index]}px,0,0)`
        })
    
        window.requestAnimationFrame(update)
    }
    
    update ();
    
    
    window.addEventListener('resize', onResize)
    window.addEventListener('wheel', onscroll)
    window.addEventListener('load', ()=>{
        init();
    })
    })()
    
    
    