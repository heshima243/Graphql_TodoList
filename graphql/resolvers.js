import { json } from 'express'
import fs from 'fs/promises'
import path from 'path'

const readfile = async (path) => JSON.parse(await fs.readFile(path, 'utf-8'))

export default {
    async allTodos(){
        return  await readfile('todos.json')
    },
    async oneTodo({id}){
        const todos = await readfile('todos.json')
        const todo = todos.find(todo => todo.id === id)
        return todo
    },
    async filteredTodo({finished}){
        const todos = await readfile('todos.json')
        const filterd = todos.filter(todo => todo.finished === finished)
        return filterd
    },
    async createTodo({text}){
        const todos = await readfile('todos.json')
        const newTodo = {id : todos.length + 1, text,finished : false}
        todos.push(newTodo)
        await fs.writeFile("todos.json", JSON.stringify(todos))
        return newTodo
    },
    async updateTodo({id}){
        const todos = await readfile('todos.json')
        const todo = todos.find(todo => todo.id === id)
        todo.finished = !todo.finished
        await fs.writeFile("todos.json", JSON.stringify(todos))
        return "update TODO"
    },
    async deleteTodo({id}){
        const todos = await readfile('todos.json')
       const newTodos = todos.filter(todo => todo.id !== id)
        await fs.writeFile("todos.json", JSON.stringify(newTodos))
        return "delete TODO"
    }
}