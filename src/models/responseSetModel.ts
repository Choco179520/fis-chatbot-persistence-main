import { Document } from './documentModel';
import {JsonValue} from "@prisma/client/runtime/library";

export interface ResponseSet {
  id: number;
  responses: JsonValue;
  document?: Document | null;
}
