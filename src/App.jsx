import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CompletedTodos from './components/CompletedTodos'

function App() {
  const [page, setPage] = useState("home")
  const [completedTodos, setCompletedTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [toDoList, setToDoList] = useState([])
  const [In, setIn] = useState("")
  useEffect(() => {
    const getTodos = async () => {

      if (page === "home") {

        const response = await fetch("http://localhost:5000/api/todos");
        const data = await response.json();

        setToDoList(data.filter(todo => todo.completed === false))

      } else {

        const response = await fetch("http://localhost:5000/api/todos/completed");
        const data = await response.json();

        setCompletedTodos(data)

      }
    }

    getTodos();

  }, [page])


  const addTodo = async () => {
    if (editingId == null) {

      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: In,
          completed: false
        })
      })

      const data = await response.json()
      console.log(data)


      setToDoList(prev => [...prev, data]);
      setIn("");
    } else {

      const response = await fetch(`http://localhost:5000/api/todos/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: In
        })
      })
      const data = await response.json()
      setEditingId(null);
      setIn("");
      setToDoList(prev =>
        prev.map(todo =>
          todo._id === data._id ? data : todo
        )
      )

    }
  }

  const handleInput = (e) => {
    console.log(e.target.value)
    setIn(e.target.value)
  }

  const handleDelete = async (todo) => {
    await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "DELETE"
    })

    setToDoList(prev =>
      prev.filter(item => item._id !== todo._id)
    )

  }



  const handleEdit = (todo) => {
    setIn(todo.title);
    setEditingId(todo._id);
  }

  const handleDone = async (todo) => {
    const response = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: true
      })
    })

    const data = await response.json();
    setToDoList(prev =>
      prev.filter(todo => todo._id !== data._id)
    )
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
                  onClick={addTodo}
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
                    key={items._id}
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

        <CompletedTodos done={completedTodos} />

      )}

    </>
  )
}

export default App