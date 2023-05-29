const os = require("os");
const readline = require("readline");

const username = os.userInfo().username;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`Welcome ${username}!`);

rl.on("line", (input) => {
    const [command, subCommand] = input.trim().split(" ");

    if (command === ".exit") {
        rl.close();
    } else if (command === "os") {
        handleOSCommand(subCommand);
    } else {
        console.log("Invalid input");
    }
});

rl.on("close", () => {
    console.log(`Thank you ${os.userInfo().username}, goodbye!`);
});

function handleOSCommand(subCommand) {
    switch (subCommand) {
        case "--cpus":
            const cpuInfo = os.cpus();
            console.log(
                `amount of CPUs: ${cpuInfo.length}, model: ${cpuInfo[0].model}`
            );
            break;
        case "--homedir":
            console.log(`Home Directory: ${os.homedir()}`);
            break;
        case "--username":
            console.log(`Username: ${username}`);
            break;
        case "--arch":
            console.log(`CPU Architecture: ${os.arch()}`);
            break;
        case "--hostname":
            console.log(`Hostname: ${os.hostname()}`);
            break;
        case "--platform":
            console.log(`Platform: ${os.platform()}`);
            break;
        case "--memory":
            console.log(`Total Memory: ${os.totalmem()} bytes`);
            break;
        default:
            console.log("Invalid input");
            break;
    }
}
