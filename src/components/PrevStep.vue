<template>
    <div class="prev-step" @click="returnPrev">
        <i class="fa fa-angle-left"></i>
        <span><slot>上一步</slot></span>
    </div>
</template>
<script>
export default {
    name: 'PrevStep',
    methods: {
        returnPrev: function() {
            this.$router.back(-1);
        }
    }
}
</script>
<style scoped lang="less">
.prev-step {
    padding: 5px 16px;
    i {
        margin-right: 3px;
    }
}

</style>