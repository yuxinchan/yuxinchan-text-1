<template>
    <div class="wrapper" :class="{'error': error}">
        <input :value="value" type="text" :disable="disable" :readonly="readonly">
        <template v-if="error">
            <icon name="error" class="errorIcon"></icon>
            <span class="errorMessage">{{error}}</span>
        </template>
        <template v-if="success">
            <icon name="success" class="successIcon"></icon>
            <span class="successMessage">{{success}}</span>
        </template>
    </div>
</template>
<script>
    import Icon from './icon'

    export default {
        components: {Icon},
        name: 'GuluInput',
        props: {
            value: {
                type: String
            },
            disable: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error: {
                type: String
            },
            success: {
                type: String
            }
        }
    }
</script>
<style lang="scss" scoped>
    $height: 32px;
    $border-color: #999;
    $border-color-hover: #666;
    $border-radius: 4px;
    $font-size: 14px;
    $box-shadow-color: rgba(0,0,0,0.5);
    $red: #F1453D;
    $green: #46f124;
    .wrapper {
        font-size: $font-size; display: inline-flex; align-items: center;
        > :not(last-child) {margin-right: .5em;}
        > input {height: 32px; border: 1px solid $border-color;border-radius: 4px;padding: 0 8px;font-size: inherit;
            &:hover {border-color: $border-color-hover;}
            &:focus {box-shadow: inset 0 1px 3px $box-shadow-color;outline: none;}
            &[disable], &[readonly] {border-color: #bbb;color: #bbb;cursor: not-allowed;}
        }
        &.error {
            > input {border-color: $red;}
        }
        .errorIcon {fill: $red;}
        .errorMessage {color: $red;}
        .successIcon {fill: $green;}
        .successMessage {color: $green;}
    }
</style>