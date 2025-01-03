export function protectSummaryRoute(args: any) {
    if (!args) {
        throw new Error()
    }
    return true;
}