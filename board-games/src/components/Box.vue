<template>
    <div class="box">
        <div class="box-title">
            <slot name="header"></slot>
        </div>
        <div class="box-body">
            <slot></slot>
        </div>
        <div class="box-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .box {
        padding: 10px;
        border: 1px solid #dfdfdf;
        border-radius: 10px;
    }
    .box-title {
        margin-bottom: 10px;
    }
</style>