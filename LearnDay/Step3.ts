// Function Learn
function number1(a: number, b: number): number {
    return a + b
} //Function có a và b là number, trả về kết quả về là number và phép tính +
const SoNhan = (a: number, b: number): number =>{
    return a * b
} //const SoNhan và nó khá giống function nhưng phép tính *
console.log(SoNhan(10,100))


let Sochia: (a: number, b: number) => number; // Tạo cho Sochia có a và b là number và cấu trúc

Sochia = (a,b) => {
    return a / b
} 
console.log(Sochia(100,5)) // dựa theo cấu trúc đó mà lấy a / b 


//
function Step1(fn: (a:string) => void) { //tạo fn: (a:string) để có cấu trúc giá trị bên trong fn sẽ có 1 a phải là string
    fn("Hello Ưorld")
}
function Step2(a: string) {
    console.log(a)
}
Step1(Step2)

//Function + generic
function Gen<Type>(arg: Type[]): Type | undefined {  //Xài generic để xá định type , và arg: Type[] là array
    return arg[0]
}
Gen([1,2,3])

//Class + constructor
class Example {
    public name: string;
    private pass: number;
    constructor(name: string, pass: number){
        this.name = name,
        this.pass = pass
    }
}

// abstract (hàm này giống khởi tạo 1 class không thể tạo qua 1 lệnh new) cần class khác liên kết thông qua
abstract class Lop1 {
    PrintHW() {
        console.log("Hello World")
    }
} // Tạo 1 class abstract có PrintHW

class Lop2 extends Lop1 {
    PrintHW2(): void {
        console.log("Print Hallo")
    }
} // xài Lop2 để tham chiếu Lop1
const worldclass = new Lop2()
worldclass.PrintHW()


// Generic 
function DataG<T>(arg: T): T{
    console.log(arg)
    return arg;
}
DataG<String>("Hello")

// @experimentalDecorators

function ReportUrl<T extends {new (...args: any[]): {}}> (constructor: T) { //Sử dụng Generic để tạo , T sẽ kế thừa Constructor đã tạo trên class gốc
    return class extends constructor { //Class sẽ kế thừa constructor 
        reportingURL = "Https"
    }
}
@ReportUrl // Vẫn đang học decoroator thêm
class datasend {
    constructor(public user: string) {}
}

const user = new datasend("Alice");
console.log(user.user);
console.log((user as any).reportingURL);


function enumerable(value: boolean){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        descriptor.configurable = value;
    };
}

// @experimentalDecorators

class Point {
    private _x: number
    private _y: number

    constructor(x: number, y: number){
        this._x = x;
        this._y = y
    }

    @enumerable(false)
    get x() {
        return this._x;
    }

    @enumerable(false)
    get y() {
        return this._y;
    }
}