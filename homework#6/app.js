import fs from 'fs';
import { Transform } from 'stream';

const operations = {
    uppercase: new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().toUpperCase());
        },
    }),
    lowercase: new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().toLowerCase());
        },
    }),
    capitalise: new Transform({
        transform(chunk, encoding, callback) {
            callback(
                null,
                chunk
                    .toString()
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.replace(word[0], word[0].toUpperCase()))
                    .join(' ')
            );
        },
    }),
    reverse: new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().split('').reverse().join(''));
        },
    }),
};

function app(inputFile, outputFile, operation) {
    if (!fs.existsSync(inputFile)) {
        throw new Error('No such file in current directory');
    }

    if (!outputFile) {
        throw new Error('Please write output file name');
    }

    if (!(operation.toLowerCase() in operations)) {
        throw new Error('No such operation');
    }

    const fileStream = fs.createReadStream(inputFile);
    const transformedData = fs.createWriteStream(outputFile);

    fileStream.pipe(operations[operation]).pipe(transformedData);
}

const [inputFile, outputFile, operation] = process.argv.slice(2);

app(inputFile, outputFile, operation);
