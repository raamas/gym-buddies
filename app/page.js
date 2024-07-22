import Feed from "@components/Feed/Feed";

export default function Home() {
  return (
    <div className="main bg-base-100">
          <div className='hero bg-gradient-to-br from-primary from-10% via-secondary via-70% to-accent to-90%  top-10 min-h-[70vh]'>
            <div className='hero-content items-center justify-center p-4'>
              <span className=''>
                <h1 className='text-4xl font-black text-neutral' >Take on a physical challenge and <br className='max-md:hidden' /> compete with your friends</h1>
              </span>
            </div>
          </div>
          
          <main className='flex flex-col items-center'>
            <Feed />
          </main>

    </div>
  )
}
