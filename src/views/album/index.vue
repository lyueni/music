<template>
 <div>
    <div class="topPic">
      <img :src="albumData.picUrl" alt="">
      <ul>
        <li class="topPicName">
          {{ albumData.name }}
        </li>
        <li  class="topPicArtist">
         <span>歌手：</span> {{ albumData.artist.name }}
        </li>
        <li class="topPicTime">
          发行时间：{{ parseDateT(albumData.publishTime) }}
        </li>
      </ul>
   </div>
   <div  :class="{'TextHidden':show }" @touchstart="Texthidden"> 
      简介：
     <p v-for="(item,index) in description" :key="index">
       {{ item }}
     </p>
   </div>
   <div class="fa fa-angle-down" v-show="show" @touchstart="Textshow"></div>
   <div>
     <div class="ListTitle">
         歌曲列表：
     </div>
     <ul v-if="albumSongs[0].name!=null"  class="songList" >
        <li v-for="(item,index) in albumSongs" :key='index'>
         <router-link :to="'/song/'+item.id">
            <span>{{ index+1  }}</span>
            <div  class="songListText">
                <div class="songListTextName"> {{ item.name }}</div>
                <div class="songListTextArtist"> {{ albumData.artist.name }}-{{ albumData.name  }}</div>
            </div> 
            <i class="fa fa-play-circle-o"></i>
         </router-link>
        </li>
     </ul>
   </div>

   <div class="Hotcomment">
     <div class="ListTitle">
         精彩评论：
     </div>
       <ul  v-if="hotCommentsData.user!=null">
          <li  v-for="(item,index)  in hotCommentsData" :key='index' >
          <router-link :to="'/song/'+item.id">
          <div class="CommentUser">
            <img class="userImg" :src="hotCommentsData.user.avatarUrl" alt="">
            <div class="nickname">  {{ item.user.nickname }} </div>
            <div class="time">{{ parseDate(item.time) }} </div>
          </div>
          <div class="content">
            {{item.content}}
          </div>
          </router-link>
          </li> 
        </ul>
   </div>
   <div class="Hotcomment">
     <div class="ListTitle">
      最新评论：
     </div>
       <ul  v-if="newCommentsData.user!=null">
          <li  v-for="(item,index)  in newCommentsData" :key='index' >
          <router-link :to="'/song/'+item.id">
          <div class="CommentUser">
            <img class="userImg" :src="newCommentsData.user.avatarUrl" alt="">
            <div class="nickname">  {{ item.user.nickname }} </div>
            <div class="time">{{ parseDate(item.time) }} </div>
          </div>
          <div class="content">
            {{item.content}}
          </div>
          </router-link>
          </li> 
        </ul>
   </div>
 </div>
  
</template>

<script>
import { parseDate,parseDateT } from '@/utils/date';
import { getAlbum , getAlbumComment} from '@/api/album'


//click|mousedown ->  touchstart
//mousemove       ->  touchmove
//mouseup         ->  touchend

export default {
  data() {
    return {
    data:[],
    albumData:[],
    description:[],
    albumSongs:[],
    hotCommentsData:[],
    newCommentsData:[],

    show:true,
    }
  },
  created() {
    this.getAlbum(),
    this.getAlbumComment(),
    this.Textshow(),
    this.Texthidden()

  },
  methods: {
    parseDate:parseDate,
    parseDateT:parseDateT,
    Textshow(){
      this.show=!this.show;
    },
    Texthidden(){
      this.show=!this.show;
    },



    getAlbum() {
      //歌详情接口
      return new Promise((resolve, reject) => {
        var id = this.$route.params.id
        getAlbum({
          params: {
            id
          }
        }).then((res) => {
         var data = res.data
          console.log(data);
            if (data.code == 200) {
              this.data=data;
              var albumData = data.album;
             if (albumData) {
                this.albumData=albumData;
                this.albumSongs=data.songs;
                console.log(this.albumSongs);
                if(this.albumData.description){
                  var descriptionArr=this.albumData.description.split(/\n/);
                  this.description=descriptionArr;
                  console.log(this.description);
                }
              }
              
            }
          resolve(true)
        })
      })
    },
    getAlbumComment() {
      //歌详情接口
      return new Promise((resolve, reject) => {
        var id = this.$route.params.id
        getAlbumComment({
          params: {
            id
          }
        }).then((res) => {
          var data = res.data;
          if (data.code == 200) {
              var albumComment=data.hotComments;
              if (albumComment) {
                this.hotCommentsData=albumComment;
                console.log(this.hotCommentsData)
              }
              var albumCommentNew=data.comments;
              if (albumCommentNew) {
                this.newCommentsData=albumCommentNew;
              }
          }
          resolve(true)
        })
      })
    },

   
  },
  watch: {
     show(newval) {
      this.show = newval
    },
  },
  components: {
 
  }
}
</script>

<style lang="scss" scoped>
.topPic{
  height:372px ;
  background-color:#7e5b4e ;
  position: relative;
  img{
    width:252px ;
    height:252px ;
    margin:60px 0 0 30px ;
  }
  ul{
    position: absolute;
    top:85px ;
    left: 333px;
    .topPicName{
      font-size: 35px;
      line-height: 36px;
      margin-bottom: 56px;
      color:#fff ;
    }
    .topPicArtist{
      font-size:27px;
      line-height: 27px;
      margin-bottom: 22px;
      color:#fff ;
    }
     .topPicTime{
      font-size:23px;
      line-height: 23px;
      color:#b6a59e ;
    }
  }
  span{
     color:#b6a59e ;
  }
}
.TextHidden{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.fa-angle-down{
  margin-left: 700px;
  font-size: 40px;/*px*/
}
.songList{
 span{
   display: block;
   width: 80px;
   height: 111px;
   background: #fff;
   font-size: 25px;/*px*/
   color: #999999;
   text-align: center;
   line-height: 111px;
 }
 li{
  position: relative;
  i{
    font-size: 44px;
    color: #aaaaaa;
    position: absolute;
    top: 34px;
    right: 20px;
  }
  .songListText{
    position: absolute;
    width:670px ;
    height: 111px;
    top: 0;
    right: 0;
    border-bottom: 1px solid #dfdfdf;
    .songListTextName{
      margin: 22px 0 15px 0 ;
      font-size:32px ;/*px*/
      line-height: 32px;
      color: #333333;
    }
    .songListTextArtist{
      font-size: 23px;/*px*/
      line-height: 23px;
      color: #888888;
    }
    
  }
 }
}
.Hotcomment{
  .ListTitle{
    background-color: #eeeff0;
    height: 46px;
    font-size:24px ;/*px*/
    line-height: 42px;
    padding: 0 0 4px 20px;
  }
  li{
    margin-top: 27px;
  }
  .nickname{
    font-size: 24px;/*px*/
    line-height: 37px;
    color: #c0bcbb;
    padding-left: 81px;
  }
  .time{
    font-size: 18px;/*px*/
    line-height: 30px;
    color: #847f7b;
     padding-left: 81px;
  }
  .content{
    font-size: 28px;/*px*/
    line-height: 40px;
    color: #e2d9d4;
    border-bottom: 2px solid #605043;/*no*/
    padding: 14px 0 22px 0;
    margin-left: 81px;
  }
  .userImg{
    display: block;
    width:67px ;
    height:67px ;
    position: absolute;
    border-radius: 50%;
    overflow: hidden;
  }
  .CommentUser{
    position: relative;
  }
}
</style>
