import { useState } from 'react'
import Navbar from './components/Navbar'
import CompletedTodos from './components/CompletedTodos'

function App() {
  const [done, setDoneToDo] = useState([])
  const [page, setPage] = useState("home")
  const [editingId, setEditingId] = useState(null)
  const [toDoList, setToDoList] = useState([])
  const [In, setIn] = useState("")

  const handleInput = (e) => {
    console.log(e.target.value)
    setIn(e.target.value)
  }

  const handleDelete = (todo) => {
    setToDoList(
      toDoList.filter((item) => item.id !== todo.id)
    );
  }

  const handleAdd = () => {
    if (editingId == null) {
      setToDoList([...toDoList, {
        id: Date.now(),
        title: In,
        completed: false
      }])
      setIn("")
    } else {
      setToDoList(
        toDoList.map((todo) => {
          if (todo.id == editingId) {
            return {
              ...todo, title: In
            };
          }
          return todo;
        })
      )
      editingId = null;
      setIn("");
    }
  }

  const handleEdit = (todo) => {
    setIn(todo.title);
    setEditingId(todo.id);
  }

  const handleDone = (todo) => {
    setDoneToDo([...done, todo])
    handleDelete(todo)
  }

  return (
    <>
      <Navbar setPage={setPage} />

      {page === "home" ? (
        <div className='min-h-screen bg-slate-100 py-8'>

          <div className='w-[90%] max-w-3xl m-auto'>

            <div className='bg-white rounded-2xl shadow-md p-6'>

              <h1 className='text-3xl font-bold text-slate-800'>
                Add a Todo
              </h1>

              <p className='text-slate-500 mt-1 mb-5'>
                Keep track of your tasks and stay productive.
              </p>

              <div className='flex gap-3'>
                <input
                  name="title"
                  value={In}
                  onChange={handleInput}
                  type="text"
                  placeholder='Enter your task...'
                  className='border border-slate-300 bg-slate-50 rounded-lg px-4 py-2.5 w-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                />

                <button
                  onClick={handleAdd}
                  className='bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-lg text-white font-medium shadow-sm'
                >
                  Add
                </button>
              </div>

            </div>

            <div className='mt-8'>

              <h2 className='text-xl font-bold text-slate-800 mb-3'>
                Your Todos
              </h2>

              {toDoList.map((items) => {

                return (
                  <div
                    key={items.id}
                    className='flex items-center gap-3 bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-3 hover:shadow-md transition'
                  >

                    <div className='flex items-center justify-center'>
                      <input
                        type="checkbox"
                        onChange={() => {
                          handleDone(items)
                        }}
                        className='w-5 h-5 accent-blue-600 cursor-pointer'
                      />
                    </div>

                    <div className='flex-1 text-slate-700 font-medium break-words'>
                      {items.title}
                    </div>

                    <div className='flex gap-2'>

                      <button
                        onClick={() => {
                          handleEdit(items)
                        }}
                        className='bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1.5 rounded-lg text-sm font-medium'
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(items)
                        }}
                        className='bg-red-500 hover:bg-red-600 transition text-white px-3 py-1.5 rounded-lg text-sm font-medium'
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              })}

            </div>

          </div>

        </div>

      ) : (

        <CompletedTodos done={done} />

      )}

    </>
  )
}

export default App