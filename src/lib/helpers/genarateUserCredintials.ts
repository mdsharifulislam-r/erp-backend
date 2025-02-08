export async function generateUserCredintials(name:string) {
    const username = name.toLowerCase().split(" ").join("_")+genStr(8)
    const password = genStr(10)

    return {
        username,
        password
    }
}

function genStr(round:number){
    const str = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let temp=""
    for(let i =0;i<=round;i++){
        const index = Math.floor(Math.random()*str.length)
        temp+=str[index]
    }
    

    return temp
}