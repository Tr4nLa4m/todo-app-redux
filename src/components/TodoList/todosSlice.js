// const initState = [
//   { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//   { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//   { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },
// ];

// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'todoList/addTodo':
//       return [...state, action.payload];

//     case 'todoList/toggleTodoStatus':
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

// export default todoListReducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todoList',
  initialState: {
    status : 'idle', //idel = ranh roi
    todos: []
  },
  reducers: { // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find(todo => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    }
  },
  extraReducers : builder => {
    builder
    .addCase(fetchTodo.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchTodo.fulfilled , (state, action) => {
      state.todos = action.payload;
      state.status = 'idle';
    })
    .addCase(addNewTodo.fulfilled , (state, action) => {
      state.todos.push(action.payload);
      state.status = 'idle';
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      let current_todo = state.todos.find((todo) => todo.id === action.payload);
      current_todo = action.payload;
    })
  }
});



export const fetchTodo = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('api/todos');
  const data = await res.json();
  return data.todos;
});

export const addNewTodo = createAsyncThunk('todos/addTodos', async (newTodo) => {
  const res = await fetch('api/todos', {
    method: "POST",
    body : JSON.stringify(newTodo)
  });
  const data = await res.json();
  return data.todos;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const res = await fetch('api/updateTodo', {
    method: "POST",
    body : JSON.stringify(updatedTodo)
  });
  const data = await res.json();
  return data.todos;
});
// export function addTodos(todo) { // thunk action creator => to make thunk action
//   return function addTodosThunk(dispatch, getState){
//     //dispatch is the dispatch of redux and getState to put out all states in store
//     //can custom payload 
//     console.log(getState());
//     console.log({todo});
//   }
// }
export default todosSlice;
