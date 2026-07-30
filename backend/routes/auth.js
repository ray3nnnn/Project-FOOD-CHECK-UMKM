const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { pool } = require("../database");


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        const rows = result.rows;

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });

        }

        const user = rows[0];

        const cocok = await bcrypt.compare(
            password,
            user.password
        );

        if (!cocok) {

            return res.status(401).json({
                success: false,
                message: "Password salah"
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({

            success: true,

            token,

            user: {
                id: user.id,
                nama: user.nama,
                role: user.role
            }

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

});



// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {

    try {

        const {
            nama,
            username,
            password
        } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        const rows = result.rows;

        if (rows.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Username sudah digunakan"

            });

        }

        const hash = await bcrypt.hash(password, 10);

        await pool.query(

            `
            INSERT INTO users
            (
                nama,
                username,
                password,
                role
            )
            VALUES
            (
                $1,
                $2,
                $3,
                'member'
            )
            `,

            [
                nama,
                username,
                hash
            ]

        );

        res.json({

            success: true,

            message: "Registrasi berhasil"

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Registrasi gagal"

        });

    }

});

module.exports = router;