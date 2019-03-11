window.onload=function () {
    var allLis=$('tab_head').getElementsByTagName('li');
    var alldom=$('tab_foot').getElementsByClassName('dom');
     for(var i=0;i<allLis.length;i++){
         var li=allLis[i];
         li.index=i;
         li.onmouseover=function () {
           for(var j=0;j<allLis.length;j++){
               allLis[j].className='';
               alldom[j].style.display='none';
           }
           this.className='select';
           alldom[this.index].style.display='block';
         }
     }
};
function $(id) {
    return typeof  id==='string'?document.getElementById(id):null;

}