<template>
  <div>
    <app-nav :activeIndex="1"></app-nav>
   <div>
     <div class="TopPic"> 
       <img :src="TopListPic" class="TopListPic" alt="">
       <span class="TopPicTime">
        更新日期： {{ parseDateS(TopListTime) }}
       </span>
     </div>
     <ul class="TopList">
        <li v-for="(item,index) in TopListData" :key='index'>
           <router-link :to="'/song/'+item.id">
              <i v-if="(index+1 )<=9" :class="{active:(index+1)==1||(index+1)==2||(index+1)==3}"> 0{{index+1 }}</i>
              <i  v-else>{{ index+1 }}</i>
              <div class="TopListMiddle">
              <div class="TopListMiddleName">
                {{ item.name }}
                <span v-if=" item.alia[0]!=null">({{ item.alia[0]}})</span>
              </div>
              <div v-if="item.ar[0].name!=null"   class="TopListMiddleArtist" > 
                <img src="" alt="">{{ item.ar[0].name }}-{{  item.al.name  }}
              </div>
              </div>
            </router-link >
       </li>
     </ul>
   </div>
  </div>
</template>

<script>
import appNav from '@/components/app-nav'
import { parseDateS } from '@/utils/date';
import { getTopList ,getTopListHot } from '@/api/hot'
//click|mousedown ->  touchstart
//mousemove       ->  touchmove
//mouseup         ->  touchend

export default {
  data() {
    return {
     TopListPic:'',
     TopListTime:'',
     TopListData:[],
    }
  },
  created() {
    this.getTopList(),
    this.getTopListHot()
  },
  methods: {
     parseDateS:parseDateS,
   getTopList() {
      //歌详情接口
      return new Promise((resolve, reject) => {
        var idx = 1
        getTopList({
          params: {
            idx
          }
        }).then((res) => {
          var data = res.data
          if (data.code == 200) {
            console.log(data);
            this.TopListPic=data.playlist.coverImgUrl;
            this.TopListTime=data.playlist.createTime;
            this.TopListData=data.playlist.tracks;
            console.log(this.TopListData);
         
          }
          resolve(true)
        })
      })
    },


   getTopListHot() {
      //歌详情接口
      return new Promise((resolve, reject) => {
        var idx = 1
        getTopListHot({
          params: {
          }
        }).then((res) => {
          var data = res.data
          
          if (data.code == 200) {
            console.log(data);
          }
          resolve(true)
        })
      })
    },
    //getTopListHot
  },
  watch: {

    
  },
  components: {
    appNav
  }
}
</script>

<style lang="scss" scoped>
.TopPic{
  position: relative;
  .TopListPic{
  height: 292px;
 }
  .TopPicTime{
  display: block;
  position: absolute;
  bottom: 60px;
  left: 40px;
  color: #fff;
  font-size: 24px;/*px*/
  }
}
.TopList{
  .active{
    color: #df3436;
  }
  li{
     height: 110px;
     border-bottom: 1px solid #e2e2e3;/*no*/
     position: relative;
      i{
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      line-height: 111px;
      text-align:center;
      font-size: 26px;
      height: 112px;
      width: 68px;
      background: #fff;
     }
     .TopListMiddle{
      margin-left: 68px;
      padding-top: 23px;

      .TopListMiddleName{
          font-size: 34px;/*px*/
          line-height: 34px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
         span{
           color: #888888;
         }
      }
      .TopListMiddleArtist{
        font-size: 25px;/*px*/
        line-height: 47px;
        color: #888888;
      }
     }
   }
  
}

</style>
