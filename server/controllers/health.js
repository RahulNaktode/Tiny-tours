const getHome = (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Tiny Tour"
    })
}

const getHealth = (req, res) => {
    res.json({
        success: true,
        message: "OK"
    })
}

export { getHome, getHealth }