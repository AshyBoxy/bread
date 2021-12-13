import fetch from "node-fetch";
import IBibleBook from "../Interfaces/BibleBook";
import IBibleVerse from "../Interfaces/BibleVerse";

const books: IBibleBook[] = [
    {
        name: "Genesis",
        abbreviation: "Gen.",
        chapters: 50
    },
    {
        name: "Exodus",
        abbreviation: "Exo.",
        chapters: 40
    },
    {
        name: "Leviticus",
        abbreviation: "Lev.",
        chapters: 27
    },
    {
        name: "Numbers",
        abbreviation: "Num.",
        chapters: 36
    },
    {
        name: "Deuteronomy",
        abbreviation: "Deut.",
        chapters: 34
    },
    {
        name: "Joshua",
        abbreviation: "Josh.",
        chapters: 24
    },
    {
        name: "Judges",
        abbreviation: "Judg.",
        chapters: 21
    },
    {
        name: "Ruth",
        abbreviation: "Ruth",
        chapters: 4
    },
    {
        name: "1 Samuel",
        abbreviation: "1 Sam.",
        chapters: 31
    },
    {
        name: "2 Samuel",
        abbreviation: "2 Sam.",
        chapters: 24
    },
    {
        name: "1 Kings",
        abbreviation: "1 Kings",
        chapters: 22
    },
    {
        name: "2 Kings",
        abbreviation: "2 Kings",
        chapters: 25
    },
    {
        name: "1 Chronicles",
        abbreviation: "1 Chron.",
        chapters: 29
    },
    {
        name: "2 Chronicles",
        abbreviation: "2 Chron.",
        chapters: 36
    },
    {
        name: "Ezra",
        abbreviation: "Ezra",
        chapters: 10
    },
    {
        name: "Nehemiah",
        abbreviation: "Neh.",
        chapters: 13
    },
    {
        name: "Esther",
        abbreviation: "Esth.",
        chapters: 10
    },
    {
        name: "Job",
        abbreviation: "Job",
        chapters: 42
    },
    {
        name: "Psalms",
        abbreviation: "Psa.",
        chapters: 150
    },
    {
        name: "Proverbs",
        abbreviation: "Prov.",
        chapters: 31
    },
    {
        name: "Ecclesiastes",
        abbreviation: "Eccl.",
        chapters: 12
    },
    {
        name: "Song of Solomon",
        abbreviation: "S.S.",
        chapters: 8
    },
    {
        name: "Isaiah",
        abbreviation: "Isa.",
        chapters: 66
    },
    {
        name: "Jeremiah",
        abbreviation: "Jer.",
        chapters: 52
    },
    {
        name: "Lamentations",
        abbreviation: "Lam.",
        chapters: 5
    },
    {
        name: "Ezekiel",
        abbreviation: "Ezek.",
        chapters: 48
    },
    {
        name: "Daniel",
        abbreviation: "Dan.",
        chapters: 12
    },
    {
        name: "Hosea",
        abbreviation: "Hosea",
        chapters: 14
    },
    {
        name: "Joel",
        abbreviation: "Joel",
        chapters: 3
    },
    {
        name: "Amos",
        abbreviation: "Amos",
        chapters: 9
    },
    {
        name: "Obadiah",
        abbreviation: "Oba.",
        chapters: 1
    },
    {
        name: "Jonah",
        abbreviation: "Jonah",
        chapters: 4
    },
    {
        name: "Micah",
        abbreviation: "Micah",
        chapters: 7
    },
    {
        name: "Nahum",
        abbreviation: "Nahum",
        chapters: 3
    },
    {
        name: "Habakkuk",
        abbreviation: "Hab.",
        chapters: 3
    },
    {
        name: "Zephaniah",
        abbreviation: "Zeph.",
        chapters: 3
    },
    {
        name: "Haggai",
        abbreviation: "Hag.",
        chapters: 2
    },
    {
        name: "Zechariah",
        abbreviation: "Zech.",
        chapters: 14
    },
    {
        name: "Malachi",
        abbreviation: "Mal.",
        chapters: 4
    },
    {
        name: "Matthew",
        abbreviation: "Matt.",
        chapters: 28
    },
    {
        name: "Mark",
        abbreviation: "Mark",
        chapters: 16
    },
    {
        name: "Luke",
        abbreviation: "Luke",
        chapters: 24
    },
    {
        name: "John",
        abbreviation: "John",
        chapters: 21
    },
    {
        name: "Acts",
        abbreviation: "Acts",
        chapters: 28
    },
    {
        name: "Romans",
        abbreviation: "Rom.",
        chapters: 16
    },
    {
        name: "1 Corinthians",
        abbreviation: "1 Cor.",
        chapters: 16
    },
    {
        name: "2 Corinthians",
        abbreviation: "2 Cor.",
        chapters: 13
    },
    {
        name: "Galatians",
        abbreviation: "Gal.",
        chapters: 6
    },
    {
        name: "Ephesians",
        abbreviation: "Eph.",
        chapters: 6
    },
    {
        name: "Philippians",
        abbreviation: "Phil.",
        chapters: 4
    },
    {
        name: "Colossians",
        abbreviation: "Col.",
        chapters: 4
    },
    {
        name: "1 Thessalonians",
        abbreviation: "1 Thes.",
        chapters: 5
    },
    {
        name: "2 Thessalonians",
        abbreviation: "2 Thes.",
        chapters: 3
    },
    {
        name: "1 Timothy",
        abbreviation: "1 Tim.",
        chapters: 6
    },
    {
        name: "2 Timothy",
        abbreviation: "2 Tim.",
        chapters: 4
    },
    {
        name: "Titus",
        abbreviation: "Titus",
        chapters: 3
    },
    {
        name: "Philemon",
        abbreviation: "Philem.",
        chapters: 1
    },
    {
        name: "Hebrews",
        abbreviation: "Heb.",
        chapters: 13
    },
    {
        name: "James",
        abbreviation: "James",
        chapters: 5
    },
    {
        name: "1 Peter",
        abbreviation: "1 Pet.",
        chapters: 5
    },
    {
        name: "2 Peter",
        abbreviation: "2 Pet.",
        chapters: 3
    },
    {
        name: "1 John",
        abbreviation: "1 John",
        chapters: 5
    },
    {
        name: "2 John",
        abbreviation: "2 John",
        chapters: 1
    },
    {
        name: "3 John",
        abbreviation: "3 John",
        chapters: 1
    },
    {
        name: "Jude",
        abbreviation: "Jude",
        chapters: 1
    },
    {
        name: "Revelation",
        abbreviation: "Rev.",
        chapters: 22
    }
];

const getRandomVerse = async (): Promise<{
    book: IBibleBook;
    verse: IBibleVerse;
    chapter: number;
    verseNumber: string;
}> => {
    const book = books[Math.floor(Math.random() * books.length)];
    const chapter = Math.floor(Math.random() * book.chapters) + 1;
    let verseNum = Math.floor(Math.random() * 30) + 1;
    if (verseNum < 5) verseNum = 5;
    let verseNumber = `${verseNum - 4}-${verseNum}`;

    let verse = await getVerse(book.abbreviation, chapter, verseNumber);

    if (verse.message) {
        verseNum = Math.floor(Math.random() * 20) + 1;
        if (verseNum < 5) verseNum = 5;
        verseNumber = `${verseNum - 4}-${verseNum}`;
        verse = await getVerse(book.abbreviation, chapter, verseNumber);
    }

    return { book, verse, chapter, verseNumber };
};

const getVerse = async (book: string, chapter: number, verseNum: number | string): Promise<IBibleVerse> => {
    const rawVerse: {
        message: string;
        copyright: string;
        verses: { ref: string, text: string; }[];
    } = <never>(await (await fetch(
        `https://api.lsm.org/recver.php?String='${book} ${chapter}:${verseNum}'&Out=json`
    )).json());

    const verse: IBibleVerse = {
        verses: rawVerse.verses.map((x) => x.text),
        copyright: rawVerse.copyright,
        message: rawVerse.message
    };

    return verse;
};



export { books, getVerse, getRandomVerse };
