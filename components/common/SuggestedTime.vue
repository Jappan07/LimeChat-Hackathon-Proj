<template>
  <p>{{ date }}</p>
</template>

<script>
export default {
    name: 'SuggestedTime',
    data() {
        return {}
    },
    props: {
        broadcastSize: {
            type: Number,
            required: true,
            default: 1
        },
        date: {
            type: Date,
            required: true,
            default: new Date().toDateString()
        }
    },
    mounted() {
        console.log(this.date);
    }
}
</script>

<style>

</style>