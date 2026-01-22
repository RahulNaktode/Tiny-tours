const getHome = (req, res) => {
    return res.json({
        message: "Welcome to Tiny Tours"
    })
};

const getHealth = (req, res) => {
    return res.json({
        status: "OK"
    })
}

export {getHome, getHealth}