import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {SESSION_COOKIE} from "@/config";


export default async function Home() {
    const sessionId = cookies().get(SESSION_COOKIE)?.value;
    if (!sessionId) {
        redirect('/sign-in');
    }

    redirect('/todos');

    return (
        <div>

        </div>
    );
}