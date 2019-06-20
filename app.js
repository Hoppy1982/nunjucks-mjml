const fs = require('fs')
const nunjucks = require('nunjucks')
const mjml2html = require('mjml')
const model = require('./model.js').model
const branding = require('./src/branding.js').branding

const outputHTMLDir = './dist/output.html'
const outputMJMLDir = './dist/output.mjml'

nunjucks.configure(
  'src/templates', 
  { 
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false
  }
)

const outputMJML = nunjucks.render('job-alert.njk', {model, branding})
const outputHTML = mjml2html(outputMJML, {
  fonts: {
    Lato: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
    Roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
  }
}).html

fs.writeFile(outputMJMLDir, outputMJML, (err) =>{
  if (err) throw err
  console.log('output.mjml saved...')
})

fs.writeFile(outputHTMLDir, outputHTML, (err) =>{
  if (err) throw err
  console.log('output.html saved...')
})

