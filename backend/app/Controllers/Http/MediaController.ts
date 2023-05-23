import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from '../../Models/Media'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiVideoClient from '@api.video/nodejs-client'
const client = new ApiVideoClient({ apiKey: 'btgBHUHkt3s1s2kyETcvwke5kLHXMEb4sFGx9FaTHfY' })

export default class MediaController {
  // public async getVideos({ response }: HttpContextContract) {
  //   const videos = await client.videos.list()
  //   return response.json(videos)
  // }

  public async index({ response }: HttpContextContract) {
    const medias = await Media.all()
    const mediaDataPromises = medias.map(async (media) => {
      const videoStatus = await client.videos.getStatus(media.videoId)
      const mediaData = {
        id: media.id,
        title: media.title,
        thumbnail: media.thumbnail,
        metadata: videoStatus.encoding?.metadata,
      }
      return mediaData
    })

    const mediaData = await Promise.all(mediaDataPromises)
    return response.ok(mediaData)
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const media = await Media.findOrFail(params.id)
      const video = await client.videos.get(media.videoId)
      const mediaData = {
        id: media.id,
        title: media.title,
        thumbnail: media.thumbnail,
        mediaUrl: video.assets?.mp4,
        hls: video.assets?.hls,
      }

      return response.status(200).json(mediaData)
    } catch (e) {
      return response.status(400).json({
        message: 'error',
      })
    }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const file = request.file('file')

    const userSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
    })

    if (!file) {
      return response.badRequest('No file uploaded')
    }

    try {
      const data = await request.validate({ schema: userSchema })
      const video = await client.videos.create(data)
      await client.videos.upload(video.videoId, file.tmpPath!)
      const media = await Media.create({
        title: video.title,
        description: video.description,
        thumbnail: video.assets?.thumbnail,
        userId: auth.user.id,
        videoId: video.videoId,
      })
      return response.created(media)
    } catch (e) {
      console.error('Upload failed:', e)
      return response.status(500).json({ error: 'Video upload failed' })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const media = await Media.findOrFail(params.id)
      await client.videos.delete(media.videoId)
      await media.delete()
      return response.status(202).json({
        message: 'success to remove media',
      })
    } catch (e) {
      return response.status(204).json({
        message: 'error to removing this media',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const media = await Media.findOrFail(params.id)
    await media.merge(request.all()).save()
    return response.status(200).json(media)
  }

  public async upload({ auth, request, response }: HttpContextContract) {
    const file = request.file('file')

    if (!file) {
      return response.badRequest('No file uploaded')
    }

    try {
      const video = await client.videos.create({
        title: file.clientName,
      })

      await Media.create({
        title: video.title,
        description: video.description,
        thumbnail: video.assets?.thumbnail,
        userId: auth.user.id,
        videoId: video.videoId,
      })

      await client.videos.upload(video.videoId, file.tmpPath!)

      return response.json(video)
    } catch (error) {
      console.error('Upload failed:', error)
      return response.status(500).json({ error: 'Video upload failed' })
    }
  }
}
