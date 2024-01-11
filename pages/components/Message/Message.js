import { useUser } from "@auth0/nextjs-auth0/client";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ReactMarkdown} from "react-markdown/lib/react-markdown";

export const Message = ({role, content}) => {
    const { user }= useUser();
    return (
    <div className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${role === "assistant" ? "bg-gray-600" : ""}`}>
        <div>
            {role == "user" &&
                <Image 
                src={user.picture} 
                width={30} 
                height={30} 
                alt="user avatar" 
                className="rounded-sm shawdow-md shawdow-black/50"/>
            }
            {role === "assistant" && (
                <div className="flex h-[30px] w-[30px] items-center justify-center shadow-md shadow-black/50 bg-gray-500">
                    <FontAwesomeIcon icon={faRobot} className="text-emerald-200"/>
                </div>
            )}
        </div>
        <div>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div> 
    </div>
    );
};