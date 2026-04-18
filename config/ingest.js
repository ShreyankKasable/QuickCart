import { Inngest } from "ingest";
import { connectDB } from "@/config/db";
import User from "@/models/user";

const ingest = new Inngest({
    id: "quickCart",
});

export const syncUserCreation = ingest.createFunction(
    {
        id: "sync-nser-from-clerk"
    },
    {
        event: "clerk/user.created"
    },
    async ({event}) => {
        const { id, email_addresses, image_url, first_name, last_name } = event.data;
        const userData = {
            _id: id,
            name: `${first_name} + " " + ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        }
        await connectDB();
        await User.create(userData);

    }
    
)

export const syncUserUpdate = ingest.createFunction(
    {
        id: "sync-user-from-clerk"
    },
    {
        event: "clerk/user.updated"
    },
    async ({event}) => {
        const { id, email_addresses, image_url, first_name, last_name } = event.data;
        const userData = {
            name: `${first_name} + " " + ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData);

    }
)

export const syncUserDeletion = ingest.createFunction(
    {
        id: "sync-user-from-clerk"
    },
    {
        event: "clerk/user.deleted"
    },
    async ({event}) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);

    }
)

export default ingest;


