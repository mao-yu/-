<template>
  <div>
    <el-row>
        <el-col :span="8" id="tableList">
            <el-tabs  v-model="activeName">
                <el-tab-pane label="点餐" name="first">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="proName" label="商品名称"></el-table-column>
                        <el-table-column width="80" prop="count" label="量"></el-table-column>
                        <el-table-column width="70" prop="price" label="金额"></el-table-column>
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                                <el-button @click="delGoods(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="addGoods(scope.row)" type="text" size="small">增加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 总计 -->
                    <div style="text-align:left;">
                        <span>总计：</span><span>{{totalprice}}元</span>
                    </div>
                    <!-- 按钮组 -->
                    <div style="margin:20px 0;">
                        <el-button type="warning" size="small">挂单</el-button>
                        <el-button type="success" size="small" @click="delAll()">删除</el-button>
                        <el-button type="danger" size="small" @click="checkOut()">结账</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
                <el-tab-pane label="结账" name="third">结账</el-tab-pane>
            </el-tabs>
        </el-col>
        <!-- 常用商品 -->
        <el-col :span="16">
            <div>
                <p class="often-title">常用商品</p>
                <ul class="leftnav">
                    <li v-for="item in oftenGoods" @click="addGoods(item)">
                        <span :data-value="item.goodsId">{{item.goodsName}}</span>
                        <span class="price">{{item.price}}元</span>
                    </li>
                </ul>
            </div>
            <div style="clear:both;">
                <el-tabs v-model="activename">
                    <el-tab-pane label="汉堡" name="first">
                       <ul class="rightnav">
                            <li v-for="item in type0Goods" @click="addGoods(item)">
                                <span style="float:left;width:40%"><img :src="item.goodsImg" style="width:100%"></span>
                                <span :data-value="item.goodsId">{{item.goodsName}}</span>
                                <span class="price">{{item.price}}元</span>
                            </li>
                        </ul> 
                    </el-tab-pane>
                    <el-tab-pane label="小食" name="second">
                        <ul class="rightnav">
                            <li v-for="item in type1Goods" @click="addGoods(item)">
                                <span style="float:left;width:40%"><img :src="item.goodsImg" style="width:100%"></span>
                                <span :data-value="item.goodsId">{{item.goodsName}}</span>
                                <span class="price">{{item.price}}元</span>
                            </li>
                        </ul> 
                    </el-tab-pane>
                    <el-tab-pane label="饮料" name="third">
                        <ul class="rightnav">
                            <li v-for="item in type2Goods" @click="addGoods(item)">
                                <span style="float:left;width:40%"><img :src="item.goodsImg" style="width:100%"></span>
                                <span :data-value="item.goodsId">{{item.goodsName}}</span>
                                <span class="price">{{item.price}}元</span>
                            </li>
                        </ul> 
                    </el-tab-pane>
                    <el-tab-pane label="套餐" name="fourth">
                        <ul class="rightnav">
                            <li v-for="item in type3Goods" @click="addGoods(item)">
                                <span style="float:left;width:40%"><img :src="item.goodsImg" style="width:100%"></span>
                                <span :data-value="item.goodsId">{{item.goodsName}}</span>
                                <span class="price">{{item.price}}元</span>
                            </li>
                        </ul> 
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </el-row> 
  </div>
</template>
<script>
export default {
    data(){
        return {
          activeName: 'first' ,
          activename: 'first' ,
          totalprice:0,
          tableData: [],
          oftenGoods:[],
          type0Goods:[],
          type1Goods:[],
          type2Goods:[],
          type3Goods:[]
        }
    },
    mounted(){
        var innerHeight=document.body.clientHeight;
        document.getElementById("tableList").style.height=innerHeight+'px';
    },
    created(){
        this.$http.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(response=>{
            this.oftenGoods=response.body;
        })
        .catch(error=>{
            alert("没有获取到信息!")
        });
        this.$http.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response=>{
            // console.log(response);
            this.type0Goods=response.body[0];
            this.type1Goods=response.body[1];
            this.type2Goods=response.body[2];
            this.type3Goods=response.body[3];
        })
        .catch(error=>{
            alert("没有获取到信息!")
        });
    },
    methods:{
        addGoods(goods){
            let isHave=false;
            for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].goodsId==goods.goodsId){
                    isHave=true;
                }
            }
            if(isHave){
                let arr=this.tableData.filter(o=>o.goodsId==goods.goodsId);
                arr[0].count++;
            }else{
                let data={"goodsId":goods.goodsId,"proName":goods.goodsName,"count":1,"price":goods.price};
                this.tableData.push(data);
            }
            this.getprice();
        },
        delGoods(goods){
            this.tableData=this.tableData.filter(o=>o.goodsId!=goods.goodsId);
            this.getprice();
        },
        delAll(){
            this.tableData=[];
            this.getprice();
        },
        getprice(){
            this.totalprice=0;
            if(this.tableData.length!=0){
                for(let i=0;i<this.tableData.length;i++){
                    this.totalprice+=this.tableData[i].count*this.tableData[i].price;
                }
            }
        },
        checkOut(){
            if(this.tableData.length!=0){
                this.totalprice=0;
                this.tableData=[];
                this.$message({
                    message:"结账成功",
                    type:"success"
                });
            }else{
                this.$message.error("请选择商品再点击结账");
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
    list-style: none;
}
#tableList{
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
}
.often-title{
    text-align: left;
    padding:10px;
    background-color: #F7FAFC;
    border-bottom: 1px solid #C0CCDA;
}
.leftnav li,.rightnav li{
    float:left;
    background-color: #fff;
    border:1px solid #ddd;
    padding:10px;
    margin:10px;
    cursor: pointer;
}
.price{
    color:#0087DE;
}
.rightnav li{
    width:23%;
}
.rightnav span{
    display: block;
}
</style>
