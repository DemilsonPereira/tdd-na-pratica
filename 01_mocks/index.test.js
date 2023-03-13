const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "id": 121,
                "name": "Fulano da Silva",
                "profession": "JS Developer",
                "age": 36
            },
            {
                "id": 122,
                "name": "Cicrano Oliveira",
                "profession": "Administradora",
                "age": 31
            },
            {
                "id": 321,
                "name": "Joazinho",
                "profession": "Python Developer",
                "age": 80
            }
        ]
        // Verifica o valor e a referencia
        deepStrictEqual(result, expected)
    }
})()