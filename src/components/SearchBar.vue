<template>
    <v-container>
        <v-row justify="center" class="search-bar">
            <SearchInput v-model="searchText" @search="handleSearch" />
            <SearchButton @search="handleSearch" :buttonText="buttonText" :loading="loading" />
        </v-row>
    </v-container>
</template>

<script>
import SearchInput from './SearchInput.vue';
import SearchButton from './SearchButton.vue';

export default {
    props: {
        buttonText: {
            type: String,
            default: 'Search'
        }
    },
    data() {
        return {
            searchText: 'London',
            loading: false,
        };
    },
    methods: {
        handleSearch() {
            this.$emit('search', this.searchText);
        }
    },
    components: {
        SearchInput,
        SearchButton
    },

};
</script>

<style scoped>
.search-bar {
    display: flex;
    margin: 0px;
}
</style>