<template>
    <transition name="fade">
        <div :class="`alert--${type}`" v-if="visible">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean,
            default: true
        }
    }
}
</script>
