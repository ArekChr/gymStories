import BaseUrlDev from './BaseUrl.dev'
import BaseUrlProd from './BaseUrl.prod'

const BaseUrl = process.env.NODE_ENV === 'production' ? BaseUrlProd : BaseUrlDev

export default BaseUrl