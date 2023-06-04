import fs from 'fs';
import { Transform } from 'stream';

const operations = {
    uppercase(str) {
        return str.toString().toUpperCase()
    },
    lowercase(str) {
        return str.toString().tolowercase()
    },
    capitalize(str) {
        return str
            .toString()
            .toLowerCase()
            .split(' ')
            .map(word => word.replace(word[0], word[0].toUpperCase()))
            .join(' ');
    },
    reverse(str) {
        return str.toString().split('').reverse().join('');
    }
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

    
    fileStream
    .pipe(new Transform({
        transform(chunk, encoding, callback) {
            callback(null, operations[operation](chunk));
        },
    }))
    .pipe(transformedData);
}

const [inputFile, outputFile, operation] = process.argv.slice(2);

app(inputFile, outputFile, operation);
