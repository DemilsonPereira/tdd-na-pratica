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
        const filePath = './mocks/invalid-header.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Fulano da Silva",
                "id": 121,
                "profession": "JS Developer",
                "birthDay": 1987
            },
            {
                "name": "Cicrano Oliveira",
                "id": 122,
                "profession": "Administradora",
                "birthDay": 1992
            },
            {
                "name": "Joazinho",
                "id": 321,
                "profession": "Python Developer",
                "birthDay": 1978
            }
        ]
        // Verifica o valor e a referencia
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()