import { JwtPayload } from "./auth.types";


declare global {

    namespace Express {

        interface Request {

            user: JwtPayload;
            params: Record<string, any>;
            query: Record<string, any>;
            body: any;

        }

    }

}


export {};