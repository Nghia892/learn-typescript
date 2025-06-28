// Type Compatibility (Tương thích kiểu dữ liệu)
interface EA {
    name: String
}
// Dựa Vào EA có sẵn 1 giá trị name là String và Console đã có name
let Console = {name: "Play 4", cpu: 10}
function Game(cons: EA){
    console.log(cons)
}
// Chỉ cần 2 đối tượng đều có cùng 1 giá trị (name) là String thì sẽ không gây ra lỗi ngay cả khi có cpu: 10 (number)
Game(Console)

// Combining Types (Hợp Nhất Các Type)
// Mẫu:
type Gameplay = String | Number;
// Vì Type có String và Number thông qua -> | (tương đương AND)
let Roblox: Gameplay = "Data";
Roblox = 1000;

//Ta Có 2 Interface như sau
interface A {
    a: String
}
interface B {
    b: Boolean
}
// Dựa vào đó khi xài & sẽ lần lượt tham chiếu cả 2 A và B
let Data: A & B = {a: "Hi", b: true}

// Union
function printunion(prn: String | Number[] | Number) {
    if(Array.isArray(prn))
    {
        console.log("Array:" , prn)
    }
    console.log(prn)
}
printunion(1)
// Intersection Types
type Ua = {
    name: string,
    pass: number
}
type Ub = {
    info: string,
    data: string
}
// Có Thể Sử Dụng Cả 2 Type
const User: Ua & Ub = {name: "None", pass: 123, info: "New", data: "Load"}

//Keyof
type Key1 = {
    name: String,
    pass: Number
}
type Key2 = keyof Key1; // LAY "name" và "pass" từ key lấy khoá từ
const Test: Key2 = "name"

//Typeof trà về giá trị
function CheckType(str: string | number | boolean){
    if(typeof str === "string"){ // Sử Dụng Typeof để lấy type của str if xem có phải là string ko
        console.log("Đây Là String: ", str)
    }
    if(typeof str === "number"){
        console.log("Đây Là Number:", str)
    }
    if(typeof str === "boolean"){
        console.log("Đây Là Boolean:", str)
    }
}
// Instanceof
class Bird {
    Fly(){
        console.log("FLY");
    }

    Lay(){
        console.log("LAY")
    }
}
const AngryBird = new Bird()
if(AngryBird instanceof Bird) // Giống như check xem đối tượng có trong 1 class không
{
    AngryBird.Fly()
}

//Equality
function NumberOrString(arg: String | String[] | Number, arg2: String | Boolean) {
    if(arg !== null){ // Kiểm Tra trước xem arg có phải là Null hay Không
        if(Array.isArray(arg)){ // Kiểu tra nếu là Array, Hoặc cũng có thể xài typeof Object để check
            for (const s of arg){
                console.log(s)
            }
        }
        if(typeof arg === "string"){ 
            arg.toLowerCase();
            console.log(arg)
        }
        if(typeof arg === "number"){
            console.log(arg * 5)
        }
    }
    if(arg === arg2){ // If dựa trên arg và arg2 sẽ True nếu cả 2 đều là String, nếu args2 là Boolean thì sẽ trả về False
        arg.toLowerCase();
        arg2.toUpperCase();
    }
    else
    {
        console.log(arg);
        console.log(arg2)
    }
}

//Type Predicates

function Typeis(te: any): te is string {
    return typeof te === "string"
}
function Printtypeis(prn: any) {
    if(Typeis(prn)){
        console.log(prn)
    }
}

Printtypeis("")

// satisfies
type Colors = 'red' | 'blue' | 'green';

const myColor = 'red' satisfies Colors;

console.log(myColor)