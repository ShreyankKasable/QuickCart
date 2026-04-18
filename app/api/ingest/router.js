import { serve } from "ingest/next";
import ingest from "@/config/ingest";

export const { GET, POST, PUT } = serve({
    client: ingest,
    functions: [
        syncUserCreation, 
        syncUserUpdate, 
        syncUserDeletion
    ],
});