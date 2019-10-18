import { Output } from "./output-task"
import { Input } from "./input-task"

export class TaskProcess {
    consumer: any
    dateConsumed: Date
    dateQueueIn: Date
    dateQueueOut: Date
    executor: string
    id: string
    input: Input
    output: Output
    state: string
    task: string
    exceptionMessage: string;
}


