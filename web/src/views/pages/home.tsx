import {VideoCard} from "../../components/video";
import {useContext, useEffect, useState} from "react";
import {getAllVideos} from "../../utils/packages/apis/media.api";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
    const { token } = useContext(AuthContext)
    const [medias, setMedias] = useState()

    useEffect(() => {
        getAllVideos({ token: token }).then((medias) => {
            setMedias(medias);
        })
    }, [])


    return (
        <div className="h-screen flex">
            <div className="grid grid-cols-12 gap-3 gap-y-6">
                {
                    medias?.map((media, key) => (
                        <VideoCard
                           key={key}
                           mediaId={media.id}
                           thumbnail={media.thumbnail}
                           title={media.title}
                           duration={media.metadata.duration}
                       />
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage;