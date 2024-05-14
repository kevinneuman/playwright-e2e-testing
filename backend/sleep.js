function sleep(ms) {
  return new Promise((resolve) =>
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      resolve
    }, ms),
  )
}

async function main() {
  const delay = 2000
  await sleep(delay)
}

main()
