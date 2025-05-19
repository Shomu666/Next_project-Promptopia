import Feed from '@/components/Feed'

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center gap-2">
       <h1 className="font-extrabold text-5xl">Discover & Share
        
       </h1>
        <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 via-blue-400 to-green-400 bg-clip-text text-transparent">AI-Powered Prompts</span>
        <p>This is tool that anyone can use to get ready to use prompts and share them as well</p>

        <Feed/>

    </section>
  );
}
