import { useForm } from 'react-hook-form'

type FormValues = {
    username: string
}

export const DynamicForm = (props: {
    inputs: [{ type: string, name: string, value?: string, placeholder?: string, required?: false }],
    onSubmit: () => {}
}) => {

    const form = useForm<FormValues>()
    const { register, handleSubmit } = form

    return (
        <form
            className="w-full max-w-lg"
            onSubmit={handleSubmit(props.onSubmit)}
        >
            {
                props.inputs.map((input: any, key) => (
                    <div key={key} className="flex flex-wrap -mx-3 mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor={input.name}
                        >{input.name}</label>
                        <input
                            type={input.type}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={input.placeholder}
                            id={input.name}
                            value={input.value}
                            {...register(input.name, { required: input.required })}
                        />
                    </div>
                ))
            }
            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
            </button>
        </form>
    )
}