import { prismaClient } from '../src/utils/prismaClient'

async function main() {
  await prismaClient.todo.create({
    data: {
      title: 'Done',
      description: 'This is done',
    },
  })

  await prismaClient.todo.create({
    data: {
      title: 'Finish the Project',
      description: 'Complete remaining tasks',
    },
  })
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prismaClient.$disconnect()
    process.exit(1)
  })
