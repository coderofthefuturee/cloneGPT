import Head from "next/head";
import { ChatSidebar } from "pages/components";
import { useState } from "react"
import {v3 as uuid} from 'uuid'
import Message from "./components/Message/Message"

export default function Home() {
  const [incomingMessage, setIncomingMessage] = useState("")
  const [messageText, setMessageText] = useState("");
  const [newChatMessages, setNewChatMessages] = useState([]);
  const [generatingResponse, setGeneratingResponse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratingResponse(true);
    setNewChatMessages((prev) => {
      const newChatMessages = [...prev, {
        _id: uuid(),
        role: "user",
        content: messageText,
      }];
      return newChatMessages;
    })
    setMessageText("");
    console.log("message text: ", messageText)
    const response = await fetch(`/api/chat/sendMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: messageText}),
    });
    const data = response.data;
    if(!data){
      return;
    }
    const reader = data.getReader();
    await streamReader(reader, (message) => {
      console.log('message: ',message);
      setIncomingMessage((s) => `${s}${message.content}`);
    });
    setGeneratingResponse(false);
  }
  return (
    <div>
      <Head>
        <title>New chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-[rgb(0,7,48)] flex flex-col overflow-hidden bg-gray-700">
          <div className="flex-1 text-white overflow-scroll">
            {newChatMessages.map((message) => (
              <Message 
                key={message._id}
                role={message.role}
                content={message.content}
              />
            ))}
            {!!incomingMessage && (
              <Message 
              role="assistant"
              content={incomingMessage}
            />)
            }
            
            {/* {incomingMessage} */}
          </div>
          <footer className="bg-[rgb(6,10,33)] rounded-full p-6 m-4">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2" disabled={generatingResponse}>
                <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex justify-start p-2 w-full resize-none rounded-full bg-gray-800 text-white mr-2 border-gray-700 focus:border-emerald-500 focus:bg-gray-600 focus:outline border-2 focus:outline-emerald-800 hover:bg-gray-600" 
                placeholder={generatingResponse ? "" : "   Send a message..." }/>
                <button type="submit" className="text-white w-1/5 text-bold border-2 hover:text-green-500 p-4 rounded-full hover:bg-blue-800 hover:border-emerald-500">Search!</button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}
