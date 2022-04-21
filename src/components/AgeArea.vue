<template>
    <div class="form-group row mb-3">
        <label for="dob" class="col-sm-2 col-form-label"> Date Of Brith </label>
        <div class="col-sm-2">
          <datepicker v-model="dateofbrith" :disabled="disabled == 1"></datepicker>
        </div>
        <label for="age" class="col-sm-2 col-form-label"> Age </label>
        <div class="col-sm-2">
          <input type="text" class="form-control" id="age" :value="calculateAge" :disabled="disabled == 1">
        </div>
      </div>
</template>

<script>

import datepicker from 'vuejs-datepicker'

export default {
    name: 'AgeArea',
    props: ['disabled'],
    components: {
        datepicker
    },
    data() {
        return {
            dateofbrith: new Date(),
        }
    },
    computed: {
        calculateAge() {
            this.$emit('dateData', this.dateofbrith);
            const currentDate = new Date();
            let age = currentDate.getFullYear() - this.dateofbrith.getFullYear();
            const month = currentDate.getMonth() - this.dateofbrith.getMonth();
            if(month < 0 || month === 0 && currentDate.getDate < this.dateofbrith.getDate) {
                age = age - 1;
            }
            return age;
        }
    }
}
</script>
