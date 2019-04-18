<style>
    .upper {
    margin-bottom: 5px;
    float:right;
}
.allQN{
  margin-top: 5px;
  clear:both;

  span{
    margin-right:15px;
    margin-bottom: 2px;
  }
  
  .someInfo{
    float:right;
    margin:5px;
  }
}

</style>
<template>
    <div>
        <Carousel autoplay v-model="value2" loop style="height: 300px">
            <CarouselItem v-for="c in carousel">
                <img :src="c.src" style="height: 300px;object-fit: cover; width:1062px"></img>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value2: 0,
            carousel:[
                {name:'adver1', src:'../../static/home/adver1.jpg'},
                {name:'adver2', src:'../../static/home/adver2.jpg'},
                {name:'adver3', src:'../../static/home/adver3.jpg'},
                {name:'adver4', src:'../../static/home/adver4.jpg'}
            ]
        }

    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        }
    }
}
</script>