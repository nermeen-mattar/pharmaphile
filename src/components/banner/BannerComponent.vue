<template>
  <div class="signup-banner">
  <div @click="onSignUpClicked()"> Want to enjoy the full features? <span>Signup</span></div>
      <register></register>
</div>


</template>

<script>
import Register from '@/components/auth/register';

export default {
  name: 'BannerComponent',
  data() {
    return {
      // key: value
    }
  },
  props: [],
  computed: {
  },
components: { Register },
methods: {
     onSignUpClicked() {
      this.$modal.show('reg-modal');
    }
}

      // this.$modal.show('add-training');

}
</script>

<style scoped lang="scss">



/* (Just ignore)top banner style */
.signup-banner {
  margin-bottom: 30px;
  text-align: center;
  background-color: #ea4c4c;
}

.signup-banner div, .signup-banner span {
  display: inline-block;
}

.signup-banner div {
  width: 100%;
  padding: 15px 0;
  color: #fff;
  font-weight: bold;
  color: rgba(255, 255, 255, .8);
}

.signup-banner span{
  width: 90px;
  height: 30px;
  line-height: 28px;
  background-color: #a1c45a;
  border-radius: 20px;
  cursor: pointer;
}

.signup-banner a:hover {
  color: #fff9e0;
}
</style>
