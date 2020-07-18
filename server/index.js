const express = require('express')
const app = express()

require('dotenv').config()
/** ****************************************************************
 *
 * - Initialize environment variables
 * - Perform configuration
 *
 */

app.use(express.static('./client/dist'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on PORT ${process.env.PORT || 3001}`);
});