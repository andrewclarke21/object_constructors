function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
   return [title, author, pages, read]
  };
}

function Book2(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  let returned = `${title} ${author} ${pages} ${read}`
  this.info = function () {
   return returned
  }
}
const aliceInWonderLand = new Book(`Alice In Wonderland by`, 'Lewis Carroll,', '52 pages,', 'not read yet')
const aliceInWonderLand2 = new Book2(`Alice In Wonderland by`, 'Lewis Carroll,', '52 pages,', 'not read yet')
let infoPrint = aliceInWonderLand.info().join(' ')
console.log(infoPrint)
console.log(aliceInWonderLand2.info())