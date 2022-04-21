<template>
    <div>
        <p> {{ user_info }} </p>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">UserID</th>
            <th scope="col">User Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Date Of Brith</th>
            <th scope="col">UserRole</th>
            </tr>
        </thead>
        <tbody v-for="(user, index) in this.user_info" :key="index" :user="user">
            <tr>
            <th>{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.email }}</td>
            <th>{{ user.address }}</th>
            <td>{{ user.dob }}</td>
            <td>{{ user.role }}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'UserData',
    data() {
        return {
            user_info: this.$store.state.users,
        }
    },
}
</script>
