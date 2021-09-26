const data = {
    title: "accueil",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquid aspernatur distinctio dolore dolores ea eligendi enim, et iste libero quaerat quas, quibusdam, sapiente sint suscipit totam voluptas voluptatum?</p>"
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
    } else {
        res.status(200).json(data)
    }

}