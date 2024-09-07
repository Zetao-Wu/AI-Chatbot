import express from 'express';
const app = express();
//middlwares
app.use(express.json());
//connections and listeners
app.listen(5001, () => console.log("Server Open"));
//# sourceMappingURL=index.js.map