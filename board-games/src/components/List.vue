<template>
    <div>
        <slot name="title">

        </slot>
        <ul>
            <li :key="anItem[prop_key]" v-for="anItem in internalItems">
                <slot v-bind:item="anItem">

                </slot>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            internalItems: []
        }
    },
    props: ['items', 'prop_key'],
    mounted() {
        this.internalItems = [...this.items];
    }
}
</script>