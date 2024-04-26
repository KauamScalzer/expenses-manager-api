import "reflect-metadata"
import { AppDataSource } from './config/data-source'
import env from "./config/env"

AppDataSource.initialize()
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
