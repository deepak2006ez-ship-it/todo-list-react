const CompletedTodos = ({done}) => {
    return (
        <div className='min-h-screen bg-slate-100 py-8'>

            <div className='w-[90%] max-w-3xl m-auto'>

                <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

                    <div className='bg-blue-600 text-white text-center p-5'>
                        <h1 className='text-2xl font-bold'>
                            Completed Tasks
                        </h1>

                        <p className='text-blue-100 text-sm mt-1'>
                            Tasks you have completed
                        </p>
                    </div>

                    <div className='p-5'>

                        {done.map((item) => {
                            return (
                                <div
                                    className='bg-slate-50 border border-slate-200 rounded-lg p-4 mb-3 text-slate-700 font-medium'
                                    key={item.id}
                                >
                                    ✓ {item.title}
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CompletedTodos