import { Pool } from 'pg'
import { v4 as uuidv4 } from 'uuid'

const DATABASE_URL = process.env.DATABASE_URL_LOCALHOST

export async function addTodos() {
  const pool = new Pool({ connectionString: DATABASE_URL })

  try {
    const client = await pool.connect()

    await client.query('BEGIN')
    await client.query(
      'INSERT INTO app."Todo" (id, title, description, "updatedAt") VALUES ($1, $2, $3, CURRENT_TIMESTAMP(3))',
      [uuidv4(), 'Done', 'This is done'],
    )
    await client.query(
      'INSERT INTO app."Todo" (id, title, description, "updatedAt") VALUES ($1, $2, $3, CURRENT_TIMESTAMP(3))',
      [uuidv4(), 'Finish the Project', 'Complete remaining tasks'],
    )
    await client.query('COMMIT')

    client.release()
  } catch (error) {
    console.error('Error adding todo to database:', error)
    throw error
  } finally {
    await pool.end()
  }
}
