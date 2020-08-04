const puppeter = require ('puppeteer')
//ler pagina 
async function start() {

     async function loadMore(page,selector) {
       
        const moreButton = await page.$(selector)
        
        if(moreButton){
            console.log('more')
            await moreButton.click()
            await page.waitFor(selector, {timeout:3000}).catch(() => { console.log('timeout')})
            await loadMore(page,selector)
        }
    }
    async function getComments(page,selector) {
        const comments = await page.$$eval(selector, links => links.map( link => link.innerText))

        return comments
    }
    
    const browser = await puppeter.launch()  
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/p/CDUSssgHfjT/')

    await loadMore(page, '.dCJp8')

    const comments = await getComments(page, '.C4VMK span a')
    const counted  = count(comments) //quantidade de arrobas 
    const sorted   = sort(counted) // ordena do maior para o menor 

    sorted.forEach( comments => { console.log(comments) } )

    await browser.close()
    
}

//pegar comentarios


 
//contar arrobas repitidas

function count(arrobas) {
    const count = {}
    arrobas.forEach(arrobas => {count[arrobas] = (count[arrobas] || 0) + 1 })
    return count
}

//ordernar 

function sort(counted) {
    const entries = []

    for (prop in counted) {
        entries.push([prop, counted[prop]])   
    }
    const sorted = entries.sort( (a,b) => { return  b[1] - a[1] } )
    
    return sorted
}

 

start()