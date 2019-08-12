/*声明全局变量*/
var index=0,//当前显示图片的索引，默认值为0
    d = 0,//当前圆点的索引
    timer = null;//定时器，开启定时器后变为非空值
    main = byId("main"),
    prev = byId("prev"),
    next = byId("next"),
    pics = byId("banner").getElementsByTagName("div"),
    dot = byId("dots"),
    innerBox =  byId("inner-box"),
    menuContent = byId("menu-content");
    subMenu = byId("sub-menu"),
    menuItems = menuContent.getElementsByClassName("menu-item"),
    dots = dot.getElementsByTagName("span"),
    subInnerBoxs = innerBox.getElementsByClassName("sub-inner-box"),
    pics_cnt = pics.length;//图片的数量
    dots_cnt = dots.length;//小圆点的数量

//封装图片切换函数
function switch_pic(){
    for(var i=0;i<pics_cnt;i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    pics[index].style.display = "block";//只是这样写是看不出来图片切换的，因为第一个div始终是显示的，而overflow=hidden，所以其它的div即使是display=block那么也无法显示出来
    dots[index].className="active";
}


// 封装getElementById()
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id):id;
}


// 自动轮播
function startAutoPlay() {
    timer = setInterval(function(){
        index++;
        if(index>=pics_cnt){
            index = 0;
        }
        switch_pic();
        console.log(index);
    },3000)
}

//停止自动轮播
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

/*
* 浏览器兼容程序
* element绑定事件的DOM元素
* 事件名
* 事件处理程序
 */
function addHandler(element,type,handler){
    if(element.addEventListener){
        return element.addEventListener(type, handler);
    }else if(element.attachEvent){//IE支持DOM2级元素时
        element.attachEvent("on"+type, handler);
    }else{//ie8及以下版本时，利用DOM0级
        element["on"+type] = handler;
    }
}

//点击下一张按钮显示下一张图片
addHandler(next, "click", function () {
    index++;
    if(index>=pics_cnt){
        index = 0;
    }
    switch_pic();
});

//点击上一张按钮显示上一张图片
addHandler(prev, "click", function (){
    index--;
    if(index<0){
        index = pics_cnt-1;
    }
    switch_pic();
});

//点击圆点索引切换图片
addHandler(dot, "click", function (){
    for(let i=0;i<dots_cnt;i++){
        if(dots[i] === event.target){
            for(var j=0;j<pics_cnt;j++){
                pics[j].style.display = "none";
                dots[j].className = "";
            }
            console.log(i);
            pics[i].style.display = "block";
            dots[i].className="active";
        }
    }
});

//鼠标滑过主菜单显示子菜单(mouseover和mouseout事件不适合利用事件委托)
for(var i=0;i<4;i++){
addHandler(menuItems[i], "mouseover", function(event){
    var target = event.target;
    console.log(target);
    subInnerBoxs[1].style.display = "block";
    subMenu.className = "sub-menu";
});
}
//鼠标滑出主菜单隐藏子菜单（利用事件委托）

// addHandler(menuContent,"mouseout",function(event){
//     for(var i=0,menuItemLen = menuItem.length;i<menuItemLen;i++){
//         if(event.target === menuItem[i]){
//             subMenu.className = "sub-menu hide";
//             subInnerBoxs[i].style.display = "block";
//         }
//     }
// });



//鼠标滑入main，停止轮播
addHandler(main,"mouseover",stopAutoPlay);
//鼠标离开main，继续轮播
addHandler(main,"mouseout",startAutoPlay);
//自动开始轮播
startAutoPlay();

