import {JsonValue} from "@prisma/client/runtime/library";

export interface Document {
    id: number;
    title: string;
    utterances: JsonValue;
    response_set_id: number;
}