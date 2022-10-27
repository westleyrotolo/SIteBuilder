/*global
    piranha
*/

Vue.component("posts-block", {
    props: ["uid", "toolbar", "model", "test"],
    data: function () {
        return {
            name: this.model.name.value,
            maxPosts: this.model.maxPosts.value,
        };
    },
    methods: {
        clear: function () {
            // clear media from block
        },
        onBlurTitle: function (e) {

        },
        onBlurBody: function (e) {
        },
        onChange: function (data) {

        },
        onChangeBody: function (data) {

        },
        select: function () {
        },
        remove: function () {
        },
        update: function (media) {
        },
        selectAspect: function (val) {
        },
        isAspectSelected(val) {
        }
    },
    computed: {
        isImgEmpty: function (e) {
            return this.model.imgBody.media == null;
        },
        isNameEmpty: function () {
            return this.model.name.value != ""
        },
        isMaxPostsEmpty: function () {
            return this.model.maxPosts.value != ""
        },
    },
    mounted: function () {
    },
    beforeDestroy: function () {
    },
    template:

        "<div class='block-body rounded'>" +
        "   <div class='text-block'>" +
        "       <div class='block-body border rounded p-1' :class='{ empty: isNameEmpty }' >" +
        "          <input type='text' style='width:100%;height:3em' class='form-control form-control-color' :id='uid' v-model='model.name.value'  title = 'Nome' > " +
        "       </div>" +
        "   </div>" +
        "   <br />" +
        "   <div class='text-block'>" +
        "       <div class='block-body border rounded p-1' :class='{ empty: isMaxPostsEmpty }' >" +
        "          <input type='text' style='width:100%;height:3em' class='form-control form-control-color' :id='uid' v-model='model.maxPosts.value'  title = 'Max Posts' > " +
        "       </div>" +
        "   </div>" +
        "   <br />" +
        "</div>"
});
