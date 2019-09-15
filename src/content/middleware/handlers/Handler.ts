export interface Handler {
    setNext(handler: Handler): Handler;
    handle(mutation: MutationRecord): void;
}
