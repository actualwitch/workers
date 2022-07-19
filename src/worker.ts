import { doThings } from "./utils/goThings";

declare const self: DedicatedWorkerGlobalScope;

type Event = MessageEvent<{ id: number; name: string; params: unknown[] }>;

const fns = { [doThings.name]: doThings };

self.addEventListener(
    "message",
    async ({ data: { id, name, params } }: Event) => {
        try {
            if (!fns.hasOwnProperty(name))
                throw new Error("Tryna execute unknown fn");

            const pickedFn = fns[name];
            const result = await pickedFn(
                ...(params as Parameters<typeof pickedFn>)
            );

            self.postMessage({ id, result });
        } catch (error) {
            self.postMessage({ id, error });
        }
    }
);
