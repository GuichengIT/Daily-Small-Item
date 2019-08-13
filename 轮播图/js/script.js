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
    menuItemLen=menuItems.length;//主菜单项目的个数

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

//方法一：
//鼠标滑过主菜单显示子菜单(mouseover和mouseout事件不适合利用事件委托)
for(let i=0;i<menuItemLen;i++){ //这个地方只能有let不能用var，如果用var那么subInnerBoxs[i].style.display = "block";
    //中的i就是全局i了，在调用这个事件处理程序时全局i是什么这里的i就是什么，很明显这是不符合要求的。但是使用let后每一次循环实际上都是
    //新的变量i，在调用这个事件处理程序时，i就是当时循环时i的值而不是全局i，符合要求。
    addHandler(menuItems[i], "mouseover", function(event){
        // 显示子菜单所在的背景
        subMenu.className = "sub-menu";
        // 隐藏所有的子菜单
        for(let j=0;j<menuItemLen;j++){
            subInnerBoxs[j].style.display = "none";
        }
        // 显示当前触发的子菜单
        subInnerBoxs[i].style.display = "block";


});
}

// 模拟鼠标滑过主菜单事件
// 创建事件对象
var event= document.createEvent("MouseEvents");
// 初始化事件对象
event.initMouseEvent("mouseover",true,true,document.defaultView,
    0,0,0,0,0,false,false,
    false,false, 0, null);
// 触发事件
// menuItems[0].dispatchEvent(event);
// menuItems[1].dispatchEvent(event);


//方法二：
//鼠标滑过主菜单显示子菜单(mouseover和mouseout事件不适合利用事件委托)
// for(var i=0, idx;i<menuItemLen;i++){
//     menuItems[i].setAttribute("data-index",i);
//     addHandler(menuItems[i], "mouseover", function(){
//     //    显示子菜单所在的背景
//         subMenu.className = "sub-menu";
//     //    获取当前主菜单的索引
//         idx = this.getAttribute("data-index");
//     //    隐藏出当前触发菜单项目的其它项目子菜单
//         for(let j=0;j<menuItemLen;j++){
//             subInnerBoxs[j].style.display = "none";
//         }
//    //    显示触发的主菜单项目对应的子菜单
//         subInnerBoxs[idx].style.display = "block";
//     });
// }


// 鼠标滑出主菜单隐藏子菜单
// addHandler(menuContent,"mouseout",function(event){
//     for(let i=0,menuItemLen = menuItems.length;i<menuItemLen;i++){
//         if(event.target === menuItems[i]){
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

