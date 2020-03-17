import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos';

const state = {
    todos: [
        {
            id: 1,
            title: 'Today Work #1'
        },
        { 
            id: 2,
            title: 'Today Work #2'
        }
    ]
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    // fetch todos
    async fetchTodos({commit}) {
        const response = await axios.get(url);
        commit('initiateTodos', response.data);
    },

    // add todo
    async addTodo({commit}, title) {
        const response = await axios.post(url, { title, completed: false });
        commit('addTodo', response.data);
    },

    // delete todo
    async deleteTodo({commit}, id) {
        const response = await axios.delete(`${url}/${id}`);
        if (response.status === 200) {
            commit('removeTodo', id);
        }
    },

    // update todo
    async updateTodo({commit}, todo) {
        const response = await axios.put(`${url}/${todo.id}`, todo);
        if (response.status === 200) {
            commit('updateTodo', todo);
        }
    },

    // filter todos
    async filterTodos({commit}, limit) {
        const response = await axios.get(`${url}?_limit=${limit}`);
        commit('initiateTodos', response.data);
    }
};

const mutations = {
    initiateTodos: (state, todos) => state.todos = todos,
    addTodo: (state, newTodo) => state.todos.unshift(newTodo),
    removeTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id !== id),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex((todo)=> todo.id === updTodo.id);
        if(index !== -1) {
            state.todos.splice(index, 1, updTodo)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}