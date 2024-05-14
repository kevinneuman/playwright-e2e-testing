import { Pool } from 'pg'

const DATABASE_URL = process.env.DATABASE_URL_LOCALHOST

export async function clearDatabase() {
  const pool = new Pool({ connectionString: DATABASE_URL })

  try {
    const client = await pool.connect()

    const tablesToKeep = ['_prisma_migrations']

    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'app';",
    )

    const tables = result.rows
      .map((row) => row.table_name)
      .filter((table) => !tablesToKeep.includes(table))

    await client.query('BEGIN')
    for (const table of tables) {
      await client.query(`TRUNCATE TABLE app."${table}" RESTART IDENTITY CASCADE;`)
    }
    await client.query('COMMIT')

    client.release()
  } catch (error) {
    console.error('Error clearing database:', error)
    await pool.end()
    throw error
  } finally {
    await pool.end()
  }
}
