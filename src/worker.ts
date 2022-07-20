import { doThings } from "./utils/goThings";

declare const self: DedicatedWorkerGlobalScope;

type Event = MessageEvent<{ id: number; name: string; params: unknown[] }>;

const fns = { doThings };

self.addEventListener(
    "message",
    async ({ data: { id, name, params } }: Event) => {
        try {
            if (!fns.hasOwnProperty(name))
                throw new Error(`Tryna execute unknown fn ${name}`);

            const pickedFn = fns[name as keyof typeof fns];
            const result = await pickedFn(
                ...(params as Parameters<typeof pickedFn>)
            );

            self.postMessage({ id, result });
            const bc = new BroadcastChannel("main");
            bc.postMessage(result)
        } catch (error) {
            self.postMessage({ id, error });
        }
    }
);
