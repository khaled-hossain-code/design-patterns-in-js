// we need to create a program which returns a piece of html

// lets return paragraph
const hello = "hello";
const html = [];
html.push("<p>");
html.push(hello);
html.push("</p>");
console.log(html.join(""));

//lets return list of words
const words = ["hello", "world"];
const html1 = [];
html1.push("<ul>\n");

words.forEach((word) => {
  html1.push(`  <li>${word}</li>\n`);
});

html1.push("</ul>");

console.log(html1.join(""));
