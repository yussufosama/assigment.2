const Fs = require("fs")
const path = require("path")
const { EventEmitter } = require("events")
let events = new EventEmitter()
const os = require("os")
const http = require("http")
//Q1


function func1() {
    console.log("File: " + __filename, "Dir: " + __dirname)
}
func1()


//Q2


function file_name(filename) {
    console.log(path.basename(filename))
}
let filename = "C:\\javascript\\assignment2\\index.js"
file_name(filename)

//Q3


const obj = {
    root: 'C:\\',
    dir: 'C:\\javascript\\assignment2',
    base: 'index.js',
    ext: '.js',
    name: 'index'
}
function path_creation(obj) {
    console.log(path.format(obj))
}
path_creation(obj)


//Q4

function file_extensions(filename) {
    console.log(path.extname(filename))
}
file_extensions(filename)

//Q5

function file_name_extensions(filename) {
    fileparse = path.parse(filename)
    console.log("Name :", fileparse.name, "   ", "Ext :", fileparse.ext)
}
file_name_extensions(filename)


//Q6

function is_absolute(filename) {
    console.log(path.isAbsolute(filename))
}
is_absolute(filename)

//Q7


function join() {
    console.log("/src" + "/components" + "/App.js")
}
join()

//Q8


function resolve() {
    console.log(path.resolve("index.txt"))
}
resolve()


//Q9


function join1() {
    console.log("/folder1" + "/folder2" + "/file.txt")
}
join1()


//Q10


function delete_file(filename) {
    Fs.unlink(filename, () => {
        console.log("the " + path.basename(filename) + " is deleted")
    })
}
delete_file("./deleted.txt")
//Q11


// function del_file(filename){
//     Fs.mkdirSync(filename)
//     console.log("sucsses")
// }
// del_file("./folder1")

//Q12


events.on("start", () => {
    console.log("welcome event triggered!")
})
events.emit("start")


//Q13


events.on("login", (username) => {
    console.log("user loged in:" + username)
})
events.emit("login", "ahmed")


//Q14


function read_file_sync(file) {
    const data = Fs.readFileSync(file, "utf-8")
    console.log(data)
}
read_file_sync("./notes.txt")


//Q15


function write_file_async(file) {
    Fs.writeFile(file, "content: Async save", (err) => {
        if (err) {
            console.log(err)
        }
        else
            console.log("updated")
    })
}
write_file_async("./async.txt")


//Q16


function check_exist(file) {
    console.log(Fs.existsSync(file))
}
check_exist("./notes.txt")


//Q17


function os_platform() {
    console.log("platform : " + os.platform(), "Arch : " + os.arch())
}
os_platform()


//Q18


function read_chunks(filename) {
    const read_stream = Fs.createReadStream(filename, "UTF-8")
    read_stream.on("data", (chunk) => {
        console.log(chunk)
    })
}
read_chunks("./bigtext.txt")



//Q19

function copy_file(file1, file2) {
    const read_stream = Fs.createReadStream(file1, "utf-8")
    const write_stream = Fs.createWriteStream(file2)
    read_stream.pipe(write_stream)
    console.log("file copied using streams")
}
copy_file("./src.txt", "./dest.txt")



//Q20


const zlib = require("zlib")
const { json } = require("stream/consumers")
function compress_file(file1, file2) {
    const read_stream = Fs.createReadStream(file1, "utf-8")
    const write_stream = Fs.createWriteStream(file2)
    const gzip = zlib.createGzip()
    read_stream.pipe(gzip).pipe(write_stream)
}
compress_file("./file_before_compressing.txt", "./file_after_copying_and_comp.txt")



/*



                           PART 2



*/



//Q1
let user_arr = Fs.readFileSync("./users.json", "utf-8")

const server = http.createServer((req, res) => {
    if (req.url == "/user" && req.method == "POST") {
        let user_data = ""

        req.on("data", (chunk) => {
            user_data = JSON.parse(chunk)
        })
        req.on("end", () => {
            let { id, name, email } = user_data
            let exist_user = data.find((user) => user.email == email)
            if (exist_user) {
                res.end(JSON.stringify("Email already exists."))
            }
            else {
                data.push(user_data)
                fs.writeFile("./users.JSON", JSON.stringify(data))
                res.end("user added sucssefuly")
            }
        })
    }

    //Q2



    else if (req.url == "/user-id" && req.method == "PATCH") {
        let user_data = ""
        req.on("data", (chunk) => {
            user_data = JSON.parse(chunk)
        })
        req.on("end", () => {
            let { name, id, email } = user_data
            let user_obj = user_arr.find(user => user.id == id)
            if (user_obj) {
                name ? user_obj.name = name : null
                email ? user_obj.email = email : null
                Fs.writeFileSync("./data.json", JSON.stringify(user_arr))
                res.end(JSON.stringify(user_arr))
            }
            else {
                res.end("not found")
            }
        })
    }


    //Q3


    else if (req.url == "/delete" && req.method == "DELETE") {
        user_data = ""
        req.on("data", (chunk) => {
            user_data = JSON.parse(chunk)
        })
        req.on("end", () => {
            let { id } = user_data
            let user_index = data.findIndex((user) => user.id == user_data.id)
            if (user_index >= 0) {
                user_arr.splice(user_index, 1)
                Fs.writeFileSync("./data.json", JSON.stringify(user_arr))
                res.end(JSON.stringify(user_arr))
            }
            else {
                res.end("not found")
            }

        })
    }


    //Q4


    else if (req.url == "/get_users" && req.methode == "GET") {
        user_data=""
        req.on("data",(chunk)=>{
        user_data=JSON.parse(chunk)
        })
        req.on("end",()=>{
        res.end(JSON.stringify(user_arr))
        })
        

    }


    //Q5


    else if (req.url == "/user_by_id" && req.methode == "GET") {
        let user_data
        req.on("data", (chunk) => {
            user_data = JSON.parse(chunk)
        })
        req.on("end", () => {
            let {id}=user_data
            let user_a = data.find((user) => user.id ==id)
            if (user_a) {
                res.end(JSON.stringify(user_a))
            }
            else {
                res.end("user not found")
            }
        })
    }
})


server.listen(3000, () => {
    console.log("server 3000")
})


