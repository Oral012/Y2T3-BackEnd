// const filePath = "./hello.txt";

// // Write to a file (synchronously)
// fs.writeFileSync(filePath, "Hello, Node.js beginner!");

// // Read the file (synchronously)
// const content = fs.readFileSync(filePath, "utf8");
// console.log("File content:", content);


import fs from "fs";
const filePath = "./hello.txt";

fs.writeFile(filePath, "Hello, Node.js beginner!", (err) => {
        console.log("File written successfully!");
});


const content = fs.readFile(filePath, "utf8", (err, data) => {

        console.log("File content:", data);
});
