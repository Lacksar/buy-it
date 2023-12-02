export default function handler(req, res) {

    let pincodes = {

        "56604": ["Urlabari", "Koshi"],
        "56613": ["Biratnagar", "Koshi"]


    }

    res.status(200).send(pincodes)
}