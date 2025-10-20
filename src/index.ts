import { AppDataSource } from "./data-source"
import express, { Application } from 'express';
import { router } from "./route/student";

const app: Application = express();

const port = 3000;



AppDataSource.initialize().then(async () => {


    app.use(express.json())
    app.use(router)


    app.get("/", (req,res) => {
    
        res.send("Server is running")
    })

    app.listen(port, () => {
       console.log(`Server running on http://localhost:${port}`)
    })

    


}).catch(error => console.log(error))
