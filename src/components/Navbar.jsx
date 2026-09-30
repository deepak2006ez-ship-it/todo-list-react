const Navbar = ({ setPage }) => {
    return (
        <nav className='bg-slate-900 text-white shadow-md'>

            <div className='w-[90%] max-w-6xl m-auto flex justify-between items-center py-4'>

                <div className='font-bold text-2xl'>
                    iTask
                </div>

                <ul className='flex gap-6 text-sm font-medium'>

                    <li
                        onClick={() => setPage("home")}
                        className='cursor-pointer hover:text-blue-400 transition'
                    >
                        Home
                    </li>

                    <li
                        onClick={() => setPage("completed")}
                        className='cursor-pointer hover:text-blue-400 transition'
                    >
                        Your Tasks
                    </li>

                </ul>

            </div>

        </nav>
    )
}

export default Navbar