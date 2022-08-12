const { db } = require('./db')
const { Cheese, Board, User } = require('./models/index')

describe('Cheese, Board and Users', () => {

    beforeAll(async () => {

        await db.sync({ force: true });
    })

    test('can create a cheese', async () => {
        // TODO - write test

        //testing from seed data
        const testCheese = await Cheese.create({
            title: 'Cheddar',
            description: 'Strong Cheese'
        })
        expect(testCheese.title).toEqual('Cheddar')
        expect(testCheese.description).toEqual('Strong Cheese')
    })

    test('can create a board', async () => {

        const testBoard = await Board.create({
            type: 'Hard Cheese',
            description: 'Sunday',
            rating: 9.7
        })

        expect(testBoard.type).toEqual('Hard Cheese')
        expect(testBoard.description).toEqual('Sunday')
        expect(testBoard.rating).toEqual(9.7)
    })

    test('can create a User', async () => {

        const testUser = await User.create({
            name: 'Paul',
            email: 'Email@email.com'
        })

        expect(testUser.name).toEqual('Paul')
        expect(testUser.email).toEqual('Email@email.com')

    })

    test('User can have many boards', async () => {

        await db.sync({ force: true })

        let newUser = await User.create({
            name: 'User1',
            email: 'Email1@email.com'

        })

        let newBoard1 = await Board.create({
            type: 'Hard Cheese 1',
            description: 'HCs',
            rating: 9.9
        })

        let newBoard2 = await Board.create({
            type: 'Soft Cheese',
            description: 'SCs',
            rating: 5.4
        })

        await newUser.addBoard(newBoard1);
        await newUser.addBoard(newBoard2);

        const Boards = await newUser.getBoards()

        expect(Boards[0].type).toEqual(newBoard1.type)
        expect(Boards[0].description).toEqual(newBoard1.description)
        expect(Boards[0].rating).toEqual(newBoard1.rating)
        expect(Boards[1].type).toEqual(newBoard2.type)
        expect(Boards[1].description).toEqual(newBoard2.description)
        expect(Boards[1].rating).toEqual(newBoard2.rating)
    })

    test('Board can have many cheeses', async () => {

        const hardCheeseBoard = await Board.create({
            type: 'Hard Cheese',
            description: 'First Board',
            rating: 9
        })

        const softCheeseBoard = await Board.create({
            type: 'Soft Cheese',
            description: 'Second Board',
            rating: 5.8
        })

        const mixCheeseBoard = await Board.create({
            type: 'Mixed Cheeses',
            describe: 'Best of both worlds',
            rating: 10
        })

        const parmesan = await Cheese.create({
            title: 'Parmesan',
            description: 'Italian Cheese',
        })

        const gruyère = await Cheese.create({
            title: 'Gruyère',
            description: 'Swiss Cheese',
        })

        const pecorino = await Cheese.create({
            title: 'Pecorino',
            description: 'Sheeps Cheese'
        })

        const mozzarella = await Cheese.create({
            title: 'Mozzarella',
            description: 'Pizza Cheese'
        })

        const brie = await Cheese.create({
            title: 'Brie',
            description: 'French Cheese'
        })

        const creamCheese = await Cheese.create({
            title: 'Cream Cheese',
            description: ' Frosting Cheese'
        })

        await hardCheeseBoard.addCheese(parmesan)
        await hardCheeseBoard.addCheese(gruyère)
        await hardCheeseBoard.addCheese(pecorino)
        await softCheeseBoard.addCheese(mozzarella)
        await softCheeseBoard.addCheese(brie)
        await softCheeseBoard.addCheese(creamCheese)
        //     await mixCheeseBoard.addCheese(mozzarella)
        //     await mixCheeseBoard.addCheese() use through
        //     await mixCheeseBoard.addCheese(brie)   {through: 'Board-cheese'}

        const getHardCheeses = await hardCheeseBoard.getCheeses()
        const getSoftCheeses = await softCheeseBoard.getCheeses()
        const getMixCheeses = await mixCheeseBoard.getCheeses()
        // console.log(getHardCheeses)
        console.log(getSoftCheeses[2].description)
        expect(getHardCheeses[0].title).toEqual(parmesan.title)
        expect(getHardCheeses[1].title).toEqual(gruyère.title)
        expect(getSoftCheeses[0].title).toEqual(mozzarella.title)
        expect(getSoftCheeses[2].description).toEqual(creamCheese.description)

    })
})