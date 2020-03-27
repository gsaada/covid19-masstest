<template>
<q-card class="login-form" v-bind:style="$q.platform.is.mobile?{'width': '80%'}:{'width':'30%'}">
    <q-img src="/statics/images/pharmacy.jpg"></q-img>
    <q-card-section>
    <q-avatar size="74px" class="absolute" style="top: 0;right: 25px;transform: translateY(-50%);">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
    </q-avatar>
    <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
        Log in to Dashboard
        </div>
    </div>
    </q-card-section>
    <q-card-section>
    <q-form
        class="q-gutter-md"
    >
        <q-input
        filled
        v-model="username"
        label="Username"
        lazy-rules
        />

        <q-input
        type="password"
        filled
        v-model="password"
        label="Password"
        lazy-rules

        />

        <div>
        <q-btn label="Login" to="/dashboard" type="button" color="primary"/>
        </div>
    </q-form>
    </q-card-section>
</q-card>
</template>

<script>
export default {
    name: "LoginForm",
    props: {
        username: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true,
            default: ''
        }, 
    },
    // data () {
    //     return {
    //         username: 'admin',
    //         password: 'Admin@CRM'
    //     }
    // }
}
</script>