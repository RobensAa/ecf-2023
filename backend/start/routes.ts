/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ response }) => {
  return response.json({ message: 'hello world' })
})

Route.get('/videos', 'VideosController.getVideos')

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'MediaController.index').as('media')
      Route.get('/:id', 'MediaController.show').as('media.by.id')
      Route.post('/create', 'MediaController.create').as('media.create')
      Route.delete('/delete/:id', 'MediaController.delete').as('media.delete')
      Route.put('/update/:id', 'MediaController.update').as('media.update')
      Route.post('/upload', 'MediaController.upload').as('media.upload')
    })
      .prefix('/media')
      .middleware('auth')
    Route.group(() => {
      Route.get('/me', 'UserController.me').as('auth.me').middleware('auth')
      Route.post('/signup', 'UserController.signup').as('auth.signup')
      Route.post('/signin', 'UserController.signin').as('auth.signin')
    }).prefix('/auth')
  }).prefix('/v1')
}).prefix('/api')
