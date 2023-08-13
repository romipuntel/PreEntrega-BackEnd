import swaggerJSDoc from 'swagger-jsdoc'


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentation of my eCommerce api',
            description: 'This is the documentation of my api that I have developed for an ecommerce in the Coderhouse backend course.'
        }
    },
    apis: [`./docs/**/*.yaml`]
}
export const swaggerSetup = swaggerJSDoc(swaggerOptions)
