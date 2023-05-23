import {useState, Fragment, memo, MemoExoticComponent, useContext, useRef,} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import logo from "../../assets/logo-v1.svg"
import {Link, NavLink} from "react-router-dom";
import {videoUpload} from "@/utils/packages/apis/media.api";
import AuthContext from "@/context/AuthContext";
import {toast, ToastContainer} from "react-toastify";


const userNavigation = [
    { name: 'Sign out' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const LayoutWeb: MemoExoticComponent<any> = memo((props: any) => {
    const navigation = []
    const { user, signout } = useContext(AuthContext)

    if (user) {
        navigation.push({ name: 'home', href: '/home' })
        navigation.push({ name: 'channel', href: '/edit' })
    } else {
        navigation.push({ name: 'signup', href: '/signup' })
        navigation.push({ name: 'signin', href: '/signin' })
    }

    const [active, setActive] = useState(false);

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({open}) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src={logo}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.href}
                                                        className={({ isActive }) => classNames(
                                                            isActive
                                                                ? "bg-gray-900 text-white"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "rounded-md px-3 py-2 text-sm font-medium"
                                                        )}
                                                        onClick={() => setActive(true)}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {
                                                user && (
                                                    <>
                                                        <FileUploadButton/>

                                                        {/* Profile dropdown */}
                                                        <Menu as="div" className="relative ml-3">
                                                            <div>
                                                                <Menu.Button
                                                                    className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                                    <span className="sr-only">Open user menu</span>
                                                                    <svg
                                                                        className="h-8 w-8 rounded-full verflow-hidden bg-gray-100 dark:bg-gray-600"
                                                                        fill="currentColor" viewBox="0 0 20 20"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd"
                                                                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                                              clip-rule="evenodd"></path>
                                                                    </svg>

                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items
                                                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    {userNavigation.map((item) => (
                                                                        <Menu.Item key={item.name}>
                                                                            {({active}) => (
                                                                                <Link to="/signin"
                                                                                    className={classNames(
                                                                                        active ? "bg-gray-100" : "",
                                                                                        "block px-4 py-2 text-sm text-gray-700"
                                                                                    )}
                                                                                    onClick={signout}
                                                                                >
                                                                                    {item.name}
                                                                                </Link>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button
                                            className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                active ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "block rounded-md px-3 py-2 text-base font-medium"
                                            )}
                                            aria-current={active ? "page" : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt=""/>
                                        </div>
                                        <div className="ml-3">
                                            <div
                                                className="text-base font-medium leading-none text-white">{user.username}</div>
                                            <div
                                                className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-mono tracking-tight text-gray-900">SkyStream</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
});


const FileUploadButton = () => {
    const [progress, setProgress] = useState(0);
    const { token } = useContext(AuthContext)

    const handleFileUpload = async (event: any) => {
        const file = event.target.files[0];
        await videoUpload({ key: 'file', file, token, onUploadProgress: (e) => {
            const { loaded, total } = e;
            const percentage = Math.floor((loaded * 100) / total);
            setProgress(percentage);
            // Show toast notification
            toast(`Progress: ${percentage}%`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: true,
                hideProgressBar: true,
                className: 'foo-bar'
            });
        }})
    };

    return (
        <div>
            <label htmlFor="file-upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Upload File
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
            <ToastContainer />
        </div>
    );
};

export default LayoutWeb