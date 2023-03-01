import Head from 'next/head'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Chain Tree</title>
        <meta name="description" content="Chain Tree" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen">
        <div className="z-10 h-16 shadow-sm">header</div>
        <div className="flex flex-1 bg-gray-100">
          <div className="flex-1">
            <div className="max-w-2xl mx-auto mt-6">{children}</div>
          </div>
          <div className="w-full max-w-lg bg-red-200">phone</div>
        </div>
      </main>
    </>
  )
}
