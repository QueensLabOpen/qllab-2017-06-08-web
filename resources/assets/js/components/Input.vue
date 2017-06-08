<template>
    <div class="input" :class="classes">
        <input class="input__inner"
            ref="input"
            :type="type"
            :value="value"
            :disabled="disabled"
            @input="onInput($event.target.value)"
            @focus="onFocus"
            @blur="onBlur"
        >
        <label class="input__label">{{ label }}</label>
        <div class="input__append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: String,
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            focus: false
        }
    },

    computed: {
        classes() {
            return [
                {
                    'is-disabled': this.disabled,
                    'is-focus': this.focus || this.value,
                    '-append': this.$slots.append,
                }
            ];
        }
    },

    methods: {
        onInput(value) {
            this.$refs.input.value = value;
            this.$emit('input', value);
        },

        onFocus() {
            this.focus = true;
        },

        onBlur() {
            this.focus = false;
        }
    }
}
</script>
