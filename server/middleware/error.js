export default function (err, req, res, next) {
  return res.status(500).send(`Server Error: ${err.message}`);
}
