import axios from "axios";

const serverUrl = 'http://localhost:3333/api/v1';

export const videoUpload = async ({ key, file, token, onUploadProgress }: {
    key: string,
    file: string,
    token: string,
    onUploadProgress: any
}) => {
    try {
        let formData = new FormData();
        formData.append(key, file);

        const res = await axios.post(`${serverUrl}/media/upload`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
            onUploadProgress
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getAllVideos = async ({ id, token }: {
    id: string,
    token: string
}) => {
    try {
        const res = await axios.get(id ? `${serverUrl}/media/${id}` : `${serverUrl}/media`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}
//const videos = () => {}