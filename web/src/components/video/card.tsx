import {NavLink} from "react-router-dom";

const VideoCard = ({ thumbnail, title, duration, mediaId }) => {

    return (
                <div className="col-span-12 sm:col-span-6 md:col-span-3 max-w-sm">
                    <div className="w-full flex flex-col">
                        <div className="relative">

                            <NavLink to={`/watch/${mediaId}`}>
                                <img alt={"video-thumbnail"} src={thumbnail} className="w-96 h-auto rounded-2xl"/>
                            </NavLink>

                            <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">0:{duration}</p>
                        </div>

                        <div className="flex flex-row mt-2 gap-2">

                            <a href="#">
                                <img alt={"video-author-picture"} src="https://picsum.photos/seed/1/40/40"
                                     className="rounded-full max-h-10 max-w-10"/>
                            </a>

                            <div className="flex flex-col">
                                <NavLink to={`/watch/${mediaId}`}>
                                    <p className="text-black text-sm font-semibold">{title}</p>
                                </NavLink>
                                <a className="text-gray-400 text-xs mt-2 hover:text-gray-100" href="#"> Web Dev
                                    Simplified </a>
                                <p className="text-gray-400 text-xs mt-1">241K views . 3 years ago</p>
                            </div>

                        </div>
                    </div>
                </div>


    )
}

export default VideoCard