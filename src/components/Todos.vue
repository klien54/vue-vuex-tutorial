<template>
    <div>
        <div class="todos">
            <div class="todo" v-for="todo in allTodos" :key="todo.id" @dblclick="onTodoDblClick(todo)" :class="{'is-complete': todo.completed}">
                {{ todo.title }}
                <i class="fas fa-trash-alt" @click="onTrash(todo.id)"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Todos',
        created() {
            this.fetchTodos();
        },
        computed: mapGetters(['allTodos']),
        methods: {
            ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
            onTrash(id) {
                this.deleteTodo(id);
            },
            onTodoDblClick(todo) {
                let updTodo = {
                    id: todo.id,
                    title: todo.title,
                    completed: !todo.completed
                }
                this.updateTodo(updTodo);
            }
        }
    }
</script>

<style scoped>
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}
i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}
.legend {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}
.complete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
}
.incomplete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #41b883;
}
.is-complete {
    background: #35495e;
    color: #fff;
}
@media (max-width: 500px) {
    .todos {
        grid-template-columns: 1fr;
    }
}
</style>