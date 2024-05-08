<template>
    <v-text-field v-model="searchText" outlined color="primary" variant="solo" :label="label" loader-height="3"
        @keypress.enter="handleKeyPress"></v-text-field>
</template>


<script>
export default {
    data() {
        return {
            searchText: '',
            label: 'City',
            loading: false
        };
    },
    methods: {
        handleKeyPress(event) {
            if (event.key === 'Enter') {
                this.$emit('search', this.searchText);
            }
        }
    }
};
</script>