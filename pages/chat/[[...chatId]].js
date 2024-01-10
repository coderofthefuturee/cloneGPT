import Head from "next/head";
import { ChatSidebar } from "pages/components";
import { useState } from "react"

export default function Home() {
  const [messageText, setMessageText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("message text: ", messageText)
  }
  return (
    <div>
      <Head>
        <title>New chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-[rgb(0,7,48)] flex flex-col">
          <div className="flex-1">chat window</div>
          <footer className="bg-[rgb(6,10,33)] rounded-full p-6 m-4">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex justify-start p-2 w-full resize-none rounded-full bg-gray-800 text-white mr-2 border-gray-700 focus:border-emerald-500 focus:bg-gray-600 focus:outline border-2 focus:outline-emerald-800 hover:bg-gray-600" 
                placeholder="    Send a message..." />
                <button type="submit" className="text-white w-1/5 text-bold border-2 hover:text-green-500 p-4 rounded-full hover:bg-gray-600 hover:border-emerald-500">Search!</button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}
