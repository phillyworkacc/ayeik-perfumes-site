import fs, { readdirSync } from "fs"

function titleCase (text) {
   if (text.includes(" ")) {
      return text.split(" ").map(t => titleCase(t)).join(" ");
   }
   return `${text[0].toUpperCase()}${text.substring(1).toLowerCase()}`;
}

const folder = "./public/products";
const files = readdirSync(folder);
const products = [];
for (const file of files) {
   const productRawName = file.split(".")[0];
   const formattedProductName = titleCase(productRawName.replaceAll("_", " "));
   products.push({
      name: formattedProductName,
      images: [file].join(","),
      description: ""
   })
}

console.log(products)