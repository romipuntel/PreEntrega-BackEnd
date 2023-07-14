import { Router } from 'express'
import { transporter } from '../utilis/nodemailer.js'
import { __dirname } from '../config/indexConfig.js'
//import { client } from '../utils/twilio.js'
//import config from '../config/configDB.js'

const router = Router()

router.get('/', async (req, res) => {
    try {

        await transporter.sendMail({
            to: ['r.puntel@hotmail.com'],
            subject: 'CORREO COTIZACION',
            //text: 'Probando segundo email'
            //html: '<h1>Promociones</h1>',
            //attachments: [{ path: __dirname + '/cripto-expert.jpg' }]
        })
        res.status(200).send('Mail sent')
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/', async (req, res) => {
    const { email, name, quote } = req.body
    try {
        await transporter.sendMail({
            to: email,
            subject: `Welcome ${name}`,
            text: quote
        })
        res.status(200).send('Mail sent')
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

/*router.get('/twilio', async (req, res) => {
    try {
        await client.messages.create({
            body: 'Primer sms de twilio',
            to: '+5491166174142',
            from: config.twilio_phone_number,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
*/
export default router
