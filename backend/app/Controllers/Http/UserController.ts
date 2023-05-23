import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserController {
  public async me({ auth, response }: HttpContextContract) {
    return response.ok({ me: auth.user })
  }

  public async signup({ request, response }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      ]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    const data = await request.validate({ schema: userSchema })

    await User.create(data)
    return response.status(201).json({
      message: `success to signup`,
    })
  }

  public async signin({ request, auth, response }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({}, [rules.minLength(8)]),
    })

    const { email, password } = await request.validate({ schema: userSchema })

    const token = await auth.attempt(email, password)
    const user = auth.user!

    return response.ok({
      type: token.type,
      token: token.token,
      ...user.serialize(),
    })
  }
}
