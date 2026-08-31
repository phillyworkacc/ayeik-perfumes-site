export function titleCase (text: string): string {
   if (text.includes(" ")) {
      return text.split(" ").map(t => titleCase(t)).join(" ");
   }
   return `${text[0].toUpperCase()}${text.substring(1).toLowerCase()}`;
}