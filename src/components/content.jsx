import Head from 'next/head'

const content = (pros) => {
  return (
    <div>
      <Head>
        <title>{pros.title}</title>
      </Head>
      <div id='page'>
        <main>
          {pros.children}
        </main>
      </div>
    </div>
  )
}

export default content
