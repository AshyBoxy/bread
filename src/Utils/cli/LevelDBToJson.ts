import LevelDOWN from "leveldown";
import levelup from "levelup";
import { writeFileSync } from "node:fs";
import { exit } from "node:process";

/* eslint-disable no-console */
const args = process.argv.slice(2);
const dbPath = args[0];
if (!dbPath) {
    console.error("Please provide a path to read from");
    exit(1);
}
console.error(`Reading LevelDB database at ${dbPath}`);

const db = levelup(LevelDOWN(dbPath), { createIfMissing: false });
await db.open();
console.error(db.status);


const jsonData: Record<string, unknown> = {};


const stream = db.createReadStream();
stream.on("data", (rawData) => {
    const key = (<Buffer>rawData.key).toString();
    const val = (<Buffer>rawData.value).toString();
    // console.error({ key, val });

    if (key in jsonData) {
        console.error(`Duplicate key ${key}`);
        return;
    }

    let data = val;

    try {
        const newData = JSON.parse(data);
        data = newData;
    } catch { /* empty */ }

    jsonData[key] = data;
});

stream.on("error", (err) => {
    console.error(err);
});

let closed = false;
let ended = false;

stream.on("close", () => {
    console.error("Stream closed");
    closed = true;
    if (ended && closed) finished();
});

stream.on("end", () => {
    console.error("Stream ended");
    ended = true;
    if (ended && closed) finished();
});

function finished(): void {
    console.error("Finished reading");
    const stringData = JSON.stringify(jsonData, null, 4);

    const output = args[1];
    if (!output) console.log(stringData);
    else {
        console.error(`Writing to ${output}`);
        writeFileSync(output, stringData, "utf8");
    }
}

