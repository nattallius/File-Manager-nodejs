export function getUsername() {
    const usernameArg = process.argv.slice(2).find((arg, i, arr) => {
        if (arg.startsWith("--username")) {
            return true;
        }
        return  false;
    });

    return usernameArg ? usernameArg.split("=")[1] : 'Unknown User';
}