<template>
    <!-- M37 @click="$emit('clickButton')" -->
    <button class="btn rounded-pill" @click="$emit('clickButton')">
    <slot></slot>
    </button>
</template>