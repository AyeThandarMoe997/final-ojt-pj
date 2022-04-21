<template>
  <div id="app">
    <form>
      <div class="form-group row mb-3">
        <label for="user_id" class="col-sm-2 col-form-label">User ID</label>
        <div class="col-sm-2">
          <input type="text" class="form-control" id="user_id" :value="'ID-000'+this.user_id" :disabled="disabled == 1">
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="user_name" class="col-sm-2 col-form-label">User Name</label>
        <div class="col-sm-2">
          <input type="text" class="form-control" id="user_name" v-model="user_name" :disabled="disabled == 1">
          <span v-if="this.user_nameError" style="color : red;"> {{this.user_nameError}} </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="gender" class="col-sm-2 col-form-label"> Gender</label>
          <div class="form-check form-check-inline col-sm-2">
            <label><input class="form-check-input" type="radio" name="gender" id="male" @change="onChange($event)" value="0" :disabled="disabled == 1" > Male</label>
          </div>
          <div class="form-check form-check-inline col-sm-2">
            <label><input class="form-check-input" type="radio" name="gender" id="female" @change="onChange($event)" value="1" :disabled="disabled == 1"> Female</label>
          </div>
          <div class="col-sm-2">
            <span v-if="this.gender_error" style="color : red;"> {{this.gender_error}} </span>
          </div>
      </div>
      <div class="form-group row mb-3">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-2">
          <input type="email" class="form-control" id="email" v-model="email" :disabled="disabled == 1">
          <span v-if="this.email_error" style="color : red;"> {{this.email_error}} </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="address" class="col-sm-2 col-form-label">Address</label>
        <div class="col-sm-4">
          <textarea class="form-control mb-3" id="address" rows="3" v-model="address" :disabled="disabled == 1"></textarea>
          <span v-if="this.address_error" style="color : red;"> {{this.address_error}} </span>
        </div>
      </div>
      <AgeArea :disabled="disabled == 1" @dateData="getDOB"  />
      <div class="form-group row mb-3">
        <label for="user_role" class="col-sm-2 col-form-label">User Role</label>
        <div class="col-sm-2">
          <select class="form-control custom-select" id="role"  @change="roleOnChange($event)" :disabled="disabled == 1">
            <option value=" "> </option>
            <option value="Administrator"> Administrator</option>
            <option value="User"> User </option>
            <option value="Guest"> Guest </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-4">
          <button type="button" class="btn btn-primary" @click="dataCancel"> {{ this.textCancel }} </button>
        </div>
        <div class="col-sm-6">
          <button type="button" class="btn btn-primary" @click="toggleTextConfirm" v-if="expanded == 0"> Confirm </button>
          <button type="button" class="btn btn-primary" @click="dataRegister" v-if="expanded == 1" > Register </button>
        </div>
      </div>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>

import AgeArea from './AgeArea.vue'

export default {
  name: 'App',
  components: {
    AgeArea
  },
  data() {
    return {
      user_id: this.$store.state.user_id,
      user_name: '',
      gender: null,
      email: '',
      address: '',
      textCancel: 'Cancel',
      expanded: false,
      disabled: 0,
      user_nameError: '',
      gender_error: '',
      emailType: '@gmail.com',
      email_error: '',
      address_error: '',
      user_role: '',
      dob: new Date(),
      formatDate: '',
      user_info: {
          id: '',
          name: '',
          gender: '',
          email: '',
          address: '',
          dob: '',
          role: ''
      },
    }
  },
  methods: {
    onChange(event) {
      var data = event.target.value;
      this.gender = data;
    },
    roleOnChange(event) {
      var role = event.target.value;
      this.user_role = role;
    },
    toggleTextConfirm() {
      if(this.user_name == ''){
        this.user_nameError = 'User Name field is required!';
      }else{
        this.user_nameError = '';
      }

      if(this.gender == null) {
        this.gender_error = 'Gender field is required!';
      }else{
        this.gender_error = '';
      }

      if(this.email.indexOf(this.emailType) == -1){
        this.email_error = 'Email is only accept email type eg: @gmail.com!';
      }else{
        this.email_error = '';
      }

      if(this.address ==''){
        this.address_error = 'Address field is required!';
      }else{
        this.address_error = '';
      }

      if(this.user_nameError == '' && this.email_error == '' && this.gender_error == '' && this.address_error == '')
      {
        this.disabled = 1;
        this.expanded = 1;
      }else{
        this.disabled = 0;
      }

      if(this.expanded) {
        this.textCancel = "Clear";
      } else {
        this.textCancle = "Cancle";
      }
    },
    getDOB(event) {
      this.dob = event;
      this.formatDate = this.dob.toJSON().slice(0,10).replace(/-/g,'/');
    },
    dataRegister() {
      if(this.expanded == 1) {
        this.user_info.id = this.user_id;
        this.user_info.name= this.user_name;
        this.user_info.gender= this.gender;
        this.user_info.email = this.email;
        this.user_info.address = this.address;
        this.user_info.dob = this.formatDate;
        this.user_info.role = this.user_role;
        this.$store.commit('addUsers', this.user_info)
        this.$router.push({name: 'user-data', params: {user_info: this.user_info}});
      }
    },
    dataCancel() {
      this.user_name = '',
      this.email = '',
      this.gender = 0,
      !(this.onChange)
      this.address = '',
      this.dateofbrith = new Date();
      this.user_role = ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
