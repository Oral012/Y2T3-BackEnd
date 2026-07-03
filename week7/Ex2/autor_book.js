const Sequalize = require('sequelize');
const sequalize = require('../database.js'); 
const author = sequalize.define("Author", {
    name: dataTypes.STRING,
    birthYear: dataTypes.INTEGER,
})

const book = sequalize.define("Book",{
    titile: datatypes.String,
    publicationYear: dataTypes.INTEGER,
    paages: dataTypes.INTEGER,
})
Author.hasMany(Book);
Book.belongsTo(Author);

const ronan= await author.create({
    name: "Ronana The best",
    birthYear: 1990
})
await ronan.createBook({ title: 'Mastering JavaScript', publicationYear: 2015, pages: 320 });
  await ronan.createBook({ title: 'Sequelize Survival Guide', publicationYear: 2020, pages: 250 });
const kim = await author.create({
    name: "Kin Ang",
    birthYear: 1995,
})
await kim.createBook({ title: 'Node.js Design Patterns', publicationYear: 2018, pages: 450 });
  await kim.createBook({ title: 'Building REST APIs', publicationYear: 2022, pages: 180 });
const hok = await author.create({
    name: "Hok Tim",
    birthYear: 2015
})
await hok.createBook({ title: 'Learning MySQL', publicationYear: 2012, pages: 300 });
await hok.createBook({ title: 'Database Design', publicationYear: 2016, pages: 220 });


const getbookByAuthor = async (authorId) => {
    return await book.findAll({ where: { authorId } });
};

const addBookToAuthor = async (authorId, bookData) => {
    const autor = await author.findByPk(authorId);
    if (!author) {
        throw new Error();
    }
    const newBook = await book.create({ ...bookData, authorId });
    return newBook;
}

const listAuthorsWithBooks = async () => {
    const authors = await author.findAll({
        include: book,
    });
    return authors;
}