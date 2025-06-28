//Learn Decorators
//Learn Utility Types
//Learn Advanced Types


//-----------------------------------
// Decorators
// @experimentalDecorators
function First(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        console.log(target, propertyKey, descriptor)
        descriptor.configurable = false //ngăn không cho thể xóa trong quá tình runtime, bảo vệ thuộc tính
    }
}

class getset {
    private _x: string
    private _y: string

    constructor(x: string, y: string) {
        this._x = x,
        this._y = y
    }

    @First(true) //Tắt configurable của get x
    get x() {
        return this._x
    }

    @First(false) //Tắt configurable của get y 
    get y() {
        return this._y
    }
}

const Callgetset = new getset("1", "2")
console.log(Callgetset)

// Log with Decorators

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) { // Tạo 1 Decor
    console.log(target, propertyKey, descriptor.value)
    const originalMethod = descriptor.value; //Lấy code decor

    descriptor.value = function (...args: any[]) { //kẹp 1 function để debug những gì call và lấy các args mà được nhận
        console.log(`Calling ${propertyKey} with arguments: ${args}`); //propertyKey sẽ trả về hàm được gọi, args trả về tất cả thành phần được gọi 
        return originalMethod.apply(this, args); //gọi lại hàm gốc để giữ logic gốc
    };
    return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
const calculator = new Calculator();
calculator.add(1, 2);


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Utility Types
//Partial<Type>
interface Todo {
    name: string,
    data: string

}
function UpdateTodo(arg: Todo, arg2: Partial<Todo>) { // arg2 có thể là 1 giá trị trong interface Todo
    return {...arg, ...arg2}
}

const Todo1 = {
    name: "Test",
    data: "Data1"
}
const To2 = UpdateTodo(Todo1, {
    name: "ChangeTest"
})
console.log(To2)

//Pick<Type, Keys>

interface StyleTodo {
    name: string,
    pass: number,
    info: string
}
type GetPick = Pick<StyleTodo, "name" | "pass">;
const PickTodo: GetPick = {
    name: "Nghia892",
    pass: 100
    //info: -> bug vì không có Pick info
}

//Omit<Type, Keys>: Là Pick nhưng ngược lại sẽ loại bỏ keys
interface OmitTodo {
    name: string,
    pass: number,
    info: string
}
type GetOmit = Omit<OmitTodo, "pass">

const DataOmit: GetOmit = {
    name: "nghia892",
    info: "100"
}

//Readonly<Type>
interface Readonlyinter {
    name: string
}
const ReadonlyData: Readonly<Readonlyinter> = {name: "Nghia"}
// ReadonlyData.name = "Test"; -> Bug vì đã gán readonly khiến không thể thay đổi giá trị


//Record<Type,Keys> 
type Sinhv = "A" | "B" | "C"

interface SinhvInfo {
    ten: string,
    tuoi: number
}
const dulieusinhvien: Record<Sinhv, SinhvInfo> = {
    "A": {ten: "VANA", tuoi: 100},
    "B": {ten: "VANB", tuoi: 100},
    "C": {ten: "VANC", tuoi: 100},
}

//Exclude<UnionType, ExcludedMembers> loại bỏ ExcludedMembers khỏi Union

type AUnion = Exclude<"a" | "b" | "c", "b">; //Loại bỏ b khỏi a b c
type ListUnion = {
    | {kind: "first"; radius: 100}
    | {kind: "Second"; radius: 100}
    | {kind: "Zero"; radius: 100}
}
type Union3 = Exclude<ListUnion, {kind: "first"}>

