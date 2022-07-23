/*global
    piranha
*/

Vue.component("card-block", {
    props: ["uid", "toolbar", "model"],
    data: function () {
        return {
            imgBody: this.model.imgBody.value,
            title: this.model.title.value,
            body: this.model.body.value,
            color: this.model.color.value

        };
    },
    methods: {
        clear: function () {
            // clear media from block
        },
        onBlurTitle: function (e) {
            this.model.title.value = e.target.innerHTML;
        },
        onBlurBody: function (e) {
            this.model.body.value = e.target.innerHTML;
        },
        onChange: function (data) {
            console.log('on change', e)
            this.model.title.value = data;
        },
        select: function () {
            if (this.model.imgBody.media != null) {
                piranha.mediapicker.open(this.update, "Image", this.model.imgBody.media.folderId);
            } else {
                piranha.mediapicker.openCurrentFolder(this.update, "Image");
            }
        },
        remove: function () {
            this.model.imgBody.id = null;
            this.model.imgBody.media = null;
        },
        update: function (media) {
            if (media.type === "Image") {
                this.model.imgBody.id = media.id;
                this.model.imgBody.media = {
                    id: media.id,
                    folderId: media.folderId,
                    type: media.type,
                    filename: media.filename,
                    contentType: media.contentType,
                    publicUrl: media.publicUrl,
                };
                // Tell parent that title has been updated
                this.$emit('update-title', {
                    uid: this.uid,
                    title: this.model.imgBody.media.filename
                });
            } else {
                console.log("No image was selected");
            }
        },
        selectAspect: function (val) {
            this.model.aspect.value = val;
        },
        isAspectSelected(val) {
            return this.model.aspect.value === val;
        }
    },
    computed: {
        isImgEmpty: function (e) {
            return this.model.imgBody.media == null;
        },
        isTitleEmpty: function () {
            return piranha.utils.isEmptyHtml(this.model.title.value);
        },
        isBodyEmpty: function () {
            return piranha.utils.isEmptyHtml(this.model.body.value);
        },
        mediaUrl: function () {
            if (this.model.imgBody.media != null) {
                return piranha.utils.formatUrl(this.model.imgBody.media.publicUrl);
            } else {
                return piranha.utils.formatUrl("~/manager/assets/img/empty-image.png");
            }
        },
        iconUrl: function () {
            if (this.model.aspect.value > 0) {
                if (this.model.aspect.value === 1 || this.model.aspect.value === 3) {
                    return piranha.utils.formatUrl("~/manager/assets/img/icons/img-landscape.svg");
                } else if (this.model.aspect.value == 2) {
                    return piranha.utils.formatUrl("~/manager/assets/img/icons/img-portrait.svg");
                } else if (this.model.aspect.value == 4) {
                    return piranha.utils.formatUrl("~/manager/assets/img/icons/img-square.svg");
                }
            }
            return null;
        }
    },
    mounted: function () {
        piranha.editor.addInline(this.uid, this.toolbar, this.onChange);
        this.model.getTitle = function () {
            if (this.model.imgBody.media != null) {
                return this.model.imgBody.media.filename;
            } else {
                return "No image selected";
            }
        };
    },
    beforeDestroy: function () {
        piranha.editor.remove(this.uid);
    },
    template:

        "<div class='block-body has-media-picker rounded' :class='{ empty: isImgEmpty }'>" +
        "   <div class='image-block'>" +
        "       <img class='rounded' :src='mediaUrl'>" +
        "       <div class='media-picker'>" +
        "           <div class='btn-group float-right'>" +
        "               <button :id='uid + \"-aspect\"' class='btn btn-info btn-aspect text-center' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
        "                <i v-if='model.aspect.value === 0' class='fas fa-cog'></i>" +
        "                   <img v-else :src='iconUrl'>" +
        "               </button>" +
        "               <div class='dropdown-menu aspect-menu' :aria-labelledby='uid + \"-aspect\"'>" +
        "                   <label class='mb-0'>{{ piranha.resources.texts.aspectLabel }}</label>" +
        "                   <div class='dropdown-divider'></div>" +
        "                   <a v-on:click.prevent='selectAspect(0)' class='dropdown-item' :class='{ active: isAspectSelected(0) }' href='#'>" +
        "                       <img :src='piranha.utils.formatUrl(\"~/manager/assets/img/icons/img-original.svg\")'><span>{{ piranha.resources.texts.aspectOriginal }}</span>" +
        "                   </a>" +
        "                   <a v-on:click.prevent='selectAspect(1)' class='dropdown-item' :class='{ active: isAspectSelected(1) }' href='#'>" +
        "                       <img :src='piranha.utils.formatUrl(\"~/manager/assets/img/icons/img-landscape.svg\")'><span>{{ piranha.resources.texts.aspectLandscape }}</span>" +
        "                   </a>" +
        "                   <a v-on:click.prevent='selectAspect(2)' class='dropdown-item' :class='{ active: isAspectSelected(2) }' href='#'>" +
        "                       <img :src='piranha.utils.formatUrl(\"~/manager/assets/img/icons/img-portrait.svg\")'><span>{{ piranha.resources.texts.aspectPortrait }}</span>" +
        "                   </a>" +
        "                   <a v-on:click.prevent='selectAspect(3)' class='dropdown-item' :class='{ active: isAspectSelected(3) }' href='#'>" +
        "                       <img :src='piranha.utils.formatUrl(\"~/manager/assets/img/icons/img-landscape.svg\")'><span>{{ piranha.resources.texts.aspectWidescreen }}</span>" +
        "                   </a>" +
        "                   <a v-on:click.prevent='selectAspect(4)' class='dropdown-item' :class='{ active: isAspectSelected(4) }' href='#'>" +
        "                       <img :src='piranha.utils.formatUrl(\"~/manager/assets/img/icons/img-square.svg\")'><span>{{ piranha.resources.texts.aspectSquare }}</span>" +
        "                   </a>" +
        "               </div>" +
        "               <button v-on:click.prevent='select' class='btn btn-primary text-center'>" +
        "                   <i class='fas fa-plus'></i>" +
        "               </button>" +
        "               <button v-on:click.prevent='remove' class='btn btn-danger text-center'>" +
        "                   <i class='fas fa-times'></i>" +
        "               </button>" +
        "           </div>" +
        "           <div class='card text-left'>" +
        "               <div class='card-body' v-if='isImgEmpty'>" +
        "                   &nbsp;" +
        "               </div>" +
        "               <div class='card-body' v-else>" +
        "                   {{ model.imgBody.media.filename }}" +
        "               </div>" +
        "           </div>" +
        "       </div>" +
        "   </div>" +
        "   <br />" +
        "   <div class='html-block'>" +
        "       <div class='block-body border rounded p-1' :class='{ empty: isTitleEmpty }' >" +
        "           <div contenteditable='true' :id='uid' v-html='title' v-on:blur='onBlurTitle'></div> " +
        "       </div>" +
        "   </div>" +
        "   <br />" +
        "   <div class='html-block'>" +
        "       <div class='block-body border rounded p-1' :class='{ empty: isBodyEmpty }' >" +
        "           <div  contenteditable='true' :id='uid' v-html='body' v-on:blur='onBlurBody'></div> " +
        "       </div>" +
        "   </div>" +
        "   <br />" +
        "   <div class='color-block'>" +
        "       <div class='block-body rounded'  >" +
        "          <input type='color' style='width:4em;height:3em' class='form-control form-control-color' :id='uid' : value='model.color.value' @input='event => model.color.value = event.target.value' title = 'Choose your color' > " +
        "      </div>" +
        "   </div>" +
        "   <br />" +
        "</div>"
});