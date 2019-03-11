window.onload = function () {
    // 1. 实现瀑布流布局
    waterFull("main", "box");

    // 2. 动态加载图片
    window.onscroll = function () {
        if(checkWillLoadImage()){
            // 2.1 造数据
            var dataArr = [
                {"src": "img04.jpg"},
                {"src": "img06.jpg"},
                {"src": "img08.jpg"},
                {"src": "img09.jpg"},
                {"src": "img10.jpg"},
                {"src": "img12.jpg"},
                {"src": "img14.jpg"},
                {"src": "img16.jpg"},
                {"src": "img18.jpg"}
            ];

            // 2.2 创建元素
            for(var i=0; i<dataArr.length; i++){
                var newBox = document.createElement("div");
                newBox.className = "box";
                $("main").appendChild(newBox);

                var newPic = document.createElement("div");
                newPic.className = "pic";
                newBox.appendChild(newPic);

                var newImg = document.createElement("img");
                newImg.src = "images/" + dataArr[i].src;
                newPic.appendChild(newImg);
            }

            // 2.3 重新布局
            waterFull("main", "box");
        }
    }
};

function waterFull(parent,child) {
    //1.父盒子剧中
    var allBox=$(parent).getElementsByClassName(child);
    //拿到子盒子的宽度
    var boxWidth=allBox[0].offsetWidth;
    //获取屏幕的宽度
    var screenW=document.documentElement.clientWidth;
    //求出列数
    var cols=parseInt(screenW/boxWidth);
    //父盒子居中
    $(parent).style.width=(cols*boxWidth)+"px";
    $(parent).style.margin="0px auto";
    //2.子盒子的定位
    //找到最矮的盒子接上去
    var heightArr=[],boxHeight=0,minBoxHeight=0,minBoxIndex=0;
   //遍历子盒子
    for(var i=0;i<allBox.length;i++) {
        boxHeight=allBox[i].offsetHeight;
        if(i<cols){//第一行
            heightArr.push(boxHeight);
        }
        else{
            //剩余行
            minBoxHeight=_.min(heightArr);
            //求出最矮盒子的索引
            minBoxIndex=getMinBox(heightArr,minBoxHeight);
            //子盒子定位
            allBox[i].style.position="absolute";
            allBox[i].style.left=minBoxIndex*boxWidth+"px";
            allBox[i].style.top=minBoxHeight+"px";
            //更新高度
            heightArr[minBoxIndex]+=boxHeight;
        }
    }
}
function getMinBox(arr,val) {
    for(var i=0;i<arr.length;i++)
        if(arr[i]===val)
            return i;
}
function $(id) {
    return typeof id==="string"?document.getElementById(id):null;

}
/*判断是否具备加载盒子的条件*/
function checkWillLoadImage() {
    // 1. 获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];

    // 2. 求出最后一个盒子自身高度的一半 + offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    // 3. 求出屏幕的高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;

    // 4. 求出页面偏离浏览器的高度
    var scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;
}
