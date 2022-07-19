export const doThings = (delay = 1) => {
    const stopAt = new Date().valueOf() + 1000 * delay;
    do {
        if (new Date().valueOf() > stopAt) break;
    } while (true);
    return "Done";
};
