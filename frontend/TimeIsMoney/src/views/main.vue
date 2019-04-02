<template>
  <div class="hello">
    <div class="container">
  <div class="dot dot-1"></div>
  <div class="dot dot-2"></div>
  <div class="dot dot-3"></div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
    </filter>
  </defs>
</svg>
    <h1>{{ msg }}</h1>
    <br/>
    <RadioGroup v-model="bigKinds">
      <Radio label="film">
        <Icon type="ios-film"></Icon>
        <span>Films</span>
      </Radio>
      <Radio label="person">
        <Icon type="ios-person"></Icon>
        <span>Person</span>
      </Radio>
      <Radio label="planet">
        <Icon type="ios-planet"></Icon>
        <span>Planets</span>
      </Radio>
      <Radio label="species">
        <Icon type="md-outlet"/>
        <span>Species</span>
      </Radio>
      <Radio label="starship">
        <Icon type="md-jet"></Icon>
        <span>Starships</span>
      </Radio>
      <Radio label="vehicle">
        <Icon type="md-pie"/>
        <span>Vehicle</span>
      </Radio>

    </RadioGroup>
    <Input search enter-button="Search" @on-search="handleSearch" style="width: 60%;margin:10px auto"
           placeholder="Enter a number"/>

    <br/>
    <Row style="margin-top: 20px;font-size: 14px">
      <Col span="6" offset="3">
        <h4>What is this?</h4>
        <p>The Star Wars API, or "swapi" (Swah-pee) is the world's first quantified and programmatically-accessible data
          source for all the data from the Star Wars canon universe!</p>

        <p>We've taken all the rich contextual stuff from the universe and formatted into something easier to consume with
          software. Then we went and stuck an API on the front so you can access it all!</p>
      </Col>
      <Col span="6">
        <h4>How can I use it?</h4>
        <p>All the data is accessible through our HTTP web API. Consult our
          <a href="http://127.0.0.1:8080/#/about">documentation</a> if you'd like to get started.</p>

        <p>Helper libraries for popular programming languages are also provided so you can consume swapi in your favourite
          programming language, in a style that suits you.</p>
      </Col>
      <Col span="6">
        <h4>How can I support this?</h4>
        <p>With small donations we can keep swapi running for free, please consider throwing us some beer money to say
          thank you. With every $10 we can keep the site up for another month!</p>
        <a href="http://127.0.0.1:8080/#/show">about us</a>

        <p>This project is open source and you can contribute on <a href="https://github.com/DalaoBringMeFly">Github</a>.</p>
      </Col>
    </Row>


  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .fade-enter-active, .fade-leave-active, {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  h4 {
    font-size: 18px;
  }



.container {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  filter: url('#goo');
  animation: rotate-move 2s ease-in-out infinite;
}

.dot {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.dot-3 {
  background-color: #f74d75;
  animation: dot-3-move 2s ease infinite, index 6s ease infinite;
}

.dot-2 {
  background-color: #10beae;
  animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;
}

.dot-1 {
  background-color: #ffe386;
  animation: dot-1-move 2s ease infinite, index 6s -2s ease infinite;
}

@keyframes dot-3-move {
  20% {transform: scale(1)}
  45% {transform: translateY(-18px) scale(.45)}
  60% {transform: translateY(-90px) scale(.45)}
  80% {transform: translateY(-90px) scale(.45)}
  100% {transform: translateY(0px) scale(1)}
}

@keyframes dot-2-move {
  20% {transform: scale(1)}
  45% {transform: translate(-16px, 12px) scale(.45)}
  60% {transform: translate(-80px, 60px) scale(.45)}
  80% {transform: translate(-80px, 60px) scale(.45)}
  100% {transform: translateY(0px) scale(1)}
}

@keyframes dot-1-move {
  20% {transform: scale(1)}
  45% {transform: translate(16px, 12px) scale(.45)}
  60% {transform: translate(80px, 60px) scale(.45)}
  80% {transform: translate(80px, 60px) scale(.45)}
  100% {transform: translateY(0px) scale(1)}
}

@keyframes rotate-move {
  55% {transform: translate(-50%, -50%) rotate(0deg)}
  80% {transform: translate(-50%, -50%) rotate(360deg)}
  100% {transform: translate(-50%, -50%) rotate(360deg)}
}

@keyframes index {
  0%, 100% {z-index: 3}
  33.3% {z-index: 2}
  66.6% {z-index: 1}
}


</style>
