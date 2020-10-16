<template>
    <footer>
      <div class="article-wrapper">
        <article class="social">
          <div class="logo">
            <img src="../../assets/logo.png" alt="">
          </div>
          <a href="https://www.pinterest.com/munchbakery/" class="linkedin"></a>
          <a href="https://www.instagram.com/munchbakery/" class="instagram"></a>
          <a href="https://twitter.com/munchbakery?lang=en" class="email"></a>
          <a href="https://www.facebook.com/munchbakery/" class="facebook"></a>
          <br>
          <article>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Login</a>
          </article>
          <div class="copyright-mid">
            <span>Copyright © {{year}} PharmaPhile. All rights reserved.</span>
          </div>
        </article>

        <article class="copyright-bot">
          <hr>
          <span>Copyright © {{year}} PharmaPhile. All rights reserved.</span>
        </article>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  props: [],
  computed: {
  }
}
</script>

<style scoped lang="scss">
footer{
  padding: 0 0 20px 0;
  color: #ababab;
  text-align: left;
  vertical-align: middle;
  width: 100%;
  background: rgba(196, 196, 196, 0.4);
  article{
    display: inline-block;
    vertical-align: top;
    &.nav{
      text-align: center;
    }
    div.column{
      display: inline-block;
      width: 160px;
      span{
        display: block;
        width: 100%;
        font-size: 16px;
        a{
          color: #ababab;
        }
      }
    }
    &.info {
      padding-top: 30px;
      .info-inner {
        text-align: right;
      }
    }
  }
}
a {
  color: #ababab;
  text-decoration: none;
}
.social {
  margin: 0 auto;
  text-align: center;
  div{
    margin-top: 5px;
  }
  a{
    display: inline-block;
    min-width: 39px;
    height: 39px;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 25px;
    &.facebook{
      background-image: url('./../../assets/facebookIcon.png')
    }
    &.linkedin{
      background-image: url('./../../assets/linkedinIcon.png')
    }
    &.email{
      background-image: url('./../../assets/emailIcon.png')
    }
    &.instagram{
      background-image: url('./../../assets/instagramIcon.png')
    }
    &:hover {
      background-blend-mode: darken
    }
  }
}

.copyright-mid {
  border-top: 2px solid black;
  padding: 10px;
  width: 100vw;
  height: 2px;
  display: block;
}
.copyright-bot {
  display: none;
}

.article-wrapper {
  padding: 0 !important;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

@media only screen and (max-width: 600px) {
  .article-wrapper {
    padding: 0 !important;
    flex-wrap: wrap;
    text-align: center;
    .nav, .social, .info, .copyright-bot {
      margin: 10px auto;
      text-align: center;
    }
    .copyright-bot {
      border-top: 2px solid black;
      height: 2px;
      display: none;
    }
    .copyright-mid {
      display: block;
    }
    .column{
      width: 100%
    }
    .info {
      padding-top: 0;
      width: 100%;
      .info-inner {
        text-align: center;
      }
    }
  }
  .social a{
    margin: 0 8px;
  }
}
</style>
