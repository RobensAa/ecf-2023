import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description', 'longtext').nullable()
      table.string('video_id').notNullable()
      table.string('user_id').unsigned().notNullable()
      // table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.boolean('online').notNullable().defaultTo(false)
      table.string('thumbnail').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
