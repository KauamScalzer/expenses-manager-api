import "reflect-metadata"
import { AppDataSource } from './config/data-source'

AppDataSource.initialize()
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(3000, () => console.log('Server running at http://localhost:3000'))
  })
  .catch(console.error)
