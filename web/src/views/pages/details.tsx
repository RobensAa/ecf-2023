import {VideoPlayer} from "../../components/video";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import {getAllVideos} from "../../utils/packages/apis/media.api";

const DetailPage = () => {
    let { id } = useParams();
    const { token } = useContext(AuthContext)
    const [media, setMedia] = useState()

    useEffect(() => {
        getAllVideos({ token: token, id }).then((medias) => {
            setMedia(medias);
        })
    }, [])

    if (!media) return null;

    return (
        <div>
            <VideoPlayer
                author="https://avatarfiles.alphacoders.com/227/22782.jpg"
                source={media.mediaUrl}
            />
        </div>
    )
}

export default DetailPage;