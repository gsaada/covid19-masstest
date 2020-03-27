export default {
    user(state, user){
        state.authorized = !!user && user.attributes && user.attributes.email_verified
        state.user = user
    },
    confirm(state, showConfirm){
        state.confirm = !!showConfirm
    },
}
