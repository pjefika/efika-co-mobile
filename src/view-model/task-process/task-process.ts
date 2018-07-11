import { Input } from "./input-task";
import { Output } from "./output-task";

export class TaskProcess {
    id: string;
    dateQueueIn: number;
    dateConsumed: number;
    dateQueueOut: number;
    state: string;
    task: string;
    executor: string;
    consumer: string;
    input: Input;
    output: Output;
    exceptionMessage: string;
}