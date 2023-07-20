
export const destroySession = (req, res, next) => {
    if (req.session.login) {
        req.session.destroy(() => {
            res.status(200).json({ message: "Session destruida" })
        })
    }
}

export const getSession = (req, res, next) => {
    if (req.session.login) {
        res.status(200).json({ message: "Session activa" })
    } else {
        res.status(401).json({ message: "Session no activa" })
    }
}


export const login = (user, password) => {
    if (!password) return 'No se ha proporcionado un password'
    if (!user) return 'No se ha proporcionado un usuario'
    if (password !== '123') return 'Password incorrecta'
    if (user !== 'coderUser') return 'Credenciales incorrectas'
    if (user === 'coderUser' && password === '123') return 'logueado'
  }