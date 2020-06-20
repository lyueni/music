<template>
  <div>
   <img v-if="artistsData[0]!=null" :src="artistsData[0].coverUrl" alt="">
   <div>
     <ul>
       <li>
         {{ artistsData[0].tags[0] }}
         {{ artistsData[0].tags[1] }}
       </li>
     </ul>
   </div>
  </div>
</template>

<script>

import { getArtists } from '@/api/artists'

//click|mousedown ->  touchstart
//mousemove       ->  touchmove
//mouseup         ->  touchend

export default {
  data() {
    return {
    artistsData:[]

    }
  },
  created() {
    this.getArtists()
  },
  methods: {
    getArtists() {
      //歌详情接口
      return new Promise((resolve, reject) => {
        var id = this.$route.params.id
        getArtists({
          params: {
            id
          }
        }).then((res) => {
          var data = res.data
          console.log(data);
           if (data.code == 200) {
             var artistsData = data.topicData;
             if (artistsData) {
               this.artistsData=artistsData;
            }
           }
          resolve(true)
        })
      })
    },


   
  },
  watch: {
 
  },
  components: {
 
  }
}
</script>

<style lang="scss" scoped>
/deep/.search {
  height: auto;
  .mint-searchbar-inner,
  .mint-searchbar-core {
    background: #ebecec;
  }
  .mint-searchbar {
    display: flex;
    height: 60px;
    padding: 0;
    padding: 30px 20px 29px;
    box-sizing: content-box;
    background: #fff;
    border-bottom: 1px solid #e2e2e3;
  }
  .mint-searchbar-inner {
    height: 100%;
    padding: 0;
    border-radius: 30px;
    overflow: hidden;
  }
  .mintui-search {
    font-size: 26px; /*px*/
    margin: 0 18px;
  }
  .mint-search-list {
    padding-top: 222px;
    margin-bottom: 10px;
  }
  .mint-searchbar-cancel {
    position: absolute;
    right: 30px;
    top: 46px;
    display: flex;
    justify-content: center;
    color: #ebeceb;
    font-size: 14px; /*px*/
    font-weight: bold;
    width: 28px;
    height: 28px;
    background: #bcbdbd;
    border-radius: 50%;
    margin-right: 15px;
    line-height: 28px;
  }
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
}
.search-keywords {
  .title {
    font-size: 26px; /*px*/
    padding: 29px 0 5px 20px;
    color: #666;
    font-weight: normal;
  }
  .list {
    display: flex;
    flex-flow: wrap;
    padding: 0 20px;
    li {
      display: flex;
      align-items: center;
      height: 62px;
      border-radius: 32px;
      padding: 0 30px;
      font-size: 26px;
      color: #333;
      border: 1px solid #d3d4da; /*no*/
      margin-top: 16px;
      margin-right: 16px;
    }
  }
}
.search-list {
  background: #fff;
  .title {
    font-size: 22px; /*px*/
    color: #666;
    padding-left: 20px;
    font-weight: normal;
  }
}

.album,
.artist {
  display: flex;
  padding: 16px 0;
  width: 100%;
  .fa-angle-right {
    display: flex;
    align-items: center;
    color: #9b9b9b;
    font-size: 38px; /*px*/
    margin-right: 32px;
  }
}
.album-img,
.artist-img {
  width: 100px;
  height: 100px;
  margin-right: 34px;
}
.album-name,
.artist-name {
  margin-right: auto;
}
.artist-name {
  display: flex;
  align-items: center;
  font-size: 42px;
}
.album-realy-name {
  line-height: 56px;
  color: #333;
  font-size: 32px;
  .blue {
    color: #507daf;
  }
}
.album-artist-name {
  line-height: 34px;
  font-size: 22px; /*px*/
  color: #999;
}
</style>
