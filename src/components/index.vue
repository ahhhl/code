<template>
<div>
   <div class="index-content" id="my" v-cloak>
        <div class="container" style="word-break: break-all;">
            <p class="container_p1">题目信息</p>
            <p v-for="(item,index) in questionsArry" :key="index" v-show="index==flag" class="container_p2">{{index+1}}.
                {{item}}</p>
            <ul class="list-group">
                <li class="list-group-item" v-for="(item,index) in chooseArry" :key="index" v-show="index==flag">
                    <template v-for='(value,indexs) in item'>
                        <li class="list-group-item" @click="getChoose(index,indexs)" :key="indexs"  :class="{'chooseStyle':indexs==styleFlag}">{{indexs+1}}.&nbsp;&nbsp;{{value}}</li>
                </template>
                <div style="margin-top: 10px;float: right">
                    <button type="button" class="btn btn-info btn-sm" @click="backQuestion(index)" v-show="flag!=0">上一题</button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-success btn-sm" @click="nextQuestion(index)" v-show="flag!=questionsArry.length-1">下一题</button>
                    <button type="button" class="btn btn-mybtstyle btn-sm" @click="submit()" v-show="flag==questionsArry.length-1">提交</button>
                </div>
                </li>
            </ul>
            <div class="container">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped"  :style="{width:progress+'%'}" >{{progress}}%</div> 
                </div>
                <div style="float: right;">{{flag+1}}/{{questionsArry.length}}</div>
            </div>

        </div>
        <div class="banner">
                <img src="img/logo.gif" class="banner_img">
                <footer></footer>
        </div>
    </div>
</div>
</template>

<script>
import { log } from 'util';
export default {
 data() {
  return {
      name: 'sonia',
            num: 0,//轮播标记
            flag:0,//做题标记
            progress:"",//进度条宽度,
            styleFlag:960519152,//选中的标记 
            answerMap:new Map(),
            imges: [
                    // 'img/banner1.jpg',
                    // 'img/banner2.jpg',
                    'img/banner3.jpg',
                    'img/banner4.jpg',
                    // 'img/banner5.jpg',
                    // 'img/logo.gif',
                ],
            imgess: [
                'img/logo.gif',
            ],    
            questionsArry: ["精力充沛吗吗？精力力吗？精力力充沛吗沛吗精力充沛吗精力充沛吗", "容易疲乏吗？", "说话声音体弱无力吗？", "感到闷闷不乐，情绪低沉吗？",
                             "比一般人耐受不了寒冷吗？", "能适应外界自然和社会环境的变化？", "容易失眠吗？", "容易忘事（健忘）吗？"],
            chooseArry: [["第一题没有（根本不）不）1", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第二题没有（根本不）2", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第三题没有（根本不）3", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第四题没有（根本不）4", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第五题没有（根本不）5", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第六题没有（根本不）6", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第七题没有（根本不）7", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"],
                        ["第八题没有（根本不）8", "很少（有一点）", "有时（有些）", "经常（相当）", "总是（非常）"]],
            answer:[]
  }
 },
 methods: {   //方法
            numChange() {
                if (this.num == this.imges.length-1) {
                    this.num = 0;
                }else{
                    this.num++;
                }  
            },
            timeChange() {
                setInterval(this.numChange, 3000);
            },
            //上一题
            backQuestion(index){  
                if(this.flag==0){//当下标为0时，停止--
                    this.flag=0;
                }else{
                    this.flag--;
                }
                //修改进度条进度
                this.progress=Math.round((this.flag*100/(this.questionsArry.length-1)));
                //还原
                //this.styleFlag=960519152;
                this.styleFlag=this.answerMap.get(index-1);
            },
            //下一题
            nextQuestion(index){
                //console.log("这是下标为"+index+"的题");              
                if(this.answerMap.get(index)>=0){
                    if(this.flag==this.questionsArry.length-1){ //当下标和题目数组长度-1相等时，重置此标记为数组长度，防止数组超出范围
                        this.flag=this.questionsArry.length-1; //小标要比长度少一位，所以把长度-1 把值给下标
                    }else{
                        this.flag++;             
                    }
                    //修改进度条进度
                    this.progress=Math.round(((this.flag)*100/(this.questionsArry.length-1)));
                    //如果是最后一条则进行弹出框提示已经完成 
                    if(index==this.questionsArry.length-1){
                        this.$message({
                            message: '提交成功！',
                            type: 'success',
                            center: true
                          });
                          console.log(this.answerMap);
                          let answerInfo="";
                          for(let[key,val] of this.answerMap){
                                console.log(key+"******"+val);
                                //answerInfo+="下标为"+key+"的题目,选项下标为"+val+"***********";
                                switch (val) {
                                    case 0:
                                        val='A'
                                        break;
                                    case 1:
                                        val='B'
                                        break;
                                    case 2:
                                        val='C'
                                        break;
                                    case 3:
                                        val='D'
                                        break;
                                    case 4:
                                        val='E'
                                        break;
                                }
                                this.answer.push(val)
                                answerInfo+="第"+(key+1)+"题:"+(val)+"；";
                          }
                          alert(answerInfo)
                          console.log(this.answer);
                          console.log(answerInfo);
                    }else{
                        //如果不是最后一条值则把下一题的下标给他
                        this.styleFlag=this.answerMap.get(index+1);
                    }
                }else{  //如果此题没有进行选择，那么就不能继续进行（flag也不能在进行累加）
                    this.$message({
                        message: '当前题目未选择！',
                        type: 'warning'
                      });
                    return false;
                }          
            },
            //选择
            getChoose(index,indexs){
                console.log("这是下标为"+index+"的题,选择的是下标为"+indexs+"项答案");
                //将已选中的下标传过来，并把值赋予给我们声明的标记，让表达式成立，因为下标是唯一的，就保证了样式的唯一性
                this.styleFlag=indexs;
                //this.nextQuestion();
                //var info=document.getElementById("list-group-item-id").getElementsByTagName("li");  
                //将题号和选项放入map对象
                this.answerMap.set(index,indexs);
            },
            //提交
            submit(){
                //判断最后一题是否做了
                this.nextQuestion(this.questionsArry.length-1);  
                this.answer=[]
            }
        },
        mounted: function () {//生命周期函数 每次进入就会调用
            this.timeChange();
        }
}
</script>

<style>
[v-cloak] {  /*解决第一次进入页面时出现代码等待渲染的情况*/
    display: none !important;
}
*{
    margin:0;
    padding:0;
    font-size: 0.8rem;
}
body {
    font-size: 14px;
    background: #fff;
    overflow-y:scroll;
    overflow-x:hidden;
}
html,body {
    max-width:720px;
    height:100%;
    margin:0 auto;
}
.index-content .banner {
    position: relative;
}
.index-content .banner img {
    width: 100%;
    margin: 0;
    padding: 0;
}
.index-content .index-category {
    margin-top: 5%;
}
.index-content .index-category .category label {
    display: block;
    padding: 10% 0;
    color: #999;
}
.container_p1{
    margin-top:20px;
    font-size: 1.2rem;
}
.container_p2{
    line-height: 25px;
    color: #ff6000;
    letter-spacing: 1.2px;
    font-size: 1rem;
}
.progress{
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
}
.banner_img{
    position: absolute;
    bottom: 0;
    top:30px;
}
.btn-mybtstyle{
    background: #ff6000;
    border: 1px solid #ff6000;
}
.chooseStyle{
    color: #ff6000;
    border-right-color: #ff6000 !important;
    border-right-width: 3px !important;
}
.el-message-box{
    position: absolute;
    top: 30%;
    left: 20%;
    width: 60% !important;
    height:120px !important;
}
.el-message-box__content{
    padding: 5px 15px !important;
}
.el-message-box__btns{
    padding: 0px 15px 0 !important;
}
.el-icon-close{
    display:none !important;
}
.el-button--primary{
    padding: 6px 11px ;
    background: #ff6000 !important;
    border: 1px solid #ff6000 !important;
}
.el-message-box__title >span{
    font-size: 1rem;
    letter-spacing: 1.5px;
}
.el-message-box__message p{
    text-align: center;
    padding-right: 20px;
    letter-spacing: 1px;
}
.progress-bar{
    background: #ff6000;
}
</style>